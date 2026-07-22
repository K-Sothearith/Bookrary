import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { validateEmail, validatePassword } from "../utils/validators.js";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "bookrary_secret_key_cadt_2026";

// In-memory mock DB store (synchronized with client local storage)
const usersStore = [];

// Seed default demo user for convenience
const hashedDemoPassword = bcrypt.hashSync("Bookrary1!", 10);
usersStore.push({
  id: "usr_101",
  username: "CADT_Reader",
  email: "student@student.cadt.edu.kh",
  password: hashedDemoPassword,
  age: 20,
  modePreference: "dark",
  createdAt: new Date().toISOString()
});

router.post("/register", async (req, res) => {
  try {
    const { username, email, password, age } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: "All required fields must be provided." });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({
        error: "Email domain not allowed. Must use @gmail.com, @outlook.com, @student.cadt.edu.kh, @icloud.com, or @yahoo.com."
      });
    }

    if (!validatePassword(password)) {
      return res.status(400).json({
        error: "Password must be at least 6 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character."
      });
    }

    const existing = usersStore.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      return res.status(400).json({ error: "Account with this email already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      id: "usr_" + Date.now(),
      username: username.trim(),
      email: email.trim().toLowerCase(),
      password: hashedPassword,
      age: age ? parseInt(age) : 18,
      modePreference: "dark",
      createdAt: new Date().toISOString()
    };

    usersStore.push(newUser);

    const token = jwt.sign(
      { id: newUser.id, email: newUser.email, username: newUser.username },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    const { password: _, ...userWithoutPassword } = newUser;
    return res.status(201).json({
      message: "Registration successful!",
      token,
      user: userWithoutPassword
    });
  } catch (err) {
    return res.status(500).json({ error: "Server registration error: " + err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required." });
    }

    const user = usersStore.find((u) => u.email.toLowerCase() === email.trim().toLowerCase());
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, username: user.username },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    const { password: _, ...userWithoutPassword } = user;
    return res.json({
      message: "Login successful!",
      token,
      user: userWithoutPassword
    });
  } catch (err) {
    return res.status(500).json({ error: "Server login error: " + err.message });
  }
});

router.get("/me", (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = usersStore.find((u) => u.id === decoded.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    const { password: _, ...userWithoutPassword } = user;
    return res.json({ user: userWithoutPassword });
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
});

router.put("/preferences", (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(authHeader.split(" ")[1], JWT_SECRET);
    const user = usersStore.find((u) => u.id === decoded.id);
    if (user && req.body.modePreference) {
      user.modePreference = req.body.modePreference;
    }
    return res.json({ success: true, modePreference: user?.modePreference });
  } catch (err) {
    return res.status(401).json({ error: "Unauthorized" });
  }
});

export default router;

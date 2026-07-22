import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { validateEmail, validatePassword } from "../utils/validators.js";
import { query } from "../config/db.js";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "bookrary_cadt_aiven_mysql_super_secret_jwt_2026";

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

    const existing = await query("SELECT userId FROM users WHERE LOWER(email) = LOWER(?)", [email.trim()]);
    if (existing.length > 0) {
      return res.status(400).json({ error: "Account with this email already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userAge = age ? parseInt(age) : 18;

    const result = await query(
      "INSERT INTO users (username, email, password, age, modePreference) VALUES (?, ?, ?, ?, 'dark')",
      [username.trim(), email.trim().toLowerCase(), hashedPassword, userAge]
    );

    const newUserId = result.insertId;
    const token = jwt.sign(
      { id: newUserId, email: email.trim().toLowerCase(), username: username.trim() },
      JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "24h" }
    );

    const newUser = {
      id: newUserId,
      username: username.trim(),
      email: email.trim().toLowerCase(),
      age: userAge,
      modePreference: "dark"
    };

    return res.status(201).json({
      message: "Registration successful!",
      token,
      user: newUser
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

    const users = await query("SELECT * FROM users WHERE LOWER(email) = LOWER(?)", [email.trim()]);
    if (users.length === 0) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    const user = users[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    const token = jwt.sign(
      { id: user.userId, email: user.email, username: user.username },
      JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "24h" }
    );

    const userWithoutPassword = {
      id: user.userId,
      username: user.username,
      email: user.email,
      age: user.age,
      modePreference: user.modePreference
    };

    return res.json({
      message: "Login successful!",
      token,
      user: userWithoutPassword
    });
  } catch (err) {
    return res.status(500).json({ error: "Server login error: " + err.message });
  }
});

router.get("/me", async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const users = await query("SELECT userId as id, username, email, age, modePreference FROM users WHERE userId = ?", [decoded.id]);
    if (users.length === 0) return res.status(404).json({ error: "User not found" });

    return res.json({ user: users[0] });
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
});

router.put("/preferences", async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(authHeader.split(" ")[1], JWT_SECRET);
    const { modePreference } = req.body;
    if (modePreference) {
      await query("UPDATE users SET modePreference = ? WHERE userId = ?", [modePreference, decoded.id]);
    }
    return res.json({ success: true, modePreference });
  } catch (err) {
    return res.status(401).json({ error: "Unauthorized" });
  }
});

export default router;

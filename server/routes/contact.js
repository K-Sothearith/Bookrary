import express from "express";

const router = express.Router();
const messages = [];

router.post("/", (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Name, email, and message are required." });
  }

  const newMessage = {
    id: "msg_" + Date.now(),
    name: name.trim(),
    email: email.trim(),
    subject: subject ? subject.trim() : "General Inquiry",
    message: message.trim(),
    createdAt: new Date().toISOString()
  };

  messages.push(newMessage);

  return res.status(201).json({
    success: true,
    message: "Thank you for reaching out to Bookrary! Our team will respond shortly.",
    data: newMessage
  });
});

export default router;

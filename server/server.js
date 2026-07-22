import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import mangaRoutes from "./routes/manga.js";
import contactRoutes from "./routes/contact.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/manga", mangaRoutes);
app.use("/api/contact", contactRoutes);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    service: "Bookrary API Server",
    version: "2.0.0",
    time: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Bookrary Express Server running on http://localhost:${PORT}`);
});

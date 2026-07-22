import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { initDb } from "./config/db.js";
import authRoutes from "./routes/auth.js";
import mangaRoutes from "./routes/manga.js";
import contactRoutes from "./routes/contact.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, ".env") });

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
    database: "Aiven MySQL Cloud",
    version: "2.0.0",
    time: new Date().toISOString()
  });
});

// Initialize Aiven MySQL connection pool & server listener
async function startServer() {
  try {
    await initDb();
    app.listen(PORT, () => {
      console.log(`🚀 Bookrary Express Server running on http://localhost:${PORT}`);
      console.log(`📡 Connected to Aiven MySQL Cloud Host: ${process.env.DB_HOST}`);
    });
  } catch (err) {
    console.error("Failed to initialize database server:", err.message);
    // Still start server to allow graceful degradation
    app.listen(PORT, () => {
      console.log(`⚠️ Bookrary Express Server running on http://localhost:${PORT} (Database pending)`);
    });
  }
}

startServer();

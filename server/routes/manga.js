import express from "express";
import { mangaDatabase, ALL_GENRES, CATEGORIES } from "../data/mangaData.js";
import jwt from "jsonwebtoken";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "bookrary_secret_key_cadt_2026";

// Get all manga with optional search, category, genre filters, and pagination
router.get("/", (req, res) => {
  try {
    const { search, category, genre, limit, page } = req.query;

    let results = [...mangaDatabase];

    if (search) {
      const q = search.trim().toLowerCase();
      results = results.filter(
        (m) =>
          m.title.toLowerCase().includes(q) ||
          m.author.toLowerCase().includes(q) ||
          m.genres.some((g) => g.toLowerCase().includes(q))
      );
    }

    if (category) {
      results = results.filter((m) => m.category.toLowerCase() === category.toLowerCase());
    }

    if (genre) {
      results = results.filter((m) =>
        m.genres.some((g) => g.toLowerCase() === genre.toLowerCase())
      );
    }

    const totalCount = results.length;
    const p = parseInt(page) || 1;
    const l = parseInt(limit) || 100;
    const startIndex = (p - 1) * l;
    const paginatedResults = results.slice(startIndex, startIndex + l);

    return res.json({
      total: totalCount,
      page: p,
      limit: l,
      genres: ALL_GENRES,
      categories: CATEGORIES,
      manga: paginatedResults
    });
  } catch (err) {
    return res.status(500).json({ error: "Failed to fetch manga list: " + err.message });
  }
});

// Get single manga by ID
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const manga = mangaDatabase.find((m) => m.id === id);
  if (!manga) {
    return res.status(404).json({ error: "Manga not found" });
  }
  return res.json(manga);
});

// Reaction endpoint (Like/Dislike - Protected)
router.post("/:id/reaction", (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Authentication required to react to manga." });
  }

  try {
    jwt.verify(authHeader.split(" ")[1], JWT_SECRET);
  } catch (err) {
    return res.status(401).json({ error: "Invalid session or token expired." });
  }

  const id = parseInt(req.params.id);
  const { type } = req.body; // 'LIKE' or 'DISLIKE'
  const manga = mangaDatabase.find((m) => m.id === id);

  if (!manga) {
    return res.status(404).json({ error: "Manga not found" });
  }

  if (type === "LIKE") {
    manga.likeAmount += 1;
  } else if (type === "DISLIKE") {
    manga.dislikeAmount += 1;
  } else {
    return res.status(400).json({ error: "Invalid reaction type. Must be LIKE or DISLIKE." });
  }

  return res.json({
    success: true,
    mangaId: manga.id,
    likeAmount: manga.likeAmount,
    dislikeAmount: manga.dislikeAmount
  });
});

export default router;

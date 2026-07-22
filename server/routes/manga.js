import express from "express";
import { query } from "../config/db.js";
import { ALL_GENRES, CATEGORIES } from "../data/mangaData.js";
import jwt from "jsonwebtoken";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "bookrary_cadt_aiven_mysql_super_secret_jwt_2026";

// Helper to format DB row to API manga model
function formatMangaRow(row) {
  let parsedGenres = [];
  try {
    parsedGenres = typeof row.genres === "string" ? JSON.parse(row.genres) : row.genres;
  } catch (e) {
    parsedGenres = [row.genres];
  }

  return {
    id: row.mangaId,
    title: row.title,
    author: row.author,
    coverImage: row.coverImage,
    bannerImage: row.bannerImage,
    synopsis: row.synopsis,
    totalVolumes: row.totalVolumes,
    status: row.status,
    category: row.category,
    genres: parsedGenres,
    likeAmount: row.likeAmount,
    dislikeAmount: row.dislikeAmount,
    favoriteAmount: row.favoriteAmount,
    rating: parseFloat(row.rating)
  };
}

// Get all manga with optional search, category, genre filters
router.get("/", async (req, res) => {
  try {
    const { search, category, genre, limit, page } = req.query;

    let sql = "SELECT * FROM manga WHERE 1=1";
    const params = [];

    if (search) {
      sql += " AND (LOWER(title) LIKE ? OR LOWER(author) LIKE ? OR LOWER(genres) LIKE ?)";
      const q = `%${search.trim().toLowerCase()}%`;
      params.push(q, q, q);
    }

    if (category) {
      sql += " AND LOWER(category) = LOWER(?)";
      params.push(category.trim());
    }

    if (genre) {
      sql += " AND LOWER(genres) LIKE ?";
      params.push(`%${genre.trim().toLowerCase()}%`);
    }

    sql += " ORDER BY mangaId ASC";

    const rows = await query(sql, params);
    const totalCount = rows.length;

    const p = parseInt(page) || 1;
    const l = parseInt(limit) || 100;
    const startIndex = (p - 1) * l;
    const paginatedRows = rows.slice(startIndex, startIndex + l);

    const formattedManga = paginatedRows.map(formatMangaRow);

    return res.json({
      total: totalCount,
      page: p,
      limit: l,
      genres: ALL_GENRES,
      categories: CATEGORIES,
      manga: formattedManga
    });
  } catch (err) {
    return res.status(500).json({ error: "Failed to fetch manga list: " + err.message });
  }
});

// Get single manga by ID
router.get("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const rows = await query("SELECT * FROM manga WHERE mangaId = ?", [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: "Manga not found" });
    }
    return res.json(formatMangaRow(rows[0]));
  } catch (err) {
    return res.status(500).json({ error: "Failed to fetch manga details: " + err.message });
  }
});

// Reaction endpoint (Like/Dislike - Protected)
router.post("/:id/reaction", async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Authentication required to react to manga." });
  }

  let userId;
  try {
    const decoded = jwt.verify(authHeader.split(" ")[1], JWT_SECRET);
    userId = decoded.id;
  } catch (err) {
    return res.status(401).json({ error: "Invalid session or token expired." });
  }

  const id = parseInt(req.params.id);
  const { type } = req.body; // 'LIKE' or 'DISLIKE'

  if (type !== "LIKE" && type !== "DISLIKE") {
    return res.status(400).json({ error: "Invalid reaction type. Must be LIKE or DISLIKE." });
  }

  try {
    if (type === "LIKE") {
      await query("UPDATE manga SET likeAmount = likeAmount + 1 WHERE mangaId = ?", [id]);
    } else {
      await query("UPDATE manga SET dislikeAmount = dislikeAmount + 1 WHERE mangaId = ?", [id]);
    }

    // Record user reaction
    await query(
      "INSERT INTO user_reactions (userId, mangaId, type) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE type = ?",
      [userId, id, type, type]
    );

    const rows = await query("SELECT likeAmount, dislikeAmount FROM manga WHERE mangaId = ?", [id]);
    return res.json({
      success: true,
      mangaId: id,
      likeAmount: rows[0].likeAmount,
      dislikeAmount: rows[0].dislikeAmount
    });
  } catch (err) {
    return res.status(500).json({ error: "Failed to record reaction: " + err.message });
  }
});

export default router;

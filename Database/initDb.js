import mysql from "mysql2/promise";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { mangaDatabase } from "../server/data/mangaData.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "../server/.env") });

export async function getDbConnectionPool() {
  const config = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: parseInt(process.env.DB_PORT || "22859"),
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    ssl: {
      rejectUnauthorized: false
    }
  };

  return mysql.createPool(config);
}

export async function initializeDatabase() {
  console.log(`📡 Connecting to Aiven MySQL Host: ${process.env.DB_HOST}...`);
  try {
    const pool = await getDbConnectionPool();

    // 1. Run Schema SQL from Database/schema/schema.sql
    const schemaPath = path.join(__dirname, "schema/schema.sql");
    if (fs.existsSync(schemaPath)) {
      const schemaSql = fs.readFileSync(schemaPath, "utf8");
      const statements = schemaSql
        .split(";")
        .map((s) => s.trim())
        .filter((s) => s.length > 0);

      for (const statement of statements) {
        await pool.query(statement);
      }
      console.log("✅ Verified database schema from Database/schema/schema.sql");
    }

    // 2. Check if manga table needs seeding
    const [rows] = await pool.query("SELECT COUNT(*) as count FROM manga");
    if (rows[0].count === 0) {
      console.log("🌱 Populating manga dataset into Aiven MySQL...");

      // Try running seeds from Database/seeds/mangaSeed.sql first
      const seedPath = path.join(__dirname, "seeds/mangaSeed.sql");
      if (fs.existsSync(seedPath)) {
        const seedSql = fs.readFileSync(seedPath, "utf8");
        const seedStatements = seedSql
          .split(";")
          .map((s) => s.trim())
          .filter((s) => s.length > 0);

        for (const statement of seedStatements) {
          await pool.query(statement);
        }
      }

      // Populate expanded items if needed up to 100
      for (const m of mangaDatabase) {
        await pool.query(
          `INSERT INTO manga (mangaId, title, author, coverImage, bannerImage, synopsis, totalVolumes, status, category, genres, likeAmount, dislikeAmount, favoriteAmount, rating)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
           ON DUPLICATE KEY UPDATE title=VALUES(title), author=VALUES(author)`,
          [
            m.id,
            m.title,
            m.author,
            m.coverImage,
            m.bannerImage,
            m.synopsis,
            m.totalVolumes,
            m.status,
            m.category,
            JSON.stringify(m.genres),
            m.likeAmount,
            m.dislikeAmount,
            m.favoriteAmount,
            m.rating
          ]
        );
      }
      console.log("🎉 Successfully populated 100 manga records into Aiven MySQL!");
    } else {
      console.log(`ℹ️ Database already populated with ${rows[0].count} manga entries.`);
    }

    return pool;
  } catch (err) {
    console.error("❌ Aiven MySQL Connection Error:", err.message);
    throw err;
  }
}

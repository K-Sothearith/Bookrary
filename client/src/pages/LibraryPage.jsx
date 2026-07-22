import React, { useEffect, useState } from "react";
import MangaCard from "../components/MangaCard";
import { Filter, Layers } from "lucide-react";

export default function LibraryPage({ onOpenDetail, onOpenReader }) {
  const [mangaList, setMangaList] = useState([]);
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/manga?limit=100")
      .then((res) => res.json())
      .then((data) => {
        setMangaList(data.manga || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const categories = ["ALL", "Top Favorite", "Trending", "Old but Gold", "New Releases"];

  const filteredManga = activeCategory === "ALL"
    ? mangaList
    : mangaList.filter((m) => m.category?.toLowerCase() === activeCategory.toLowerCase());

  return (
    <div className="library-container">
      {/* Header Banner */}
      <div className="library-header glass-panel">
        <div className="header-text">
          <h1>📖 BOOKRARY LIBRARY</h1>
          <p>Explore our complete collection of titles. Discover your next favorite series.</p>
        </div>

        {/* Category Tabs */}
        <div className="category-filter-tabs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`cat-tab-btn ${activeCategory === cat ? "active" : ""}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="library-grid-section">
        <div className="results-count">
          <Layers size={16} /> Showing {filteredManga.length} Manga Titles
        </div>

        {loading ? (
          <div className="loading-spinner">Loading Manga Catalogue...</div>
        ) : (
          <div className="manga-grid">
            {filteredManga.map((manga) => (
              <MangaCard
                key={manga.id}
                manga={manga}
                onOpenDetail={onOpenDetail}
                onOpenReader={onOpenReader}
              />
            ))}
          </div>
        )}
      </div>

      <style>{`
        .library-container {
          max-width: 1300px;
          margin: 40px auto 0;
          padding: 0 24px;
          display: flex;
          flex-direction: column;
          gap: 30px;
        }

        .library-header {
          padding: 36px;
          border-radius: var(--radius-lg);
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .header-text h1 {
          font-family: var(--font-heading);
          font-size: 2.2rem;
          font-weight: 800;
          color: var(--text-main);
          margin-bottom: 6px;
        }

        .header-text p {
          color: var(--text-muted);
          font-size: 1rem;
        }

        .category-filter-tabs {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .cat-tab-btn {
          padding: 8px 18px;
          border-radius: 20px;
          background: var(--bg-primary);
          color: var(--text-muted);
          border: 1px solid var(--border-color);
          font-weight: 700;
          font-size: 0.85rem;
          transition: all var(--transition-fast);
        }

        .cat-tab-btn:hover, .cat-tab-btn.active {
          background: var(--accent-red);
          color: #ffffff;
          border-color: var(--accent-red);
        }

        .results-count {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--text-muted);
          margin-bottom: 16px;
        }

        .loading-spinner {
          padding: 60px;
          text-align: center;
          color: var(--text-muted);
          font-size: 1.1rem;
        }

        .manga-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 24px;
        }

        @media (max-width: 768px) {
          .manga-grid {
            grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
          }
        }
      `}</style>
    </div>
  );
}

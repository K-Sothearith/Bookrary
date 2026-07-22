import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MangaCard from "../components/MangaCard";
import { Search, Tag, Sparkles } from "lucide-react";

export default function SearchPage({ onOpenDetail, onOpenReader }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const [query, setQuery] = useState(initialQuery);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [mangaList, setMangaList] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/manga?limit=100")
      .then((res) => res.json())
      .then((data) => {
        setMangaList(data.manga || []);
        setGenres(data.genres || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchParams(query ? { q: query } : {});
  };

  const toggleGenre = (g) => {
    if (selectedGenre === g) {
      setSelectedGenre("");
    } else {
      setSelectedGenre(g);
    }
  };

  const filteredManga = mangaList.filter((m) => {
    const q = query.toLowerCase().trim();
    const matchesQuery =
      !q ||
      m.title.toLowerCase().includes(q) ||
      m.author.toLowerCase().includes(q) ||
      m.genres.some((g) => g.toLowerCase().includes(q));

    const matchesGenre =
      !selectedGenre ||
      m.genres.some((g) => g.toLowerCase() === selectedGenre.toLowerCase());

    return matchesQuery && matchesGenre;
  });

  return (
    <div className="search-page-container">
      {/* Search Header */}
      <div className="search-header glass-panel">
        <div className="search-header-text">
          <h1>🔍 SEARCH & DISCOVER</h1>
          <p>Discover your next favorite books from our curated collection of 100+ titles.</p>
          <span className="japanese-sub">日本のアニメライブラリー</span>
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSearchSubmit} className="search-input-form">
          <Search size={20} className="form-search-icon" />
          <input
            type="text"
            placeholder="Search your favorite books, authors, or genres..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="big-search-input"
          />
          <button type="submit" className="btn-primary search-submit-btn">
            SEARCH
          </button>
        </form>

        {/* Genre Pill Cloud */}
        <div className="genre-cloud-section">
          <div className="cloud-label">
            <Tag size={16} /> Filter by Genre:
          </div>
          <div className="genre-pills">
            {genres.map((g) => (
              <button
                key={g}
                onClick={() => toggleGenre(g)}
                className={`genre-cloud-pill ${selectedGenre === g ? "active" : ""}`}
              >
                {g}
              </button>
            ))}
            {selectedGenre && (
              <button onClick={() => setSelectedGenre("")} className="clear-filter-btn">
                Clear Genre Filter
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="search-results-section">
        <h2 className="results-heading">
          {query || selectedGenre
            ? `Search Results (${filteredManga.length} titles found)`
            : "All 100 Manga Titles"}
        </h2>

        {filteredManga.length === 0 ? (
          <div className="no-results-card glass-panel">
            <Sparkles size={40} />
            <h3>No Manga Found</h3>
            <p>Try searching for a different keyword or clearing your genre filter.</p>
          </div>
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
        .search-page-container {
          max-width: 1300px;
          margin: 40px auto 0;
          padding: 0 24px;
          display: flex;
          flex-direction: column;
          gap: 36px;
        }

        .search-header {
          padding: 40px;
          border-radius: var(--radius-lg);
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .search-header-text h1 {
          font-family: var(--font-heading);
          font-size: 2.2rem;
          font-weight: 800;
          margin-bottom: 4px;
        }

        .search-header-text p {
          color: var(--text-muted);
        }

        .japanese-sub {
          font-size: 0.8rem;
          color: var(--accent-red);
          font-weight: 700;
        }

        .search-input-form {
          position: relative;
          display: flex;
          gap: 12px;
        }

        .form-search-icon {
          position: absolute;
          left: 18px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted);
        }

        .big-search-input {
          flex: 1;
          padding: 16px 20px 16px 52px;
          background: var(--bg-primary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          color: var(--text-main);
          font-size: 1rem;
          outline: none;
        }

        .big-search-input:focus {
          border-color: var(--accent-red);
        }

        .search-submit-btn {
          padding: 0 28px;
          border-radius: var(--radius-md);
        }

        .genre-cloud-section {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .cloud-label {
          display: flex;
          align-items: center;
          gap: 6px;
          font-weight: 700;
          font-size: 0.85rem;
          color: var(--text-main);
        }

        .genre-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .genre-cloud-pill {
          padding: 6px 14px;
          border-radius: 20px;
          background: var(--bg-primary);
          color: var(--text-muted);
          border: 1px solid var(--border-color);
          font-size: 0.8rem;
          font-weight: 600;
          transition: all var(--transition-fast);
        }

        .genre-cloud-pill:hover, .genre-cloud-pill.active {
          background: rgba(229, 9, 20, 0.2);
          color: var(--accent-red);
          border-color: var(--border-accent);
        }

        .clear-filter-btn {
          background: transparent;
          color: var(--accent-gold);
          font-size: 0.8rem;
          font-weight: 700;
          text-decoration: underline;
        }

        .results-heading {
          font-family: var(--font-heading);
          font-size: 1.3rem;
          font-weight: 800;
          margin-bottom: 20px;
        }

        .no-results-card {
          padding: 60px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          color: var(--text-muted);
        }

        .manga-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 24px;
        }

        @media (max-width: 768px) {
          .search-input-form {
            flex-direction: column;
          }
          .manga-grid {
            grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
          }
        }
      `}</style>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import MangaCard from "../components/MangaCard";
import { Bookmark, Search, BookOpen, AlertCircle } from "lucide-react";

export default function ReadLaterPage({ onOpenDetail, onOpenReader }) {
  const { readLater, isGuest, openAuthModal } = useAuth();
  const [allManga, setAllManga] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/manga?limit=100")
      .then((res) => res.json())
      .then((data) => setAllManga(data.manga || []))
      .catch(() => {});
  }, []);

  const savedMangaList = allManga.filter((m) => readLater.includes(m.id));
  const filteredList = savedMangaList.filter((m) =>
    m.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="read-later-container">
      <section className="banner glass-panel">
        <div className="banner-text">
          <h1>📖 READ LATER</h1>
          <p>
            Your personal manga library. Track your reading progress, discover new series, and never lose track of where you left off.
          </p>
        </div>

        <div className="search-bar-wrapper">
          <Search className="search-icon" size={16} />
          <input
            type="text"
            placeholder="Search saved manga..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="read-search-input"
          />
        </div>
      </section>

      {isGuest ? (
        <div className="guest-notice-card glass-panel">
          <AlertCircle size={40} className="notice-icon" />
          <h2>Log In Required</h2>
          <p>Please log in to your account to save manga to your personal Read-Later list.</p>
          <button onClick={() => openAuthModal("login")} className="btn-primary">
            LOG IN / SIGN UP
          </button>
        </div>
      ) : savedMangaList.length === 0 ? (
        <div className="empty-state-card glass-panel">
          <Bookmark size={48} className="empty-icon" />
          <h2>Your Read-Later list is empty</h2>
          <p>Explore our library and click "+ Read Later" to save titles for future reading.</p>
        </div>
      ) : (
        <div className="manga-grid">
          {filteredList.map((manga) => (
            <MangaCard
              key={manga.id}
              manga={manga}
              onOpenDetail={onOpenDetail}
              onOpenReader={onOpenReader}
            />
          ))}
        </div>
      )}

      <style>{`
        .read-later-container {
          max-width: 1300px;
          margin: 40px auto 0;
          padding: 0 24px;
          display: flex;
          flex-direction: column;
          gap: 30px;
        }

        .banner {
          padding: 36px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          border-radius: var(--radius-lg);
        }

        .banner-text h1 {
          font-family: var(--font-heading);
          font-size: 2.2rem;
          font-weight: 800;
          margin-bottom: 6px;
        }

        .banner-text p {
          color: var(--text-muted);
          max-width: 600px;
        }

        .search-bar-wrapper {
          position: relative;
          min-width: 240px;
        }

        .search-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted);
        }

        .read-search-input {
          width: 100%;
          padding: 10px 14px 10px 38px;
          background: var(--bg-primary);
          border: 1px solid var(--border-color);
          border-radius: 20px;
          color: var(--text-main);
          outline: none;
        }

        .guest-notice-card, .empty-state-card {
          padding: 60px 24px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          border-radius: var(--radius-lg);
        }

        .notice-icon { color: var(--accent-red); }
        .empty-icon { color: var(--accent-gold); }

        .manga-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 24px;
        }

        @media (max-width: 768px) {
          .banner {
            flex-direction: column;
            align-items: flex-start;
          }
          .search-bar-wrapper {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}

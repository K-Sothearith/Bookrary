import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import MangaCard from "../components/MangaCard";
import { Heart, AlertCircle } from "lucide-react";

export default function FavoritesPage({ onOpenDetail, onOpenReader }) {
  const { favorites, isGuest, openAuthModal } = useAuth();
  const [allManga, setAllManga] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/manga?limit=100")
      .then((res) => res.json())
      .then((data) => setAllManga(data.manga || []))
      .catch(() => {});
  }, []);

  const favoriteMangaList = allManga.filter((m) => favorites.includes(m.id));

  return (
    <div className="favorites-container">
      <div className="fav-header glass-panel">
        <h1>❤️ YOUR FAVORITE MANGA</h1>
        <p>A curated collection of your top rated series and personal favorites.</p>
      </div>

      {isGuest ? (
        <div className="guest-notice-card glass-panel">
          <AlertCircle size={40} className="notice-icon" />
          <h2>Log In Required</h2>
          <p>Please log in to your account to add manga to your personal Favorites.</p>
          <button onClick={() => openAuthModal("login")} className="btn-primary">
            LOG IN / SIGN UP
          </button>
        </div>
      ) : favoriteMangaList.length === 0 ? (
        <div className="empty-state-card glass-panel">
          <Heart size={48} className="empty-icon" />
          <h2>No Favorites Added Yet</h2>
          <p>Click the heart icon on any manga card to bookmark your top favorites here.</p>
        </div>
      ) : (
        <div className="manga-grid">
          {favoriteMangaList.map((manga) => (
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
        .favorites-container {
          max-width: 1300px;
          margin: 40px auto 0;
          padding: 0 24px;
          display: flex;
          flex-direction: column;
          gap: 30px;
        }

        .fav-header {
          padding: 36px;
          border-radius: var(--radius-lg);
        }

        .fav-header h1 {
          font-family: var(--font-heading);
          font-size: 2.2rem;
          font-weight: 800;
          margin-bottom: 6px;
        }

        .fav-header p {
          color: var(--text-muted);
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
        .empty-icon { color: var(--accent-red); }

        .manga-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 24px;
        }
      `}</style>
    </div>
  );
}

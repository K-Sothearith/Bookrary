import React from "react";
import { useAuth } from "../context/AuthContext";
import { X, Star, Heart, Bookmark, BookOpen, ThumbsUp, ThumbsDown, User, Layers, Tag } from "lucide-react";

export default function MangaDetailModal({ manga, onClose, onOpenReader }) {
  const { readLater, favorites, toggleReadLater, toggleFavorite, requireAuthAction } = useAuth();
  const [likes, setLikes] = React.useState(manga?.likeAmount || 0);

  if (!manga) return null;

  const isReadLater = readLater.includes(manga.id);
  const isFavorite = favorites.includes(manga.id);

  return (
    <div className="detail-modal-overlay animate-fade-in">
      <div className="detail-modal-card glass-panel">
        <button onClick={onClose} className="detail-close-btn">
          <X size={20} />
        </button>

        <div className="detail-hero-banner" style={{ backgroundImage: `url(${manga.bannerImage})` }}>
          <div className="detail-banner-overlay"></div>
        </div>

        <div className="detail-body">
          <div className="detail-cover-column">
            <img
              src={manga.coverImage}
              alt={manga.title}
              className="detail-cover-img"
              onError={(e) => { e.target.src = "/img/download (1).jpg"; }}
            />
          </div>

          <div className="detail-content-column">
            <div className="detail-header-meta">
              <span className="genre-badge">{manga.category}</span>
              <span className="status-tag">{manga.status}</span>
            </div>

            <h1 className="detail-title">{manga.title}</h1>

            <div className="detail-meta-row">
              <span className="meta-item"><User size={14} /> {manga.author}</span>
              <span className="meta-item"><Layers size={14} /> {manga.totalVolumes} Volumes</span>
              <span className="meta-item rating-text">
                <Star size={14} fill="#ffb703" color="#ffb703" /> {manga.rating}
              </span>
            </div>

            <div className="detail-genres-row">
              <Tag size={14} className="tag-icon" />
              {manga.genres?.map((g) => (
                <span key={g} className="genre-pill-tag">{g}</span>
              ))}
            </div>

            <div className="detail-synopsis">
              <h3>Synopsis</h3>
              <p>{manga.synopsis}</p>
            </div>

            <div className="detail-actions">
              <button
                onClick={() => {
                  onClose();
                  onOpenReader(manga);
                }}
                className="btn-primary detail-action-btn"
              >
                <BookOpen size={18} /> READ NOW
              </button>

              <button
                onClick={() => toggleReadLater(manga.id)}
                className={`btn-secondary detail-action-btn ${isReadLater ? "active-saved" : ""}`}
              >
                <Bookmark size={18} fill={isReadLater ? "currentColor" : "none"} />
                {isReadLater ? "In Read-Later" : "+ Add to Read-Later"}
              </button>

              <button
                onClick={() => toggleFavorite(manga.id)}
                className={`btn-secondary detail-action-btn ${isFavorite ? "active-favorite" : ""}`}
              >
                <Heart size={18} fill={isFavorite ? "#ff4757" : "none"} />
                {isFavorite ? "Favorited" : "Favorite"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .detail-modal-overlay {
          position: fixed;
          inset: 0;
          z-index: 1500;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .detail-modal-card {
          position: relative;
          width: 100%;
          max-width: 820px;
          max-height: 90vh;
          overflow-y: auto;
          border-radius: var(--radius-lg);
          padding: 0;
          box-shadow: var(--shadow-glow);
        }

        .detail-close-btn {
          position: absolute;
          top: 16px;
          right: 16px;
          z-index: 10;
          background: rgba(0, 0, 0, 0.6);
          color: #ffffff;
          border-radius: 50%;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .detail-hero-banner {
          height: 160px;
          background-size: cover;
          background-position: center;
          position: relative;
        }

        .detail-banner-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, transparent 20%, var(--bg-primary) 100%);
        }

        .detail-body {
          display: flex;
          gap: 24px;
          padding: 24px;
          margin-top: -60px;
          position: relative;
          z-index: 2;
        }

        .detail-cover-img {
          width: 180px;
          height: 260px;
          object-fit: cover;
          border-radius: var(--radius-md);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
          border: 2px solid var(--border-color);
        }

        .detail-content-column {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .detail-header-meta {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .status-tag {
          font-size: 0.75rem;
          font-weight: 700;
          color: #4ade80;
          background: rgba(74, 222, 128, 0.12);
          padding: 2px 8px;
          border-radius: 10px;
        }

        .detail-title {
          font-family: var(--font-heading);
          font-size: 1.6rem;
          font-weight: 800;
          color: var(--text-main);
          line-height: 1.2;
        }

        .detail-meta-row {
          display: flex;
          align-items: center;
          gap: 16px;
          font-size: 0.85rem;
          color: var(--text-muted);
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .rating-text {
          color: var(--accent-gold);
          font-weight: 700;
        }

        .detail-genres-row {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 6px;
        }

        .tag-icon {
          color: var(--text-muted);
        }

        .genre-pill-tag {
          background: rgba(229, 9, 20, 0.12);
          color: var(--text-accent);
          font-size: 0.75rem;
          padding: 3px 10px;
          border-radius: 12px;
          font-weight: 600;
        }

        .detail-synopsis h3 {
          font-size: 0.95rem;
          margin-bottom: 4px;
          color: var(--text-main);
        }

        .detail-synopsis p {
          font-size: 0.85rem;
          line-height: 1.6;
          color: var(--text-muted);
        }

        .detail-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 8px;
        }

        .detail-action-btn {
          font-size: 0.85rem;
          padding: 10px 16px;
        }

        .active-saved {
          background: var(--accent-red);
          color: #ffffff;
        }

        .active-favorite {
          border-color: var(--accent-red);
          color: var(--accent-red);
        }

        @media (max-width: 640px) {
          .detail-body {
            flex-direction: column;
            align-items: center;
          }
          .detail-cover-img {
            width: 140px;
            height: 200px;
          }
        }
      `}</style>
    </div>
  );
}

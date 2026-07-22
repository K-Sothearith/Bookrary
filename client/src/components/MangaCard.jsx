import React from "react";
import { useAuth } from "../context/AuthContext";
import { Star, Heart, Bookmark, ThumbsUp, ThumbsDown, BookOpen, Info } from "lucide-react";

export default function MangaCard({ manga, onOpenDetail, onOpenReader }) {
  const { readLater, favorites, toggleReadLater, toggleFavorite, requireAuthAction } = useAuth();
  const [likes, setLikes] = React.useState(manga.likeAmount || 0);
  const [dislikes, setDislikes] = React.useState(manga.dislikeAmount || 0);
  const [hasReacted, setHasReacted] = React.useState(false);

  const isReadLater = readLater.includes(manga.id);
  const isFavorite = favorites.includes(manga.id);

  const handleLike = (e) => {
    e.stopPropagation();
    requireAuthAction(async () => {
      if (hasReacted) return;
      setLikes((prev) => prev + 1);
      setHasReacted(true);
      fetch(`http://localhost:5000/api/manga/${manga.id}/reaction`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("bookrary_token")}`
        },
        body: JSON.stringify({ type: "LIKE" })
      }).catch(() => {});
    });
  };

  const handleDislike = (e) => {
    e.stopPropagation();
    requireAuthAction(async () => {
      if (hasReacted) return;
      setDislikes((prev) => prev + 1);
      setHasReacted(true);
      fetch(`http://localhost:5000/api/manga/${manga.id}/reaction`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("bookrary_token")}`
        },
        body: JSON.stringify({ type: "DISLIKE" })
      }).catch(() => {});
    });
  };

  return (
    <div className="manga-card glass-panel" onClick={() => onOpenDetail(manga)}>
      {/* Cover Container */}
      <div className="manga-cover-wrapper">
        <img
          src={manga.coverImage}
          alt={manga.title}
          className="manga-cover-img"
          onError={(e) => {
            e.target.src = "/img/download (1).jpg";
          }}
        />

        <div className="cover-overlay">
          <div className="overlay-actions">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenReader(manga);
              }}
              className="btn-primary overlay-btn"
            >
              <BookOpen size={16} /> READ NOW
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenDetail(manga);
              }}
              className="btn-secondary overlay-btn"
            >
              <Info size={16} /> DETAILS
            </button>
          </div>
        </div>

        {/* Rating Badge */}
        <div className="rating-badge">
          <Star size={12} fill="#ffb703" color="#ffb703" />
          <span>{manga.rating}</span>
        </div>

        {/* Favorite Icon */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(manga.id);
          }}
          className={`favorite-toggle-btn ${isFavorite ? "active" : ""}`}
          title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        >
          <Heart size={16} fill={isFavorite ? "#ff4757" : "none"} />
        </button>
      </div>

      {/* Content Meta */}
      <div className="manga-card-info">
        <div className="category-tag">{manga.category || "Manga"}</div>
        <h3 className="manga-title">{manga.title}</h3>
        <p className="manga-author">Author: {manga.author}</p>
        <p className="manga-volumes">{manga.totalVolumes} Volumes</p>

        {/* Genres Pill List */}
        <div className="genres-pill-container">
          {manga.genres?.slice(0, 3).map((g) => (
            <span key={g} className="genre-pill">
              {g}
            </span>
          ))}
        </div>

        {/* Interactive Bar */}
        <div className="manga-card-bottom">
          <div className="reactions-group">
            <button onClick={handleLike} className="reaction-btn like-btn">
              <ThumbsUp size={14} />
              <span>{likes}</span>
            </button>
            <button onClick={handleDislike} className="reaction-btn dislike-btn">
              <ThumbsDown size={14} />
              <span>{dislikes}</span>
            </button>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleReadLater(manga.id);
            }}
            className={`read-later-btn ${isReadLater ? "in-list" : ""}`}
            title={isReadLater ? "Remove from Read-Later" : "Add to Read-Later"}
          >
            <Bookmark size={14} fill={isReadLater ? "currentColor" : "none"} />
            <span>{isReadLater ? "Saved" : "+ Read Later"}</span>
          </button>
        </div>
      </div>

      <style>{`
        .manga-card {
          display: flex;
          flex-direction: column;
          border-radius: var(--radius-md);
          overflow: hidden;
          transition: all var(--transition-normal);
          cursor: pointer;
        }

        .manga-card:hover {
          transform: translateY(-6px);
          box-shadow: var(--shadow-glow);
          border-color: var(--border-accent);
        }

        .manga-cover-wrapper {
          position: relative;
          width: 100%;
          padding-top: 135%;
          overflow: hidden;
          background: #111;
        }

        .manga-cover-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .manga-card:hover .manga-cover-img {
          transform: scale(1.08);
        }

        .cover-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity var(--transition-fast);
        }

        .manga-card:hover .cover-overlay {
          opacity: 1;
        }

        .overlay-actions {
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding: 16px;
          width: 80%;
        }

        .overlay-btn {
          justify-content: center;
          font-size: 0.8rem;
          padding: 8px 12px;
        }

        .rating-badge {
          position: absolute;
          top: 10px;
          left: 10px;
          background: rgba(0, 0, 0, 0.75);
          backdrop-filter: blur(4px);
          padding: 4px 8px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 0.75rem;
          font-weight: 700;
          color: #ffffff;
        }

        .favorite-toggle-btn {
          position: absolute;
          top: 10px;
          right: 10px;
          background: rgba(0, 0, 0, 0.65);
          color: #ffffff;
          border-radius: 50%;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all var(--transition-fast);
        }

        .favorite-toggle-btn:hover, .favorite-toggle-btn.active {
          color: var(--accent-red);
          background: rgba(0, 0, 0, 0.85);
        }

        .manga-card-info {
          padding: 14px;
          display: flex;
          flex-direction: column;
          gap: 6px;
          flex: 1;
        }

        .category-tag {
          font-size: 0.68rem;
          font-weight: 800;
          color: var(--accent-red);
          text-transform: uppercase;
          letter-spacing: 0.8px;
        }

        .manga-title {
          font-family: var(--font-heading);
          font-size: 0.95rem;
          font-weight: 800;
          line-height: 1.3;
          color: var(--text-main);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .manga-author, .manga-volumes {
          font-size: 0.78rem;
          color: var(--text-muted);
        }

        .genres-pill-container {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
          margin-top: 4px;
        }

        .genre-pill {
          font-size: 0.65rem;
          padding: 2px 6px;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.08);
          color: var(--text-muted);
        }

        .manga-card-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 10px;
          padding-top: 10px;
          border-top: 1px solid var(--border-color);
        }

        .reactions-group {
          display: flex;
          gap: 8px;
        }

        .reaction-btn {
          background: transparent;
          color: var(--text-muted);
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 0.75rem;
          transition: color var(--transition-fast);
        }

        .reaction-btn:hover {
          color: var(--text-main);
        }

        .like-btn:hover {
          color: #4ade80;
        }

        .dislike-btn:hover {
          color: #f87171;
        }

        .read-later-btn {
          background: rgba(229, 9, 20, 0.1);
          color: var(--accent-red);
          border: 1px solid rgba(229, 9, 20, 0.3);
          padding: 4px 8px;
          border-radius: 6px;
          font-size: 0.72rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 4px;
          transition: all var(--transition-fast);
        }

        .read-later-btn.in-list {
          background: var(--accent-red);
          color: #ffffff;
        }
      `}</style>
    </div>
  );
}

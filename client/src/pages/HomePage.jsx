import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MangaCard from "../components/MangaCard";
import { Sparkles, ArrowRight, BookOpen, Flame, Trophy, Clock } from "lucide-react";

export default function HomePage({ onOpenDetail, onOpenReader }) {
  const [mangaList, setMangaList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/manga")
      .then((res) => res.json())
      .then((data) => {
        setMangaList(data.manga || []);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const topFavorites = mangaList.filter((m) => m.category === "Top Favorite").slice(0, 4);
  const trending = mangaList.filter((m) => m.category === "Trending").slice(0, 4);
  const oldButGold = mangaList.filter((m) => m.category === "Old but Gold").slice(0, 4);

  return (
    <div className="home-page-container">
      {/* Hero Header */}
      <section className="hero-banner-section">
        <div className="hero-content">
          <span className="hero-badge">
            <Sparkles size={14} /> NEW WORLD OF MANGA
          </span>
          <h1 className="hero-title">STEP INTO A NEW WORLD</h1>
          <p className="hero-subtitle">
            Stories full of wonder, waiting for you with our handpicked selection of books.
          </p>

          <div className="hero-ctas">
            <Link to="/library" className="btn-primary hero-btn">
              <BookOpen size={18} /> BROWSE LIBRARY
            </Link>
            <Link to="/search" className="btn-secondary hero-btn">
              DISCOVER MORE <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Sections */}
      <main className="home-main-content">
        {/* Top Favorites */}
        <section className="home-section">
          <div className="section-header">
            <div className="section-title-group">
              <Trophy className="section-icon trophy-icon" size={24} />
              <h2>Top Favorites &gt;&gt;</h2>
            </div>
            <Link to="/library" className="view-all-link">View All</Link>
          </div>
          <div className="manga-grid">
            {topFavorites.map((manga) => (
              <MangaCard
                key={manga.id}
                manga={manga}
                onOpenDetail={onOpenDetail}
                onOpenReader={onOpenReader}
              />
            ))}
          </div>
        </section>

        {/* Trending */}
        <section className="home-section">
          <div className="section-header">
            <div className="section-title-group">
              <Flame className="section-icon flame-icon" size={24} />
              <h2>Trending Now &gt;&gt;</h2>
            </div>
            <Link to="/library" className="view-all-link">View All</Link>
          </div>
          <div className="manga-grid">
            {trending.map((manga) => (
              <MangaCard
                key={manga.id}
                manga={manga}
                onOpenDetail={onOpenDetail}
                onOpenReader={onOpenReader}
              />
            ))}
          </div>
        </section>

        {/* Old but Gold */}
        <section className="home-section">
          <div className="section-header">
            <div className="section-title-group">
              <Clock className="section-icon clock-icon" size={24} />
              <h2>Old but Gold &gt;&gt;</h2>
            </div>
            <Link to="/library" className="view-all-link">View All</Link>
          </div>
          <div className="manga-grid">
            {oldButGold.map((manga) => (
              <MangaCard
                key={manga.id}
                manga={manga}
                onOpenDetail={onOpenDetail}
                onOpenReader={onOpenReader}
              />
            ))}
          </div>
        </section>
      </main>

      <style>{`
        .hero-banner-section {
          position: relative;
          min-height: 480px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(180deg, rgba(10, 12, 16, 0.4) 0%, var(--bg-primary) 100%),
                      url('https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1600&auto=format&fit=crop&q=80') center/cover no-repeat;
          text-align: center;
          padding: 80px 24px;
        }

        .hero-content {
          max-width: 800px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 14px;
          background: rgba(229, 9, 20, 0.2);
          border: 1px solid var(--border-accent);
          color: var(--accent-red);
          font-size: 0.8rem;
          font-weight: 800;
          border-radius: 20px;
          letter-spacing: 1px;
        }

        .hero-title {
          font-family: var(--font-logo);
          font-size: 3.5rem;
          letter-spacing: 2px;
          color: #ffffff;
          text-shadow: 0 4px 20px rgba(0, 0, 0, 0.8);
          line-height: 1.1;
        }

        .hero-subtitle {
          font-size: 1.2rem;
          color: var(--text-muted);
          font-style: italic;
          max-width: 600px;
        }

        .hero-ctas {
          display: flex;
          gap: 16px;
          margin-top: 12px;
        }

        .hero-btn {
          padding: 12px 28px;
          font-size: 0.95rem;
        }

        .home-main-content {
          max-width: 1300px;
          margin: 40px auto 0;
          padding: 0 24px;
          display: flex;
          flex-direction: column;
          gap: 60px;
        }

        .home-section {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .section-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .section-title-group {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .section-title-group h2 {
          font-family: var(--font-heading);
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--text-main);
        }

        .trophy-icon { color: var(--accent-gold); }
        .flame-icon { color: var(--accent-red); }
        .clock-icon { color: var(--accent-blue); }

        .view-all-link {
          font-weight: 700;
          font-size: 0.9rem;
          color: var(--accent-red);
        }

        .manga-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 24px;
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.4rem;
          }
          .manga-grid {
            grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
          }
        }
      `}</style>
    </div>
  );
}

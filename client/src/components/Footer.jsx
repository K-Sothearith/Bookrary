import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-inner">
        <div className="footer-col col-brand">
          <h2 className="footer-logo">Bookrary</h2>
          <p className="cadt-tag">Made in Cambodia • CADT Students Project</p>
          <p className="footer-desc">
            Your premium digital space for discovering, organizing, and enjoying manga titles anywhere.
          </p>
          <div className="social-links">
            <img src="/img/facebook (1).png" alt="Facebook" />
            <img src="/img/instagram (1).png" alt="Instagram" />
            <img src="/img/linkedin.png" alt="LinkedIn" />
            <img src="/img/tik-tok.png" alt="TikTok" />
            <img src="/img/twitter.png" alt="Twitter" />
          </div>
        </div>

        <div className="footer-col">
          <h3>Creators</h3>
          <ul>
            <li><a href="#team">Yan Sovanpisoth</a></li>
            <li><a href="#team">Chom Devid</a></li>
            <li><a href="#team">Siv Kimleng</a></li>
            <li><a href="#team">Kong Sothearith</a></li>
            <li><a href="#team">Eav SophalVeha</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h3>Explore</h3>
          <ul>
            <li><Link to="/library">Top Favorites</Link></li>
            <li><Link to="/library">Trending Manga</Link></li>
            <li><Link to="/library">Old but Gold</Link></li>
            <li><Link to="/search">New Releases</Link></li>
            <li><Link to="/about">About CADT Team</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h3>Featured Anime</h3>
          <ul>
            <li><Link to="/search?q=Naruto">Naruto</Link></li>
            <li><Link to="/search?q=One%20Piece">One Piece</Link></li>
            <li><Link to="/search?q=Demon%20Slayer">Demon Slayer</Link></li>
            <li><Link to="/search?q=Attack%20on%20Titan">Attack On Titan</Link></li>
            <li><Link to="/search?q=Jujutsu%20Kaisen">Jujutsu Kaisen</Link></li>
            <li><Link to="/search?q=One%20Punch%20Man">One Punch Man</Link></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Bookrary. All rights reserved. Built with React & Express.</p>
      </div>

      <style>{`
        .footer-container {
          background: var(--bg-secondary);
          border-top: 1px solid var(--border-color);
          padding: 60px 24px 20px;
          margin-top: 80px;
        }

        .footer-inner {
          max-width: 1300px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 40px;
        }

        .footer-logo {
          font-family: var(--font-logo);
          font-size: 2rem;
          color: var(--accent-red);
          margin-bottom: 6px;
        }

        .cadt-tag {
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--text-accent);
          margin-bottom: 10px;
        }

        .footer-desc {
          font-size: 0.85rem;
          color: var(--text-muted);
          line-height: 1.6;
          margin-bottom: 16px;
          max-width: 320px;
        }

        .social-links {
          display: flex;
          gap: 12px;
        }

        .social-links img {
          width: 24px;
          height: 24px;
          opacity: 0.7;
          transition: opacity var(--transition-fast);
        }

        .social-links img:hover {
          opacity: 1;
        }

        .footer-col h3 {
          font-family: var(--font-heading);
          font-size: 1.05rem;
          font-weight: 800;
          margin-bottom: 16px;
          color: var(--text-main);
        }

        .footer-col ul {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .footer-col ul li a {
          font-size: 0.85rem;
          color: var(--text-muted);
          transition: color var(--transition-fast);
        }

        .footer-col ul li a:hover {
          color: var(--accent-red);
        }

        .footer-bottom {
          max-width: 1300px;
          margin: 40px auto 0;
          padding-top: 20px;
          border-top: 1px solid var(--border-color);
          text-align: center;
          font-size: 0.78rem;
          color: var(--text-muted);
        }

        @media (max-width: 900px) {
          .footer-inner {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (max-width: 600px) {
          .footer-inner {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </footer>
  );
}

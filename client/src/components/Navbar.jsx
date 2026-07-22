import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  BookOpen,
  Home,
  Library,
  Bookmark,
  Heart,
  Search,
  Users,
  Mail,
  Sun,
  Moon,
  User,
  LogOut,
  LogIn,
  Menu,
  X
} from "lucide-react";

export default function Navbar() {
  const { user, isGuest, theme, toggleTheme, openAuthModal, logout, readLater, favorites } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setMobileMenuOpen(false);
    }
  };

  const navItems = [
    { label: "HOME", path: "/", icon: Home },
    { label: "LIBRARY", path: "/library", icon: Library },
    { label: "READ LATER", path: "/read-later", icon: Bookmark, badge: readLater.length },
    { label: "FAVORITES", path: "/favorites", icon: Heart, badge: favorites.length },
    { label: "SEARCH", path: "/search", icon: Search },
    { label: "ABOUT US", path: "/about", icon: Users },
    { label: "CONTACT", path: "/contact", icon: Mail }
  ];

  return (
    <nav className="navbar-container">
      <div className="navbar-inner">
        {/* Brand Logo */}
        <Link to="/" className="brand-logo">
          <BookOpen className="logo-icon" size={28} />
          <span className="brand-name">Bookrary</span>
        </Link>

        {/* Search Bar Shortcut */}
        <form onSubmit={handleSearchSubmit} className="nav-search-form">
          <Search size={16} className="nav-search-icon" />
          <input
            type="text"
            placeholder="Search manga or author..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="nav-search-input"
          />
        </form>

        {/* Desktop Links */}
        <div className="nav-links-desktop">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.label}
                to={item.path}
                className={`nav-link ${isActive ? "active" : ""}`}
              >
                <Icon size={16} />
                <span>{item.label}</span>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="nav-badge">{item.badge}</span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Controls: Theme toggle & Auth */}
        <div className="nav-controls">
          <button
            onClick={toggleTheme}
            className="theme-toggle-btn"
            title={`Switch to ${theme === "dark" ? "Light" : "Dark"} mode`}
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {isGuest ? (
            <button onClick={() => openAuthModal("login")} className="auth-btn btn-login">
              <LogIn size={18} />
              <span>LOG IN</span>
            </button>
          ) : (
            <div className="user-profile-menu">
              <div className="user-avatar" title={user.username}>
                <User size={18} />
                <span className="user-name">{user.username}</span>
              </div>
              <button onClick={logout} className="logout-btn" title="Logout">
                <LogOut size={18} />
              </button>
            </div>
          )}

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-menu-toggle"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer animate-fade-in">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.label}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`mobile-nav-link ${isActive ? "active" : ""}`}
              >
                <Icon size={18} />
                <span>{item.label}</span>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="nav-badge">{item.badge}</span>
                )}
              </Link>
            );
          })}
        </div>
      )}

      <style>{`
        .navbar-container {
          position: sticky;
          top: 0;
          z-index: 1000;
          background: var(--bg-glass);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid var(--border-color);
          padding: 12px 24px;
          transition: background var(--transition-normal);
        }

        .navbar-inner {
          max-width: 1300px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
        }

        .brand-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          color: var(--text-accent);
          text-decoration: none;
        }

        .logo-icon {
          color: var(--accent-red);
        }

        .brand-name {
          font-family: var(--font-logo);
          font-size: 1.8rem;
          letter-spacing: 1px;
          background: linear-gradient(135deg, #ff4757, #ffa502);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .nav-search-form {
          position: relative;
          display: flex;
          align-items: center;
          flex: 1;
          max-width: 260px;
        }

        .nav-search-icon {
          position: absolute;
          left: 12px;
          color: var(--text-muted);
        }

        .nav-search-input {
          width: 100%;
          padding: 8px 12px 8px 36px;
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: 20px;
          color: var(--text-main);
          font-size: 0.85rem;
          outline: none;
          transition: border-color var(--transition-fast);
        }

        .nav-search-input:focus {
          border-color: var(--accent-red);
        }

        .nav-links-desktop {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .nav-link {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-heading);
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          padding: 6px 10px;
          border-radius: var(--radius-sm);
          transition: all var(--transition-fast);
        }

        .nav-link:hover, .nav-link.active {
          color: var(--text-main);
          background: rgba(229, 9, 20, 0.12);
        }

        .nav-link.active {
          color: var(--accent-red);
        }

        .nav-badge {
          background: var(--accent-red);
          color: #ffffff;
          font-size: 0.7rem;
          font-weight: 800;
          padding: 2px 6px;
          border-radius: 10px;
          margin-left: 2px;
        }

        .nav-controls {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .theme-toggle-btn {
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          color: var(--text-main);
          padding: 8px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all var(--transition-fast);
        }

        .theme-toggle-btn:hover {
          color: var(--accent-gold);
          border-color: var(--accent-gold);
        }

        .auth-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 16px;
          border-radius: 20px;
          font-weight: 700;
          font-size: 0.85rem;
          background: linear-gradient(135deg, var(--accent-red), var(--accent-crimson));
          color: #ffffff;
          transition: all var(--transition-fast);
        }

        .auth-btn:hover {
          box-shadow: 0 4px 15px rgba(229, 9, 20, 0.4);
          transform: translateY(-1px);
        }

        .user-profile-menu {
          display: flex;
          align-items: center;
          gap: 10px;
          background: var(--bg-card);
          padding: 6px 12px;
          border-radius: 20px;
          border: 1px solid var(--border-color);
        }

        .user-avatar {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.85rem;
          font-weight: 600;
        }

        .logout-btn {
          background: transparent;
          color: var(--text-muted);
          display: flex;
          align-items: center;
          padding: 4px;
          border-radius: 50%;
          transition: color var(--transition-fast);
        }

        .logout-btn:hover {
          color: var(--accent-red);
        }

        .mobile-menu-toggle {
          display: none;
          background: transparent;
          color: var(--text-main);
        }

        .mobile-drawer {
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding: 16px;
          background: var(--bg-glass);
          border-top: 1px solid var(--border-color);
        }

        .mobile-nav-link {
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: 600;
          color: var(--text-main);
          padding: 10px;
          border-radius: var(--radius-sm);
        }

        @media (max-width: 992px) {
          .nav-links-desktop {
            display: none;
          }
          .mobile-menu-toggle {
            display: block;
          }
        }
      `}</style>
    </nav>
  );
}

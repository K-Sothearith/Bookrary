import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { ALLOWED_EMAIL_DOMAINS } from "../utils/validators";
import { X, Lock, Mail, User, AlertCircle, CheckCircle, ShieldAlert } from "lucide-react";

export default function AuthModal() {
  const { authModalOpen, authModalTab, closeAuthModal, openAuthModal, login, register } = useAuth();
  const [tab, setTab] = useState(authModalTab);

  // Form State
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("18");
  const [rememberMe, setRememberMe] = useState(false);

  // Status & Validation Feedback
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTab(authModalTab);
    setErrorMessage("");
    setSuccessMessage("");
    // Check remembered email on login tab
    const rememberedEmail = localStorage.getItem("bookrary_remembered_email");
    if (rememberedEmail) {
      setEmail(rememberedEmail);
      setRememberMe(true);
    }
  }, [authModalTab, authModalOpen]);

  if (!authModalOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setLoading(true);

    if (tab === "login") {
      const res = await login(email, password, rememberMe);
      setLoading(false);
      if (res.success) {
        setSuccessMessage("Welcome back to Bookrary!");
      } else {
        setErrorMessage(res.error);
      }
    } else {
      const res = await register(username, email, password, age);
      setLoading(false);
      if (res.success) {
        setSuccessMessage("Account created successfully! Welcome to Bookrary.");
      } else {
        setErrorMessage(res.error);
      }
    }
  };

  return (
    <div className="auth-modal-overlay animate-fade-in">
      <div className="auth-modal-card glass-panel">
        <button onClick={closeAuthModal} className="auth-modal-close">
          <X size={20} />
        </button>

        <div className="auth-guest-banner">
          <ShieldAlert size={20} className="banner-icon" />
          <span>Member Feature: Log in to save manga, favorite, and react!</span>
        </div>

        {/* Tab Switcher */}
        <div className="auth-tabs">
          <button
            onClick={() => { setTab("login"); setErrorMessage(""); }}
            className={`auth-tab ${tab === "login" ? "active" : ""}`}
          >
            LOG IN
          </button>
          <button
            onClick={() => { setTab("register"); setErrorMessage(""); }}
            className={`auth-tab ${tab === "register" ? "active" : ""}`}
          >
            SIGN UP
          </button>
        </div>

        {errorMessage && (
          <div className="auth-alert error-alert">
            <AlertCircle size={18} />
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="auth-alert success-alert">
            <CheckCircle size={18} />
            <span>{successMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          {tab === "register" && (
            <div className="form-group">
              <label>Username</label>
              <div className="input-wrapper">
                <User size={16} className="input-icon" />
                <input
                  type="text"
                  placeholder="e.g. MangaMaster"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </div>
          )}

          <div className="form-group">
            <label>Email Address</label>
            <div className="input-wrapper">
              <Mail size={16} className="input-icon" />
              <input
                type="email"
                placeholder="your.email@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            {tab === "register" && (
              <small className="field-hint">
                Allowed: @gmail.com, @outlook.com, @student.cadt.edu.kh, @icloud.com, @yahoo.com
              </small>
            )}
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="input-wrapper">
              <Lock size={16} className="input-icon" />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {tab === "register" && (
              <small className="field-hint">
                Must be &ge; 6 characters, with 1 uppercase, 1 lowercase, 1 number, and 1 special symbol.
              </small>
            )}
          </div>

          {tab === "register" && (
            <div className="form-group">
              <label>Age</label>
              <input
                type="number"
                min="10"
                max="100"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="age-input"
                required
              />
            </div>
          )}

          {tab === "login" && (
            <div className="remember-me-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span>Remember me on this browser</span>
              </label>
            </div>
          )}

          <button type="submit" disabled={loading} className="btn-primary auth-submit-btn">
            {loading ? "Processing..." : tab === "login" ? "LOG IN TO BOOKRARY" : "CREATE ACCOUNT"}
          </button>
        </form>
      </div>

      <style>{`
        .auth-modal-overlay {
          position: fixed;
          inset: 0;
          z-index: 2000;
          background: rgba(0, 0, 0, 0.75);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .auth-modal-card {
          position: relative;
          width: 100%;
          max-width: 440px;
          padding: 32px;
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-glow);
        }

        .auth-modal-close {
          position: absolute;
          top: 16px;
          right: 16px;
          background: transparent;
          color: var(--text-muted);
          padding: 4px;
          border-radius: 50%;
        }

        .auth-modal-close:hover {
          color: var(--text-main);
        }

        .auth-guest-banner {
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(229, 9, 20, 0.15);
          border: 1px solid var(--border-accent);
          padding: 10px 14px;
          border-radius: var(--radius-sm);
          font-size: 0.8rem;
          color: var(--text-accent);
          margin-bottom: 20px;
        }

        .auth-tabs {
          display: flex;
          border-bottom: 2px solid var(--border-color);
          margin-bottom: 20px;
        }

        .auth-tab {
          flex: 1;
          padding: 10px;
          background: transparent;
          color: var(--text-muted);
          font-weight: 700;
          font-size: 0.9rem;
          transition: all var(--transition-fast);
        }

        .auth-tab.active {
          color: var(--accent-red);
          border-bottom: 2px solid var(--accent-red);
        }

        .auth-alert {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          padding: 10px 14px;
          border-radius: var(--radius-sm);
          font-size: 0.82rem;
          margin-bottom: 16px;
        }

        .error-alert {
          background: rgba(220, 38, 38, 0.15);
          color: #f87171;
          border: 1px solid rgba(220, 38, 38, 0.3);
        }

        .success-alert {
          background: rgba(34, 197, 94, 0.15);
          color: #4ade80;
          border: 1px solid rgba(34, 197, 94, 0.3);
        }

        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .form-group label {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-main);
        }

        .input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-icon {
          position: absolute;
          left: 12px;
          color: var(--text-muted);
        }

        .input-wrapper input {
          width: 100%;
          padding: 10px 12px 10px 38px;
          background: var(--bg-primary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          color: var(--text-main);
          outline: none;
          font-size: 0.9rem;
        }

        .input-wrapper input:focus {
          border-color: var(--accent-red);
        }

        .field-hint {
          font-size: 0.72rem;
          color: var(--text-muted);
          line-height: 1.3;
        }

        .age-input {
          padding: 8px 12px;
          background: var(--bg-primary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          color: var(--text-main);
        }

        .remember-me-group {
          display: flex;
          align-items: center;
        }

        .checkbox-label {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.85rem;
          color: var(--text-muted);
          cursor: pointer;
        }

        .auth-submit-btn {
          width: 100%;
          justify-content: center;
          padding: 12px;
          margin-top: 8px;
        }
      `}</style>
    </div>
  );
}

import React, { useState } from "react";
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Maximize2, Layers, BookOpen, Settings } from "lucide-react";

export default function MockReader({ manga, onClose }) {
  const [currentChapter, setCurrentChapter] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages] = useState(24);
  const [viewMode, setViewMode] = useState("flipper"); // 'flipper' | 'webtoon'
  const [zoomLevel, setZoomLevel] = useState(100);

  if (!manga) return null;

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    } else {
      setCurrentChapter((prev) => prev + 1);
      setCurrentPage(1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    } else if (currentChapter > 1) {
      setCurrentChapter((prev) => prev - 1);
      setCurrentPage(totalPages);
    }
  };

  const progressPercent = Math.round((currentPage / totalPages) * 100);

  return (
    <div className="reader-overlay animate-fade-in">
      {/* Top Reader Header Bar */}
      <div className="reader-toolbar">
        <div className="reader-left-meta">
          <button onClick={onClose} className="reader-exit-btn">
            <X size={20} />
            <span>Close Reader</span>
          </button>
          <div className="reader-manga-title">
            <h2>{manga.title}</h2>
            <span className="reader-author">by {manga.author}</span>
          </div>
        </div>

        {/* Navigation & Controls */}
        <div className="reader-controls-center">
          <div className="selector-group">
            <Layers size={16} />
            <select
              value={currentChapter}
              onChange={(e) => {
                setCurrentChapter(parseInt(e.target.value));
                setCurrentPage(1);
              }}
              className="chapter-dropdown"
            >
              {Array.from({ length: 20 }, (_, i) => i + 1).map((ch) => (
                <option key={ch} value={ch}>
                  Chapter {ch}: {manga.title} Arc
                </option>
              ))}
            </select>
          </div>

          <div className="view-mode-group">
            <button
              onClick={() => setViewMode("flipper")}
              className={`mode-btn ${viewMode === "flipper" ? "active" : ""}`}
            >
              Page Flipper
            </button>
            <button
              onClick={() => setViewMode("webtoon")}
              className={`mode-btn ${viewMode === "webtoon" ? "active" : ""}`}
            >
              Vertical Scroll
            </button>
          </div>
        </div>

        {/* Right Action Icons */}
        <div className="reader-right-actions">
          <button
            onClick={() => setZoomLevel((z) => Math.max(z - 15, 70))}
            className="zoom-btn"
            title="Zoom Out"
          >
            <ZoomOut size={18} />
          </button>
          <span className="zoom-text">{zoomLevel}%</span>
          <button
            onClick={() => setZoomLevel((z) => Math.min(z + 15, 140))}
            className="zoom-btn"
            title="Zoom In"
          >
            <ZoomIn size={18} />
          </button>
        </div>
      </div>

      {/* Reader Progress Bar */}
      <div className="reader-progress-track">
        <div className="reader-progress-fill" style={{ width: `${progressPercent}%` }}></div>
      </div>

      {/* Main Manga Reader Body */}
      <div className="reader-viewport">
        {viewMode === "flipper" ? (
          <div className="flipper-mode-container" style={{ transform: `scale(${zoomLevel / 100})` }}>
            <button
              onClick={handlePrev}
              disabled={currentPage === 1 && currentChapter === 1}
              className="nav-arrow nav-arrow-left"
            >
              <ChevronLeft size={32} />
            </button>

            {/* Page Art Panel Showcase */}
            <div className="manga-page-frame glass-panel">
              <div className="page-watermark">BOOKRARY MANGA READER • CHAPTER {currentChapter}</div>
              <img
                src={manga.coverImage}
                alt={`Page ${currentPage}`}
                className="manga-page-img"
                onError={(e) => { e.target.src = "/img/download (1).jpg"; }}
              />
              <div className="page-footer-bar">
                <span>Page {currentPage} of {totalPages}</span>
                <span className="preview-tag">INTERACTIVE READER MOCK</span>
              </div>
            </div>

            <button onClick={handleNext} className="nav-arrow nav-arrow-right">
              <ChevronRight size={32} />
            </button>
          </div>
        ) : (
          /* Vertical Webtoon Mode */
          <div className="webtoon-mode-container" style={{ transform: `scale(${zoomLevel / 100})` }}>
            {[1, 2, 3, 4, 5].map((pNum) => (
              <div key={pNum} className="webtoon-page-item glass-panel">
                <img
                  src={manga.coverImage}
                  alt={`Vertical Panel ${pNum}`}
                  className="webtoon-img"
                  onError={(e) => { e.target.src = "/img/download (1).jpg"; }}
                />
                <div className="webtoon-page-label">Panel #{pNum}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Floating Nav Bar */}
      <div className="reader-bottom-bar">
        <div className="page-counter">
          Page {currentPage} / {totalPages} ({progressPercent}% Completed)
        </div>
      </div>

      <style>{`
        .reader-overlay {
          position: fixed;
          inset: 0;
          z-index: 3000;
          background: #05070a;
          color: #ffffff;
          display: flex;
          flex-direction: column;
        }

        .reader-toolbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 24px;
          background: #0d1117;
          border-bottom: 1px solid var(--border-color);
        }

        .reader-left-meta {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .reader-exit-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          background: rgba(229, 9, 20, 0.15);
          color: var(--accent-red);
          border: 1px solid var(--border-accent);
          padding: 6px 12px;
          border-radius: 20px;
          font-weight: 700;
          font-size: 0.8rem;
          transition: all var(--transition-fast);
        }

        .reader-exit-btn:hover {
          background: var(--accent-red);
          color: #ffffff;
        }

        .reader-manga-title h2 {
          font-size: 1rem;
          font-family: var(--font-heading);
          font-weight: 800;
          margin: 0;
        }

        .reader-author {
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .reader-controls-center {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .selector-group {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #161b22;
          padding: 6px 12px;
          border-radius: 8px;
          border: 1px solid var(--border-color);
        }

        .chapter-dropdown {
          background: transparent;
          color: #ffffff;
          border: none;
          outline: none;
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
        }

        .view-mode-group {
          display: flex;
          background: #161b22;
          border-radius: 8px;
          padding: 2px;
        }

        .mode-btn {
          padding: 6px 12px;
          border-radius: 6px;
          background: transparent;
          color: var(--text-muted);
          font-size: 0.78rem;
          font-weight: 700;
        }

        .mode-btn.active {
          background: var(--accent-red);
          color: #ffffff;
        }

        .reader-right-actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .zoom-btn {
          background: #161b22;
          color: var(--text-main);
          padding: 6px;
          border-radius: 6px;
        }

        .zoom-text {
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--text-muted);
        }

        .reader-progress-track {
          width: 100%;
          height: 3px;
          background: #161b22;
        }

        .reader-progress-fill {
          height: 100%;
          background: var(--accent-red);
          transition: width 0.3s ease;
        }

        .reader-viewport {
          flex: 1;
          overflow-y: auto;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          position: relative;
        }

        .flipper-mode-container {
          display: flex;
          align-items: center;
          gap: 20px;
          transition: transform 0.2s ease;
        }

        .nav-arrow {
          background: rgba(22, 27, 34, 0.8);
          color: #ffffff;
          border-radius: 50%;
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all var(--transition-fast);
        }

        .nav-arrow:hover:not(:disabled) {
          background: var(--accent-red);
          transform: scale(1.1);
        }

        .nav-arrow:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }

        .manga-page-frame {
          width: 480px;
          max-width: 90vw;
          height: 680px;
          max-height: 80vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          padding: 16px;
          border-radius: var(--radius-md);
          background: #090c10;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.8);
          border: 1px solid var(--border-accent);
        }

        .page-watermark {
          font-size: 0.7rem;
          font-weight: 800;
          letter-spacing: 1px;
          color: var(--accent-red);
        }

        .manga-page-img {
          max-width: 100%;
          max-height: 80%;
          object-fit: contain;
          border-radius: 6px;
        }

        .page-footer-bar {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .preview-tag {
          font-weight: 800;
          color: var(--accent-gold);
        }

        .webtoon-mode-container {
          display: flex;
          flex-direction: column;
          gap: 20px;
          align-items: center;
          padding: 20px;
        }

        .webtoon-page-item {
          width: 550px;
          max-width: 90vw;
          padding: 12px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .webtoon-img {
          width: 100%;
          border-radius: 8px;
        }

        .webtoon-page-label {
          margin-top: 8px;
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .reader-bottom-bar {
          padding: 8px 24px;
          background: #0d1117;
          border-top: 1px solid var(--border-color);
          text-align: center;
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text-muted);
        }
      `}</style>
    </div>
  );
}

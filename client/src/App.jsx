import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AuthModal from "./components/AuthModal";
import MangaDetailModal from "./components/MangaDetailModal";
import MockReader from "./components/MockReader";

import HomePage from "./pages/HomePage";
import LibraryPage from "./pages/LibraryPage";
import ReadLaterPage from "./pages/ReadLaterPage";
import FavoritesPage from "./pages/FavoritesPage";
import SearchPage from "./pages/SearchPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";

export default function App() {
  const [selectedMangaDetail, setSelectedMangaDetail] = useState(null);
  const [selectedMangaReader, setSelectedMangaReader] = useState(null);

  const handleOpenDetail = (manga) => {
    setSelectedMangaDetail(manga);
  };

  const handleCloseDetail = () => {
    setSelectedMangaDetail(null);
  };

  const handleOpenReader = (manga) => {
    setSelectedMangaReader(manga);
  };

  const handleCloseReader = () => {
    setSelectedMangaReader(null);
  };

  return (
    <AuthProvider>
      <Router>
        <div className="app-main-layout">
          <Navbar />

          <div className="app-content-body">
            <Routes>
              <Route
                path="/"
                element={
                  <HomePage
                    onOpenDetail={handleOpenDetail}
                    onOpenReader={handleOpenReader}
                  />
                }
              />
              <Route
                path="/library"
                element={
                  <LibraryPage
                    onOpenDetail={handleOpenDetail}
                    onOpenReader={handleOpenReader}
                  />
                }
              />
              <Route
                path="/read-later"
                element={
                  <ReadLaterPage
                    onOpenDetail={handleOpenDetail}
                    onOpenReader={handleOpenReader}
                  />
                }
              />
              <Route
                path="/favorites"
                element={
                  <FavoritesPage
                    onOpenDetail={handleOpenDetail}
                    onOpenReader={handleOpenReader}
                  />
                }
              />
              <Route
                path="/search"
                element={
                  <SearchPage
                    onOpenDetail={handleOpenDetail}
                    onOpenReader={handleOpenReader}
                  />
                }
              />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </div>

          <Footer />

          {/* Global Modals */}
          <AuthModal />

          {selectedMangaDetail && (
            <MangaDetailModal
              manga={selectedMangaDetail}
              onClose={handleCloseDetail}
              onOpenReader={handleOpenReader}
            />
          )}

          {selectedMangaReader && (
            <MockReader
              manga={selectedMangaReader}
              onClose={handleCloseReader}
            />
          )}
        </div>
      </Router>
    </AuthProvider>
  );
}

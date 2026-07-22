import React, { createContext, useContext, useState, useEffect } from "react";
import { validateEmail, validatePassword } from "../utils/validators";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("bookrary_token") || null);
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("bookrary_user");
    return saved ? JSON.parse(saved) : null;
  });

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("bookrary_theme") || "dark";
  });

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState("login");

  // User persistent state for Read Later & Favorites
  const [readLater, setReadLater] = useState(() => {
    const saved = localStorage.getItem("bookrary_readlater");
    return saved ? JSON.parse(saved) : [];
  });

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("bookrary_favorites");
    return saved ? JSON.parse(saved) : [];
  });

  // Apply theme to document element
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("bookrary_theme", theme);
  }, [theme]);

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem("bookrary_readlater", JSON.stringify(readLater));
  }, [readLater]);

  useEffect(() => {
    localStorage.setItem("bookrary_favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);

    if (user && token) {
      // Sync with server API asynchronously
      fetch("http://localhost:5000/api/auth/preferences", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ modePreference: nextTheme })
      }).catch(() => {});
    }
  };

  const openAuthModal = (tab = "login") => {
    setAuthModalTab(tab);
    setAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setAuthModalOpen(false);
  };

  const login = async (email, password, rememberMe = false) => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }

      setToken(data.token);
      setUser(data.user);
      localStorage.setItem("bookrary_token", data.token);
      localStorage.setItem("bookrary_user", JSON.stringify(data.user));

      if (rememberMe) {
        localStorage.setItem("bookrary_remembered_email", email);
      } else {
        localStorage.removeItem("bookrary_remembered_email");
      }

      if (data.user.modePreference) {
        setTheme(data.user.modePreference);
      }

      closeAuthModal();
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const register = async (username, email, password, age) => {
    if (!validateEmail(email)) {
      return {
        success: false,
        error: "Email domain must be @gmail.com, @outlook.com, @student.cadt.edu.kh, @icloud.com, or @yahoo.com."
      };
    }

    if (!validatePassword(password)) {
      return {
        success: false,
        error: "Password must be >= 6 chars, with at least 1 uppercase, 1 lowercase, 1 number, and 1 special char."
      };
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password, age })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Registration failed");
      }

      setToken(data.token);
      setUser(data.user);
      localStorage.setItem("bookrary_token", data.token);
      localStorage.setItem("bookrary_user", JSON.stringify(data.user));

      closeAuthModal();
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("bookrary_token");
    localStorage.removeItem("bookrary_user");
  };

  // Protected Action Handler: If user is Guest, show login popup modal!
  const requireAuthAction = (actionCallback) => {
    if (!user || !token) {
      openAuthModal("login");
      return false;
    }
    actionCallback();
    return true;
  };

  const toggleReadLater = (mangaId) => {
    return requireAuthAction(() => {
      setReadLater((prev) =>
        prev.includes(mangaId) ? prev.filter((id) => id !== mangaId) : [...prev, mangaId]
      );
    });
  };

  const toggleFavorite = (mangaId) => {
    return requireAuthAction(() => {
      setFavorites((prev) =>
        prev.includes(mangaId) ? prev.filter((id) => id !== mangaId) : [...prev, mangaId]
      );
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isGuest: !user,
        theme,
        toggleTheme,
        authModalOpen,
        authModalTab,
        openAuthModal,
        closeAuthModal,
        login,
        register,
        logout,
        requireAuthAction,
        readLater,
        favorites,
        toggleReadLater,
        toggleFavorite
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

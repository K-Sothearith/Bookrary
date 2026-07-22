# 📚 Bookrary — Full-Stack Manga Web Application (React + Express)

![Bookrary Banner](client/public/img/jujustu%20kaisen.jpg)

> **From First-Year HTML/CSS Web Design to Full-Stack React + Express**
> 
> *Bookrary* originated as a web design showcase project created by students at the **Cambodia Academy of Digital Technology (CADT)**. Today, it has been completely remade into a modern full-stack single-page application (SPA) powered by **React.js** on the frontend, **Express.js** REST API on the backend, and persistent LocalStorage state management.

---

## 🌟 Transformation Story & Project Evolution

When we first learned web development at CADT, our team created the original static HTML + CSS website to showcase manga titles. As our technical skillset expanded into modern frontend frameworks (**React JS**) and backend API architecture (**Express JS**), we rebuilt *Bookrary* from the ground up:

* **Legacy Codebase Preservation**: All original HTML and CSS static files are safely archived inside the [`Original/`](./Original) folder.
* **Modern UI & Aesthetic**: Upgraded with a dark glassmorphic design system, dynamic animations, custom themes, and mobile-responsive drawers.
* **Interactive Appearance & Mock Reader**: Added a full-screen Manga Reader experience with chapter selection, zoom controls, double-page flipper view, and vertical webtoon scrolling.
* **Full-Stack REST API**: Built a modular Express backend server serving a rich catalogue of **100 manga titles** spanning 15+ genres.

---

## 🚀 Key Features

### 🔐 1. Account Authentication & Security Rules (JWT)
* **Email Domain Validation**: Registration is restricted to authorized email domains:
  * `@gmail.com`
  * `@outlook.com`
  * `@student.cadt.edu.kh`
  * `@icloud.com`
  * `@yahoo.com`
* **Strong Password Requirements**: Password must be at least **6 characters** long and contain:
  * At least 1 uppercase letter (`A-Z`)
  * At least 1 lowercase letter (`a-z`)
  * At least 1 numeric digit (`0-9`)
  * At least 1 special character (`!@#$%^&*...`)
* **"Remember Me" Capability**: Saves login credentials to local storage so returning users are automatically pre-filled.
* **Theme Synchronization**: Persistent user preference for **Dark Mode** or **Light Mode**.

---

### 🛡️ 2. Guest vs. Member Role Model
* **Guest Access**: Guest users can freely browse the homepage, filter the library, perform live searches, read full manga synopses, and open the interactive reader.
* **Protected Member Actions**: Interactive actions require authentication:
  * 👍 **Like Manga**
  * 👎 **Dislike Manga**
  * ❤️ **Add to Favorites**
  * 🔖 **Add to Read-Later List**
* **Auth Interceptor Modal**: When a guest clicks any protected button, an interactive **Auth Required Modal** prompts them to Log In or Sign Up.

---

### 📖 3. Interactive Mock Manga Reader UI
Focusing on high-fidelity appearance and UI state:
* **Chapter Selector**: Dropdown selection covering chapters 1–20.
* **View Modes**: Toggle between **Page Flipper** (horizontal turn) and **Vertical Scroll** (Webtoon mode).
* **Zoom Controls**: Adjust zoom levels from `70%` to `140%`.
* **Reading Progress Bar**: Visual track displaying completion percentage (`Page X of Y`).

---

### 🎨 4. 100 Multi-Genre Manga Catalogue
Includes 100 titles categorized under *Top Favorite*, *Trending*, *Old but Gold*, and *New Releases*, with genre tags covering:
> **Supernatural • Dark Fantasy • Shonen • Shojo • Seinen • School • Isekai • Fantasy • Comedy • Adventure • Action • Slice of Life • Romance • Horror • Sci-Fi**

---

## 🛠️ Tech Stack & Architecture

| Layer | Technologies Used |
| :--- | :--- |
| **Frontend UI** | React 18, Vite, Lucide React Icons, React Router v6, Vanilla CSS Tokens |
| **Backend REST API** | Express.js, Node.js (ES Modules), CORS, Body-Parser |
| **Auth & Security** | JSON Web Tokens (`jsonwebtoken`), Password Hashing (`bcryptjs`), Domain Validators |
| **Persistence** | Browser LocalStorage engine & Express in-memory state fallback |
| **Original Archive** | Legacy HTML5 & CSS3 archived in [`Original/`](./Original) |

---

## 📁 Repository Structure

```
Bookrary/
├── Original/                    # Preserved first-version HTML & CSS files
│   ├── index.html
│   ├── library8.html
│   ├── search2.html
│   ├── login3.html
│   ├── aboutus9.html
│   └── ...
├── server/                      # Express REST API Service
│   ├── config/
│   ├── data/
│   │   └── mangaData.js        # 100 multi-genre manga dataset
│   ├── routes/
│   │   ├── auth.js             # JWT Login, Register, Validation
│   │   ├── manga.js            # Filtering, Search, Reactions
│   │   └── contact.js          # Form handler
│   ├── utils/
│   │   └── validators.js       # Email domain & password complexity rules
│   ├── package.json
│   └── server.js               # Express application entry point
├── client/                      # Vite + React Single-Page Application
│   ├── public/
│   │   └── img/                # Anime covers & CADT assets
│   ├── src/
│   │   ├── components/         # Navbar, Footer, MangaCard, AuthModal, MockReader
│   │   ├── context/            # AuthContext & ThemeContext
│   │   ├── pages/              # Home, Library, ReadLater, Favorites, Search, About, Contact
│   │   ├── utils/              # Client-side validators
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css           # Glassmorphic design system
│   └── package.json
└── README.md                    # Upscaled Project Documentation
```

---

## 📡 API Endpoint Reference

### 1. Authentication Endpoints (`/api/auth`)
* `POST /api/auth/register` — Creates user account after verifying email domain & password strength.
* `POST /api/auth/login` — Authenticates credentials and returns signed JWT token.
* `GET /api/auth/me` — Fetches current user profile from `Bearer` header token.
* `PUT /api/auth/preferences` — Updates light/dark theme preference.

### 2. Manga Endpoints (`/api/manga`)
* `GET /api/manga` — Returns manga catalogue with optional `search`, `category`, and `genre` filters.
* `GET /api/manga/:id` — Fetches detailed metadata for a single manga title.
* `POST /api/manga/:id/reaction` — Protected endpoint to record `LIKE` or `DISLIKE`.

### 3. Contact Endpoint (`/api/contact`)
* `POST /api/contact` — Submits contact form messages to CADT support.

---

## ⚡ Getting Started

### Prerequisites
* [Node.js](https://nodejs.org/) (v18+ recommended)
* `npm` (v9+ recommended)

### 1. Running the Express Backend Server
```bash
cd server
npm install
npm run dev
```
The backend REST API will start at: `http://localhost:5000`

### 2. Running the React Frontend Application
In a new terminal window:
```bash
cd client
npm install
npm run dev
```
The React SPA will start at: `http://localhost:5173`

---

## 👨‍💻 CADT Student Creator Team

| Member | Department | Role & Focus |
| :--- | :--- | :--- |
| **Yan Sovanpisoth** | Computer Science | Frontend Lead & UI Architect |
| **Chom Devid** | Computer Science | Backend Engineer & Data Modeling |
| **Siv Kimleng** | Telecom & Networking | Infrastructure & API Integration |
| **Kong Sothearith** | Computer Science | UX Specialist & Reader UI |
| **Eav SophalVeha** | Telecom & Networking | State Management & QA Lead |

---

## 📄 License & Acknowledgments

Created with ❤️ by **Cambodia Academy of Digital Technology (CADT)** students. All original code preserved in `Original/`. Designed for educational and web application development demonstration purposes.

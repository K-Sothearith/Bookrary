# 📚 Bookrary — Full-Stack Manga Web Application (React + Express + Aiven MySQL)

![Bookrary Banner](client/public/img/jujustu%20kaisen.jpg)

> **From First-Year HTML/CSS Web Design to Full-Stack React + Express + Cloud Database**
> 
> *Bookrary* originated as a web design showcase project created by students at the **Cambodia Academy of Digital Technology (CADT)**. Today, it has been completely remade into a modern full-stack single-page application (SPA) powered by **React.js** on the frontend, **Express.js** REST API on the backend, and **Aiven Cloud MySQL** relational database.

---

## 🌟 Transformation Story & Project Evolution

When we first learned web development at CADT, our team created the original static HTML + CSS website to showcase manga titles. As our technical skillset expanded into modern frontend frameworks (**React JS**), backend API architecture (**Express JS**), and cloud relational database management (**MySQL on Aiven Cloud**), we rebuilt *Bookrary* from the ground up:

* **Legacy Codebase Preservation**: All original HTML and CSS static files are safely archived inside the [`Original/`](./Original) folder.
* **Modular Database Directory (`Database/`)**: Separated into 3 dedicated subfolders:
  * [`Database/schema/`](./Database/schema): DDL scripts defining database tables.
  * [`Database/seeds/`](./Database/seeds): DML seed scripts containing inserted manga records.
  * [`Database/privileges/`](./Database/privileges): SQL privileges and user permission scripts.
* **Modern UI & Aesthetic**: Upgraded with a dark glassmorphic design system, dynamic animations, custom themes, and mobile-responsive drawers.
* **Interactive Appearance & Mock Reader**: Added a full-screen Manga Reader experience with chapter selection, zoom controls, double-page flipper view, and vertical webtoon scrolling.
* **Full-Stack REST API & Cloud Database**: Built a modular Express backend server connected via SSL connection pool to **Aiven MySQL Cloud** hosting **100 manga titles** spanning 15+ genres.

---

## 🗄️ Database Architecture (`Database/`)

```
Database/
├── schema/
│   └── schema.sql        # Table DDL definitions (users, manga, user_favorites, user_read_later, user_reactions)
├── seeds/
│   └── mangaSeed.sql     # Inserted manga dataset SQL seeds (100 manga titles)
├── privileges/
│   └── privileges.sql    # User access control & GRANT statements
└── initDb.js             # Automated database connection pool manager & schema flow
```

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
Includes 100 titles stored in MySQL categorized under *Top Favorite*, *Trending*, *Old but Gold*, and *New Releases*, with genre tags covering:
> **Supernatural • Dark Fantasy • Shonen • Shojo • Seinen • School • Isekai • Fantasy • Comedy • Adventure • Action • Slice of Life • Romance • Horror • Sci-Fi**

---

## 🛠️ Tech Stack & Architecture

| Layer | Technologies Used |
| :--- | :--- |
| **Frontend UI** | React 18, Vite, Lucide React Icons, React Router v6, Vanilla CSS Tokens |
| **Backend REST API** | Express.js, Node.js (ES Modules), CORS, Body-Parser |
| **Database** | Aiven MySQL Cloud, `mysql2/promise` Connection Pool |
| **Auth & Security** | JSON Web Tokens (`jsonwebtoken`), Password Hashing (`bcryptjs`), Domain Validators |
| **Original Archive** | Legacy HTML5 & CSS3 archived in [`Original/`](./Original) |
| **Database Folders** | `Database/schema/`, `Database/seeds/`, `Database/privileges/` |

---

## 📁 Repository Structure

```
Bookrary/
├── Database/                    # Dedicated Database Directory
│   ├── schema/
│   │   └── schema.sql          # Table DDL for Aiven MySQL
│   ├── seeds/
│   │   └── mangaSeed.sql       # 100 manga SQL insert statements
│   ├── privileges/
│   │   └── privileges.sql      # User permission & GRANT statements
│   └── initDb.js               # Connection pool manager & seed runner
├── Original/                    # Preserved first-version HTML & CSS files
│   ├── index.html
│   ├── library8.html
│   ├── search2.html
│   └── ...
├── server/                      # Express REST API Service
│   ├── .env                    # Secret environment config (Aiven credentials & JWT)
│   ├── config/
│   │   └── db.js               # MySQL connection pool wrapper
│   ├── data/
│   │   └── mangaData.js        # 100 multi-genre manga dataset
│   ├── routes/
│   │   ├── auth.js             # JWT Login, Register, Validation
│   │   ├── manga.js            # SQL Filtering, Search, Reactions
│   │   └── contact.js          # Form handler
│   └── server.js               # Express application entry point
├── client/                      # Vite + React Single-Page Application
│   ├── public/
│   │   └── img/                # Anime covers & CADT assets
│   ├── src/
│   │   ├── components/         # Navbar, Footer, MangaCard, AuthModal, MockReader
│   │   ├── context/            # AuthContext & ThemeContext
│   │   ├── pages/              # Home, Library, ReadLater, Favorites, Search, About, Contact
│   │   └── index.css           # Glassmorphic design system
│   └── package.json
└── README.md                    # Upscaled Project Documentation
```

---

## ⚡ Getting Started

### Prerequisites
* [Node.js](https://nodejs.org/) (v18+ recommended)
* `npm` (v9+ recommended)

### 1. Running the Express Backend Server
```bash
npm run server
```
The backend REST API will start at `http://localhost:5000` and connect to **Aiven MySQL Cloud** (`mysql-3e35218b-kst-rithh07.e.aivencloud.com`).

### 2. Running the React Frontend Application
In a new terminal window:
```bash
npm run client
```
The React SPA will start at `http://localhost:5173`.

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

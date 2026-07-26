# DONUTS - Donut Shop & Cafe Website

A modern, professional, fully responsive, full-stack website for **DONUTS**, a premier Donut Shop and Cafe. This project is built using a React.js frontend (styled with Tailwind CSS) and a Node.js/Express backend. 

To make it immediately runnable without requiring a local database setup, the backend features an **automatic JSON database fallback**. If a MongoDB connection string is not provided, it will read/write mock collections stored in local files.

---

## Key Features

- **Home Page:** Beautiful design with custom typography, hero area, brand features, dynamic best-selling product grid, customer testimonials, photo preview gallery, and newsletter subscriptions.
- **Menu Page:** Search bar, category tab filters (Classic, Premium, Filled, Minis, Coffee & Drinks) and responsive add-to-cart buttons.
- **Online Ordering & Cart:** Context-based shopping cart review, quantity adjustment, home delivery vs. store pickup options, validation for promo coupons, simulated secure payment checkout flow, and live order tracking.
- **Gallery Page:** Masonry photo layouts and full-screen modal lightbox.
- **Contact Page:** Fully functioning message contact form, business open hours, visual mock map pinpoint, and expandable FAQ accordion.
- **Blog Section:** Blog stories list and article readers.
- **Admin Dashboard Console:** Restricted to store managers. Features sales metrics counters, custom SVG interactive line and bar charts (no bloated packages), and CRUD lists to add/edit/delete products, manage the order prep queue, generate coupons, and review customers.
- **Dark Mode:** Fluid dark/light theme switching persistable in `localStorage`.
- **Live Chat Simulation:** Floating chat widget that simulates automated answers based on customer inquiry keywords (like `menu`, `hours`, `delivery`, `coupon`, etc.).

---

## Technology Stack

- **Frontend:** React.js, Vite, Tailwind CSS, PostCSS, Lucide React Icons.
- **Backend:** Node.js, Express.js, CORS, JSON Web Tokens (JWT), Bcrypt.js (password hashing).
- **Database:** MongoDB (via Mongoose) with an automatic Local JSON file storage fallback.

---

## Project Structure

```
donuts-shop/
├── package.json               # Root monorepo orchestrator
├── README.md                  # This documentation file
│
├── backend/                   # Node.js + Express backend
│   ├── server.js              # Server entry point
│   ├── config/
│   │   ├── db.js              # Database router
│   │   └── mockDbHelper.js    # JSON database helper & seed compiler
│   ├── data/                  # Local JSON database files (automatically created)
│   ├── models/                # DB model layers (Mongoose/Mock wrappers)
│   ├── routes/                # REST endpoints
│   └── middleware/            # Auth middlewares
│
└── frontend/                  # React.js + Tailwind CSS frontend
    ├── vite.config.js         # Vite compile configuration
    ├── tailwind.config.js     # Tailwind design system settings
    ├── postcss.config.js      # PostCSS configurations
    ├── index.html             # HTML shell + SEO meta tags + Google Fonts
    └── src/
        ├── main.jsx           # React app mount
        ├── App.jsx            # Router and layout mount
        ├── index.css          # Core CSS stylesheet, scrollbars & animations
        ├── context/           # React Context state controllers
        │   ├── AuthContext.jsx
        │   ├── CartContext.jsx
        │   └── ThemeContext.jsx
        ├── components/        # Reusable UI widgets
        │   ├── Navbar.jsx
        │   ├── Footer.jsx
        │   ├── ProductCard.jsx
        │   ├── LiveChat.jsx
        │   └── DashboardCharts.jsx
        └── pages/             # Route views
            ├── Home.jsx
            ├── About.jsx
            ├── Menu.jsx
            ├── Ordering.jsx
            ├── Gallery.jsx
            ├── Contact.jsx
            ├── Blog.jsx
            └── AdminDashboard.jsx
```

---

## Setup & Running Instructions

### 1. Install Dependencies
You can install dependencies for both the frontend and backend with a single command from the root folder:
```bash
npm run install-all
```
*Alternatively, you can run `npm install` inside both the `backend/` and `frontend/` folders individually.*

### 2. Configure Environment (Optional)
If you wish to connect to a real MongoDB instance, create a `.env` file inside the `backend/` directory:
```env
PORT=5000
JWT_SECRET=your-custom-jwt-secret-key
MONGO_URI=mongodb://localhost:27017/donuts
```
*If you don't create this file, the app will run on port `5000` and use the JSON files under `backend/data/` automatically.*

### 3. Run the Application
Start both the backend server and frontend development server simultaneously:
```bash
npm run dev
```
- **Backend API:** Runs at [http://localhost:5000](http://localhost:5000)
- **Frontend App:** Runs at [http://localhost:5173](http://localhost:5173) (or the port specified by Vite in console)

---

## Demo Credentials

- **Admin Account:**
  - **Email:** `admin@donuts.com`
  - **Password:** `admin123`
- **Promo Coupon Codes:**
  - `DONUTLOVE` - 10% Off
  - `SWEETDEAL` - 20% Off on orders over $30.00
  - `FIRSTDONUT` - $5.00 Off on orders over $15.00

---

## Production Build & Deployment

To build the React frontend for production deployment:
```bash
npm run build-frontend
```
This generates static optimized build files in `frontend/dist/`. 

To deploy:
1. Upload the `backend/` folder to a Node host (such as Render, Railway, Heroku, or AWS EC2).
2. Configure the environment variables (specifically `MONGO_URI` and `JWT_SECRET`) on the hosting provider.
3. Configure the static assets inside `frontend/dist/` to be served by the backend or deploy them separately to a CDN or static web host (such as Vercel, Netlify, or AWS S3).

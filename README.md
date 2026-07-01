# EduManage | MERN Student Management System

A production-ready Student Management System built using the MERN Stack. The application features user authentication, a live analytics dashboard, full CRUD operations on student profiles, and multi-theme customization settings.

## Technology Stack

- **Frontend**: React (Vite), React Router DOM, Axios, Lucide Icons, Vanilla CSS Design System
- **Backend**: Node.js, Express.js (MVC Pattern, Global Error Handling)
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT + bcryptjs
- **File Upload**: Multer

---

## Getting Started

### Prerequisites
- **Node.js** (v16+)
- **MongoDB** (running locally on port `27017` or an Atlas URI)

### 1. Backend Configuration & Setup
1. Open a terminal and navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install the backend dependencies:
   ```bash
   npm install
   ```
3. The server environment variable configuration is located in the generated `.env` file. Modify it if you are using an external database link:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://127.0.0.1:27017/student-management
   JWT_SECRET=supersecretjwtkey12345!
   JWT_EXPIRE=30d
   NODE_ENV=development
   ```
4. Run the API development server (uses nodemon):
   ```bash
   npm run dev
   ```

### 2. Frontend Configuration & Setup
1. Open a second terminal window and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install the frontend dependencies:
   ```bash
   npm install
   ```
3. Start the Vite React development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to `http://localhost:3000` to launch the application.

---

## Application Structure

- **Splash Screen**: Gorgeous initial loader animation while validating session integrity.
- **Welcome / Landing**: Explains system properties and provides access buttons.
- **Login / Signup**: Security portal for admin credentials management.
- **Forgot Password**: Immediate password reset mechanism.
- **Dashboard**: Panel showing aggregate counts (total, male, female, department counts) and quick action toggles.
- **Student List Directory**: Interactive grid containing search inputs, gender/department/year select filters, sorting, and pagination.
- **Add / Edit Student**: Standard input forms supporting image uploads and previews.
- **Student Details**: Expanded view displaying all student fields.
- **Profile Page**: Update admin names, emails, and passwords.
- **Settings Page**: Change styling themes (Classic Blue, Beige Harmony, Slate Minimalist) and logout.

---

## Directory Overview

```
Student-management-system/
├── backend/
│   ├── config/             # DB Connectivity
│   ├── controllers/        # Express router controllers
│   ├── middleware/         # Auth, Uploads, Error handlers
│   ├── models/             # Mongoose Schemas (User, Student)
│   ├── routes/             # REST routing paths
│   └── server.js           # Express App initialization
├── frontend/
│   ├── src/
│   │   ├── components/     # UI Parts (Navbar, Sidebar, forms, cards)
│   │   ├── context/        # Auth states provider
│   │   ├── pages/          # Layout views (Dashboard, Lists, etc.)
│   │   ├── services/       # Axios wrappers
│   │   └── index.css       # Core styling & theme properties
└── README.md               # Setup Guide
```

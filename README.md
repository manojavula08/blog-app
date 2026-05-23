# Blog App

This repository contains a full-stack blog application with a FastAPI backend and a Next.js (React) frontend. The backend provides RESTful APIs for user authentication and blog management, while the frontend offers a modern, responsive UI for interacting with the blog platform.

---

## Table of Contents
- [Features](#features)
- [Project Structure](#project-structure)
- [Backend (FastAPI)](#backend-fastapi)
- [Frontend (Next.js)](#frontend-nextjs)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

---
<<<<<<< HEAD
# ---- This line added by Junior Developer ---- #

# ---- this line added by Senior dev manojavula08 ---- #
>>>>>>> 4ae9dd65503b603fd0cb795f40c930fe9dce87f0

## Features
- User registration and authentication
- Create, read, update, and delete blog posts
- RESTful API design
- Modern UI with Next.js and Tailwind CSS
- Modular code structure for scalability

---

## Project Structure
```
blog-app/
│
├── FastAPI/                # Backend source code
│   ├── database.py         # Database connection and setup
│   ├── main.py             # FastAPI app entry point
│   ├── models.py           # SQLAlchemy models
│   ├── router/             # API routers
│   │   ├── blogRouter.py   # Blog-related endpoints
│   │   └── userRouter.py   # User-related endpoints
│   └── schemas/            # Pydantic schemas
│       ├── auth.py         # Auth schemas
│       └── blogPath.py     # Blog schemas
│
├── react-blog/             # Frontend source code
│   ├── src/app/            # Next.js app directory
│   │   ├── globals.css     # Global styles
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Main page
│   ├── public/             # Static assets
│   ├── package.json        # Frontend dependencies
│   └── ...                 # Other config files
│
├── requirement.txt         # Python backend dependencies
└── README.md               # Project documentation
```

---

## Backend (FastAPI)
- **Framework:** FastAPI
- **Database:** (Configured in `database.py`, e.g., SQLite/PostgreSQL)
- **ORM:** SQLAlchemy
- **Authentication:** JWT-based (see `schemas/auth.py`)
- **API Routers:**
  - `router/blogRouter.py`: Blog CRUD endpoints
  - `router/userRouter.py`: User registration/login endpoints

### How to Run Backend
1. Create a virtual environment and activate it:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
2. Install dependencies:
   ```bash
   pip install -r requirement.txt
   ```
3. Start the FastAPI server:
   ```bash
   uvicorn FastAPI.main:app --reload
   ```
4. The API will be available at `http://localhost:8000`.

---

## Frontend (Next.js)
- **Framework:** Next.js (React)
- **Styling:** Tailwind CSS
- **TypeScript:** Enabled

### How to Run Frontend
1. Navigate to the frontend directory:
   ```bash
   cd react-blog
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. The app will be available at `http://localhost:3000`.

---

## API Endpoints

### User
- `POST /users/register` — Register a new user
- `POST /users/login` — Authenticate and get JWT token

### Blog
- `GET /blogs/` — List all blogs
- `POST /blogs/` — Create a new blog
- `GET /blogs/{id}` — Get a blog by ID
- `PUT /blogs/{id}` — Update a blog
- `DELETE /blogs/{id}` — Delete a blog

> **Note:** See FastAPI docs at `http://localhost:8000/docs` when the backend is running.

---

## Contributing
1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes
4. Push to your branch
5. Open a pull request

---

## License
This project is licensed under the MIT License.

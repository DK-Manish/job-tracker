# 🗂️Job Application Tracker

A full-stack job application tracker with a Kanban-style board, built with FastAPI, React, and PostgreSQL.

![Python](https://img.shields.io/badge/Python-3.12-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-green)
![React](https://img.shields.io/badge/React-18-61DAFB)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue)

## ✨ Features

- 🔐 JWT authentication (register/login)
- 📋 Kanban board — drag and drop across 5 stages
- ➕ Add, edit, and delete job applications
- 📊 Application status tracking (Wishlist → Applied → Interview → Offer → Rejected)
- 🔒 All job data is private per user

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | FastAPI, SQLAlchemy, PostgreSQL |
| Auth | JWT (python-jose), bcrypt (passlib) |
| Frontend | React 18, Vite, React Router |
| Drag & Drop | @hello-pangea/dnd |
| API Client | Axios |

## Getting Started

### Backend Setup
```bash
cd backend
pipenv install
cp .env.example .env
pipenv shell
uvicorn app.main:app --reload
```
API docs: http://localhost:8000/docs

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
App: http://localhost:5173

## 📬 API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | /auth/register | Register new user | ❌ |
| POST | /auth/login | Login + get JWT | ❌ |
| GET | /jobs/ | Get all jobs | ✅ |
| POST | /jobs/ | Create job | ✅ |
| PATCH | /jobs/{id} | Update job | ✅ |
| DELETE | /jobs/{id} | Delete job | ✅ |

## 🧪 Testing
Import `postman_collection.json` into Postman to test all endpoints.
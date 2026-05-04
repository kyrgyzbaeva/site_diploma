 Project Overview

This project is a **web-based medical management system** designed to simplify patient data handling, authentication, and healthcare workflow management.

The system consists of:
- **Frontend** (React + Vite)
- **Backend** (FastAPI)
- REST API communication between client and server

---

##  Objective

The goal of this project is to build a simple, user-friendly platform for managing medical data, allowing healthcare workers to:

- Log into the system
- View patient information
- Manage records efficiently
- Improve workflow through a digital interface

---

##  Problem Statement

Many small clinics and medical institutions still rely on:
- Paper records
- Disorganized spreadsheets
- Outdated systems

This leads to:
- Data loss risks
- Slow access to information
- Human errors

---

##  Solution

This system provides:
- Secure authentication
- Clean dashboard interface
- Centralized patient data
- Fast and structured data access

---

##  Technology Stack

### Frontend
- React (JSX)
- Vite
- JavaScript
- CSS

### Backend
- FastAPI (Python)
- Pydantic (data validation)

### Other Tools
- Git & GitHub
- Vercel (Frontend Deployment)
- Render (Backend Deployment)

---

##  Project Structure
```
site_diploma/
│
├── frontend/        # REACT
│   ├── src/
│   ├── package.json
│   └── vite.config.js
│
├── backend/         # FastAPI 
│   ├── main.py
│   └── models.py
│
└── docker-compose.yml
```
---

## 🔗 API Endpoints

The backend provides REST API endpoints for authentication, patient management, and comments.

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/login` | User authentication |
| GET | `/api/patients` | Get all patients |
| GET | `/api/patients/{pid}` | Get patient by ID |
| POST | `/api/patients` | Create a new patient |
| POST | `/api/comments` | Add a doctor comment |

### Swagger Documentation

When the backend is running locally, API documentation is available at:

```text
http://localhost:8000/docs

##  Installation & Run (Local)

### 1. Clone repository
```bash
git clone https://github.com/kyrgyzbaeva/site_diploma.git
cd site_diploma
```


### 2. Backend setup
```
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

### 3. Backend runs on
```
http://localhost:8000
```
### 4. Frontend setup
```
cd frontend
npm install
npm run dev
```
### 5. Frontend runs on
```
http://localhost:3000
```
## Deployment frontend
```
https://site-diploma-pi.vercel.app/
```
## API Integration
```
http://localhost:8000/docs
```
##  Features

- User authentication (Login)
- Dashboard interface
- Patient data management
- API communication between frontend and backend
- Modular and scalable project structure

---

##  Future Improvements

- Database integration (PostgreSQL)
- Role-based access control (Admin / Doctor)
- Patient history tracking
- UI/UX improvements
- Deployment optimization

---

##  Conclusion

This project demonstrates the development of a full-stack web application in the medical domain, combining modern frontend technologies with a Python backend.

It addresses real-world challenges by digitizing patient data management and improving efficiency in healthcare processes.

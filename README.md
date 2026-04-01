Telemedicine Dashboard

A modern web-based dashboard for telemedicine services, enabling healthcare providers to manage patients, appointments, and medical data efficiently.

---

 Overview

Telemedicine Dashboard is designed to streamline remote healthcare services by providing tools for:

- Patient management
- Appointment scheduling
- Video consultations
- Medical records tracking
- Data visualization and analytics

---

Features

- Patient Management – Add, edit, and monitor patient profiles  
- Appointments – Schedule and manage consultations  
- Video Calls – Integrated telemedicine sessions  
- Dashboard Analytics – Visual insights into system usage  
- Authentication & Security – Secure login and protected routes  

---

Tech Stack

Frontend
- JavaScript

 Backend
- Php

Database
- phpMyAdmin/XAMPP

Infrastructure
- Docker 
- REST API architecture

---

Project Structure

```
project-root/
├── backend/
│   ├── src/
│   ├── routes/
│   ├── controllers/
│   └── server.ts
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   └── App.tsx
│
├── README.md
└── docker-compose.yml
```ME.md
└── docker-compose.yml


 Quick Start

 1. Clone repository

```bash
git clone <your-repo-url>
cd your-project
```

 2. Frontend setup

```bash
cd frontend
npm install
npm run dev
```

 Deployment

 Using Docker

```bash
docker compose up -d --build
```

The application will be available at:

- Frontend: [http://localhost:8000](http://localhost:8000)

---

 Manual Deployment


 Frontend

```bash
cd frontend
npm install
npm run build
```

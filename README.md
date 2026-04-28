# TechAcademy Backend API

## Setup

1. Install dependencies:
```
npm install
```

2. Configure `.env`:
```
MONGO_URI=mongodb://localhost:27017/techacademy
PORT=5000
```

3. Run the server:
```
npm run dev   # development (nodemon)
npm start     # production
```

4. Seed courses:
```
POST http://localhost:5000/api/courses/seed/all
```

## API Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| GET | /api/courses | Get all courses (filter: category, level, search) |
| GET | /api/courses/:id | Get single course |
| POST | /api/courses | Create course |
| PUT | /api/courses/:id | Update course |
| DELETE | /api/courses/:id | Delete course |
| POST | /api/courses/seed/all | Seed 8 sample courses |
| POST | /api/enrollments | Enroll a student |
| GET | /api/enrollments | Get all enrollments |
| GET | /api/enrollments/student/:email | Get enrollments by email |
| GET | /api/students | Get all students |
| GET | /api/students/:email | Get student by email |
| POST | /api/contact | Submit contact form |
| GET | /api/contact | Get all contact messages |

# Student Course Management System API

ระบบ **Student Course Management System (Backend API)**  
พัฒนาโดยใช้ **Node.js + Express** เชื่อมกับฐานข้อมูล **Supabase (PostgreSQL)**  
ใช้สำหรับจัดการข้อมูลนักศึกษา รายวิชา และการลงทะเบียนเรียน

---

## 1. Features

- จัดการนักศึกษา (Students)
  - `GET /students` – ดึงรายการนักศึกษาทั้งหมด
  - `POST /students` – เพิ่มนักศึกษาใหม่
  - `PUT /students/:id` – แก้ไขข้อมูลนักศึกษา
  - `DELETE /students/:id` – ลบนักศึกษา

- จัดการรายวิชา (Courses)
  - `GET /courses` – ดึงรายการรายวิชาทั้งหมด
  - `POST /courses` – เพิ่มรายวิชาใหม่

- การลงทะเบียนเรียน (Enrollments)
  - `POST /enrollments` – ผูกความสัมพันธ์นักศึกษา ↔ วิชา
  - `GET /students/:id/courses` – ดูรายวิชาที่นักศึกษาคนหนึ่งลงทะเบียนไว้

---

## 2. Tech Stack

- Runtime: **Node.js** (18+)
- Framework: **Express.js**
- Database: **Supabase (PostgreSQL)**
- Tools: Postman, GitHub, Render

---

## 3. Project Structure

```text
.
├─ index.js                 # main Express server (API routes)
├─ package.json

├─ /postman
│   ├─ student-course-api.postman_collection.json
│   └─ student-course-api.postman_environment.json

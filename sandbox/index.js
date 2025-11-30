// index.js (sandbox version ไม่ใช้ Supabase)

const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// ==================== MOCK DATABASE ใน MEMORY ====================

let students = []; // [{ id, fullname, email, major }]
let courses = []; // [{ id, name, description, credit }]
let enrollments = []; // [{ id, student_id, course_id }]

let studentIdSeq = 1;
let courseIdSeq = 1;
let enrollmentIdSeq = 1;

// ==================== HEALTH CHECK ====================

app.get("/", (req, res) => {
  res.json({
    message: "Student Course Management API (Sandbox) is running",
    docs: ["/students", "/courses", "/enrollments", "/students/:id/courses"],
  });
});

// ==================== STUDENTS CRUD ====================

// GET /students
app.get("/students", (req, res) => {
  res.json(students);
});

// POST /students
app.post("/students", (req, res) => {
  const { fullname, email, major } = req.body;

  if (!fullname || !email || !major) {
    return res
      .status(400)
      .json({ error: "fullname, email, major are required" });
  }

  const newStudent = {
    id: studentIdSeq++,
    fullname,
    email,
    major,
  };
  students.push(newStudent);
  res.status(201).json(newStudent);
});

// PUT /students/:id
app.put("/students/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { fullname, email, major } = req.body;

  const index = students.findIndex((s) => s.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Student not found" });
  }

  students[index] = {
    ...students[index],
    fullname: fullname ?? students[index].fullname,
    email: email ?? students[index].email,
    major: major ?? students[index].major,
  };

  res.json(students[index]);
});

// DELETE /students/:id
app.delete("/students/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const index = students.findIndex((s) => s.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Student not found" });
  }

  students.splice(index, 1);
  enrollments = enrollments.filter((e) => e.student_id !== id);

  res.status(204).send();
});

// ==================== COURSES ====================

// GET /courses
app.get("/courses", (req, res) => {
  res.json(courses);
});

// POST /courses
app.post("/courses", (req, res) => {
  const { name, description, credit } = req.body;

  if (!name || credit == null) {
    return res.status(400).json({ error: "name and credit are required" });
  }

  const newCourse = {
    id: courseIdSeq++,
    name,
    description: description || "",
    credit,
  };
  courses.push(newCourse);
  res.status(201).json(newCourse);
});

// ==================== ENROLLMENTS ====================

// POST /enrollments
app.post("/enrollments", (req, res) => {
  const { student_id, course_id } = req.body;

  if (!student_id || !course_id) {
    return res
      .status(400)
      .json({ error: "student_id and course_id are required" });
  }

  const student = students.find((s) => s.id === student_id);
  const course = courses.find((c) => c.id === course_id);

  if (!student) {
    return res.status(404).json({ error: "Student not found" });
  }
  if (!course) {
    return res.status(404).json({ error: "Course not found" });
  }

  const newEnrollment = {
    id: enrollmentIdSeq++,
    student_id,
    course_id,
  };
  enrollments.push(newEnrollment);
  res.status(201).json(newEnrollment);
});

// GET /students/:id/courses
app.get("/students/:id/courses", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const student = students.find((s) => s.id === id);

  if (!student) {
    return res.status(404).json({ error: "Student not found" });
  }

  const enrolled = enrollments.filter((e) => e.student_id === id);
  const result = enrolled.map((e) => {
    const course = courses.find((c) => c.id === e.course_id);
    return {
      enrollment_id: e.id,
      course_id: course?.id,
      course_name: course?.name,
      credit: course?.credit,
    };
  });

  res.json(result);
});

// ==================== START SERVER ====================

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Sandbox API running on port ${port}`);
});

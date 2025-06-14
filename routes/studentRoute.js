const express = require("express");
const {
  getStudents,
  getStudentByid,
  createStudent,
  updateStudent,
  deleteStudent,
} = require("../controllers/studentController");

// Create router instance
const router = express.Router();

// ===========================
// Student Routes
// ===========================

// Get all students
router.get("/list", getStudents);

// Get a student by ID
router.get("/get/:id", getStudentByid);

// Create a new student
router.post("/create", createStudent);

// Update an existing student
router.put("/update/:id", updateStudent);

// Delete a student
router.delete("/delete/:id", deleteStudent);

module.exports = router;

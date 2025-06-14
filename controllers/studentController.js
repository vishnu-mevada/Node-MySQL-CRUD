const db = require("../config/db");

// GET ALL STUDENTS
const getStudents = async (req, res, next) => {
  try {
    const [records] = await db.query("SELECT * FROM students");

    res.status(200).json({
      success: true,
      message: "All student records retrieved",
      total: records.length,
      records,
    });
  } catch (error) {
    next(error);
  }
};

// GET STUDENT BY ID
const getStudentByid = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      const error = new Error("Student ID is required");
      error.statusCode = 400;
      throw error;
    }

    const [student] = await db.query("SELECT * FROM students WHERE id = ?", [id]);

    if (student.length === 0) {
      const error = new Error("No student found with the given ID");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      message: "Student details retrieved",
      data: student[0],
    });
  } catch (error) {
    next(error);
  }
};

// CREATE STUDENT
const createStudent = async (req, res, next) => {
  try {
    const { name, roll_no, fees, class_no, medium } = req.body;

    if (!name || !roll_no || !fees || !class_no || !medium) {
      const error = new Error("All fields are required");
      error.statusCode = 400;
      throw error;
    }

    await db.query(
      `INSERT INTO students (name, roll_no, fees, class_no, medium) VALUES (?, ?, ?, ?, ?)`,
      [name, roll_no, fees, class_no, medium]
    );

    res.status(201).json({
      success: true,
      message: "New student created successfully",
    });
  } catch (error) {
    next(error);
  }
};

// UPDATE STUDENT
const updateStudent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, roll_no, fees, class_no, medium } = req.body;

    if (!id) {
      const error = new Error("Student ID is required");
      error.statusCode = 400;
      throw error;
    }

    if (!name || !roll_no || !fees || !class_no || !medium) {
      const error = new Error("All fields are required");
      error.statusCode = 400;
      throw error;
    }

    const [result] = await db.query(
      `UPDATE students SET name = ?, roll_no = ?, fees = ?, class_no = ?, medium = ? WHERE id = ?`,
      [name, roll_no, fees, class_no, medium, id]
    );

    if (result.affectedRows === 0) {
      const error = new Error("No student found to update with the given ID");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      message: "Student record updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

// DELETE STUDENT
const deleteStudent = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      const error = new Error("Student ID is required");
      error.statusCode = 400;
      throw error;
    }

    const [rows] = await db.query("SELECT * FROM students WHERE id = ?", [id]);

    if (rows.length === 0) {
      const error = new Error("No student found with the given ID");
      error.statusCode = 404;
      throw error;
    }

    await db.query("DELETE FROM students WHERE id = ?", [id]);

    res.status(200).json({
      success: true,
      message: "Student deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getStudents,
  getStudentByid,
  createStudent,
  updateStudent,
  deleteStudent,
};

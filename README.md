# 🧑‍🎓 Student Management API

This is a simple **Node.js** RESTful API for managing student data using **Express** and **MySQL**.

---

## 🚀 Getting Started

To start the project, run the following command:

```bash
npm install
```

```bash
npm run start
```

## 🚀 Features

- ✅ Get all students
- ✅ Get student by ID
- ✅ Create a new student
- ✅ Update existing student
- ✅ Delete student
- ✅ Global error handling
- ✅ MySQL database integration
- ✅ Environment variable support using `.env`

---

## 🛠️ Technologies Used

- Node.js
- Express.js
- MySQL
- dotenv
- morgan

---

## 📁 Project Structure

project-root/
│
├── config/
│ └── db.js # MySQL connection pool
│
├── controllers/
│ └── studentController.js
│
├── middleware/
│ └── errorHandler.js # Global error handler
│
├── routes/
│ └── studentRoute.js
│
├── .env # Environment variables
├── .gitignore
├── app.js # Entry point
├── package.json
└── README.md


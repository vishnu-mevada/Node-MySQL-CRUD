const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const mySqlPool = require("./config/db");
const errorHandler = require("./middlewares/errorHandler");

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/api/v1/student", require("./routes/studentRoute"));

// Health check/test route
app.get("/test", (req, res) => {
  res.status(200).send("<h1>MySQL Node.js CRUD API is running</h1>");
});

// Handle 404 - Not Found
app.use((req, res, next) => {
  const error = new Error("Route not found");
  error.statusCode = 404;
  next(error);
});

// Global Error Handler
app.use(errorHandler);

// Port configuration
const PORT = process.env.PORT || 8000;

// Start server only if MySQL is connected
mySqlPool
  .query("SELECT 1")
  .then(() => {
    console.log("✅ MySQL DB connected");

    app.listen(PORT, () => {
      console.log(`🚀 Server is running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ Failed to connect to MySQL:", error.message);
  });

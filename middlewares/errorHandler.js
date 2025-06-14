const errorHandler = (err, req, res, next) => {
  console.error("Global Error:", err.stack || err);

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
    error: process.env.NODE_ENV === "development" ? err.stack : {},
  });
};

module.exports = errorHandler;

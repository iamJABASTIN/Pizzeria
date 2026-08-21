const errorHandler = (err, req, res, next) => {
  console.error("Error caught by global handler:", err);
  
  const status = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  
  res.status(status).json({
    success: false,
    message: message,
    error: process.env.NODE_ENV === "development" || !process.env.NODE_ENV ? err.stack : undefined
  });
};

module.exports = errorHandler;

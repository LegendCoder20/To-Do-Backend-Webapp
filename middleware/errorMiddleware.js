const errorHandler = (err, req, res, next) => {
  console.error(err);

  // "next"  to call any Further Middleware
  const statusCode = res.statusCode ? res.statusCode : 500; // 500 is an Server Error
  res.status(statusCode);

  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

module.exports = {
  errorHandler,
};

module.exports = (app) => {
  // 404 - Route not found
  app.use((req, res, next) => {
    res.status(404).json({
      message: "This route does not exist",
    });
  });

  // Global error handler
  app.use((err, req, res, next) => {
    console.error("ERROR 💥", err);

    if (err.name === "ValidationError") {
      return res.status(400).json({
        message: err.message,
      });
    }

    if (err.name === "CastError") {
      return res.status(400).json({
        message: "Invalid ID format",
      });
    }

    res.status(500).json({
      message: "Internal server error",
    });
  });
};

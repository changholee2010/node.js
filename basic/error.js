const express = require("express");
const app = express();

app.use(express.json());

/* ===============================
   1. Custom Error Class
================================ */
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

/* ===============================
   2. Normal Route
================================ */
app.get("/success", (req, res) => {
  res.json({ message: "This works!" });
});

/* ===============================
   3. Route That Throws Error
================================ */
app.get("/error", (req, res, next) => {
  const error = new AppError("Something went wrong", 400);
  next(error); // Send error to error middleware
});

/* ===============================
   4. 404 Handler (Route Not Found)
================================ */
app.use((req, res, next) => {
  next(new AppError("Route not found", 404));
});

/* ===============================
   5. Global Error Handling Middleware
================================ */
app.use((err, req, res, next) => {
  console.error("Error:", err.message);

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message,
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

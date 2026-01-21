require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

// 👇 IMPORT DB CONNECTION
const { connectDB } = require("./db");

/* =========================
   CORS
========================= */
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

/* =========================
   BODY PARSER
========================= */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* =========================
   DB CONNECTION (EACH REQUEST)
========================= */
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (e) {
    next(e);
  }
});

/* =========================
   CONFIG
========================= */
require("./config")(app);

/* =========================
   ROUTES
========================= */
app.use("/auth", require("./routes/auth.routes"));
app.use("/api/profiles", require("./routes/profiles.routes"));
app.use("/api/projects", require("./routes/project.routes"));

/* =========================
   ERROR HANDLING (AL FINAL)
========================= */
require("./error-handling")(app);

module.exports = app;

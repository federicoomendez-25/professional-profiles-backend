require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

/* =========================
   CORS (CLAVE)
========================= */
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://professional-profiles.vercel.app"
    ],
    credentials: true
  })
);

/* =========================
   BODY PARSER
========================= */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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

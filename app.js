require("dotenv").config();
require("./db");

const express = require("express");
const app = express();

require("./config")(app);

// AUTH
const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

// PROFILES
const profileRoutes = require("./routes/profiles.routes");
app.use("/api/profiles", profileRoutes);

// PROJECTS
const projectRoutes = require("./routes/project.routes");
app.use("/api/projects", projectRoutes);

// ERROR HANDLING (SIEMPRE AL FINAL)
require("./error-handling")(app);

module.exports = app;

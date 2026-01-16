require("dotenv").config();
require("./db");

const express = require("express");
const app = express();

require("./config")(app);

// Routes
const indexRoutes = require("./routes/index.routes");
app.use("/api", indexRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

const profileRoutes = require("./routes/profiles.routes");
app.use("/api/profiles", profileRoutes);

const projectRoutes = require("./routes/project.routes");
app.use("/api/projects", projectRoutes);

// Error handling
require("./error-handling")(app);

module.exports = app;

require("dotenv").config();
require("./db");

const express = require("express");
const app = express();

require("./config")(app);

// AUTH
app.use("/auth", require("./routes/auth.routes"));

// PROFILES
app.use("/api/profiles", require("./routes/profiles.routes"));

// PROJECTS
app.use("/api/projects", require("./routes/project.routes"));

// ERRORS (SIEMPRE AL FINAL)
require("./error-handling")(app);

module.exports = app;

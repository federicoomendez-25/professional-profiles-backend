const express = require("express");
const router = express.Router();

// Auth routes
router.use("/auth", require("./auth.routes"));

// Profile routes
router.use("/profiles", require("./profiles.routes"));

// Test route (opcional)
router.get("/", (req, res) => {
  res.json("All good in here");
});

module.exports = router;

const router = require("express").Router();
const Project = require("../models/Project.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");

// 🔹 GET /api/projects/profile/:profileId
router.get("/profile/:profileId", async (req, res, next) => {
  try {
    const projects = await Project.find({
      profile: req.params.profileId,
    });

    res.status(200).json(projects);
  } catch (error) {
    next(error);
  }
});

// 🔐 POST /api/projects
router.post("/", isAuthenticated, async (req, res, next) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json(project);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

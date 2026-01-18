const express = require("express");
const router = express.Router();

const Project = require("../models/Project.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");

// GET projects by profile
router.get("/profile/:profileId", async (req, res, next) => {
  try {
    const projects = await Project.find({
      profile: req.params.profileId,
    });
    res.json(projects);
  } catch (err) {
    next(err);
  }
});

// GET one project
router.get("/:id", async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    res.json(project);
  } catch (err) {
    next(err);
  }
});

// CREATE project
router.post("/", isAuthenticated, async (req, res, next) => {
  try {
    const createdProject = await Project.create(req.body);
    res.status(201).json(createdProject);
  } catch (err) {
    next(err);
  }
});

// UPDATE project
router.put("/:id", isAuthenticated, async (req, res, next) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedProject);
  } catch (err) {
    next(err);
  }
});

// DELETE project
router.delete("/:id", isAuthenticated, async (req, res, next) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

module.exports = router;

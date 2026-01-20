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

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json(project);
  } catch (err) {
    next(err);
  }
});

// CREATE project
router.post("/", isAuthenticated, async (req, res, next) => {
  try {
    const { title, profile } = req.body;

    // 🔴 VALIDACIONES EXPRESS
    if (!title || title.length < 3) {
      return res
        .status(400)
        .json({ message: "Title must be at least 3 characters" });
    }

    if (!profile) {
      return res.status(400).json({ message: "Profile is required" });
    }

    const createdProject = await Project.create(req.body);
    res.status(201).json(createdProject);
  } catch (err) {
    next(err);
  }
});

// UPDATE project
router.put("/:id", isAuthenticated, async (req, res, next) => {
  try {
    const { title } = req.body;

    if (title && title.length < 3) {
      return res
        .status(400)
        .json({ message: "Title must be at least 3 characters" });
    }

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json(updatedProject);
  } catch (err) {
    next(err);
  }
});

// DELETE project
router.delete("/:id", isAuthenticated, async (req, res, next) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);

    if (!deletedProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

module.exports = router;

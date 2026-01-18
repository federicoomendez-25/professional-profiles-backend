const Project = require("../models/Project.model");

module.exports = async (req, res, next) => {
  try {
    const projectId = req.params.projectId;
    const userId = req.payload._id;

    const project = await Project.findById(projectId).populate("profile");

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (project.profile.user.toString() !== userId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    next();
  } catch (error) {
    next(error);
  }
};

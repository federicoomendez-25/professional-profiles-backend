const express = require("express");
const router = express.Router();

const Profile = require("../models/Profile.model");
const isAuthenticated = require("../middleware/isAuthenticated");

/**
 * GET ALL PROFILES
 * GET /api/profiles
 */
router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user");
    res.json(profiles);
  } catch (error) {
    res.status(500).json({ message: "Error fetching profiles", error });
  }
});

/**
 * GET PROFILE BY ID
 * GET /api/profiles/:id
 */
router.get("/:id", async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id).populate("user");

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: "Error fetching profile", error });
  }
});

/**
 * CREATE PROFILE ✅
 * POST /api/profiles
 */
router.post("/", isAuthenticated, async (req, res) => {
  try {
    const { fullName, title, bio } = req.body;

    if (!fullName || !title || !bio) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newProfile = await Profile.create({
      fullName,
      title,
      bio,
      user: req.payload._id,
    });

    res.status(201).json(newProfile);
  } catch (error) {
    res.status(400).json({ message: "Error creating profile", error });
  }
});

/**
 * UPDATE PROFILE
 * PUT /api/profiles/:id
 */
router.put("/:id", isAuthenticated, async (req, res) => {
  try {
    const updatedProfile = await Profile.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedProfile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.json(updatedProfile);
  } catch (error) {
    res.status(400).json({ message: "Error updating profile", error });
  }
});

/**
 * DELETE PROFILE
 * DELETE /api/profiles/:id
 */
router.delete("/:id", isAuthenticated, async (req, res) => {
  try {
    const deletedProfile = await Profile.findByIdAndDelete(req.params.id);

    if (!deletedProfile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.json({ message: "Profile deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error deleting profile", error });
  }
});

module.exports = router;

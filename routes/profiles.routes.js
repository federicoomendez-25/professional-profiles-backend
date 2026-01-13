const router = require("express").Router();
const Profile = require("../models/Profile.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");

router.post("/", isAuthenticated, async (req, res, next) => {
  try {
    const profile = await Profile.create({
      ...req.body,
      user: req.payload._id,
    });
    res.status(201).json(profile);
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const profiles = await Profile.find().populate("user", "email name");

    res.json(profiles);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", isAuthenticated, async (req, res, next) => {
  try {
    const updated = await Profile.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", isAuthenticated, async (req, res, next) => {
  try {
    await Profile.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

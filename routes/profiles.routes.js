const router = require("express").Router();
const Profile = require("../models/Profile.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");

// 🔹 GET /api/profiles → todos los perfiles
router.get("/", async (req, res, next) => {
  try {
    const profiles = await Profile.find().populate("user");
    res.status(200).json(profiles);
  } catch (error) {
    next(error);
  }
});

// 🔐 POST /api/profiles → crear perfil
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

// 🔹 GET /api/profiles/:id → detalle
router.get("/:id", async (req, res, next) => {
  try {
    const profile = await Profile.findById(req.params.id).populate("user");
    res.json(profile);
  } catch (error) {
    next(error);
  }
});

// 🔐 PUT /api/profiles/:id → editar (solo dueño)
router.put("/:id", isAuthenticated, async (req, res, next) => {
  try {
    const profile = await Profile.findById(req.params.id);

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    if (profile.user.toString() !== req.payload._id) {
      return res.status(403).json({ message: "Not authorized" });
    }

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

// 🔐 DELETE /api/profiles/:id → borrar (solo dueño)
router.delete("/:id", isAuthenticated, async (req, res, next) => {
  try {
    const profile = await Profile.findById(req.params.id);

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    if (profile.user.toString() !== req.payload._id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await Profile.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

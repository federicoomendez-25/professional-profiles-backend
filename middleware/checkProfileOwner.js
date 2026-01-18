const Profile = require("../models/Profile.model");

const checkProfileOwner = async (req, res, next) => {
  try {
    const profileId = req.params.id || req.body.profile;
    const userId = req.payload._id;

    const profile = await Profile.findById(profileId);

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    if (profile.user.toString() !== userId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    // guardamos el profile para usarlo luego si hace falta
    req.profile = profile;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = checkProfileOwner;

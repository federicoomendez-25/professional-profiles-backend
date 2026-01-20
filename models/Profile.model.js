const { Schema, model } = require("mongoose");

const profileSchema = new Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      minlength: [3, "Full name must be at least 3 characters"],
      trim: true,
    },
    title: {
      type: String,
    },
    bio: {
      type: String,
      maxlength: [500, "Bio too long"],
    },
    skills: {
      type: [String],
      default: [],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("Profile", profileSchema);

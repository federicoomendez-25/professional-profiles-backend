const { Schema, model } = require("mongoose");

const projectSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Project title is required"],
      minlength: [3, "Title must be at least 3 characters"],
      trim: true,
    },
    description: {
      type: String,
      maxlength: [500, "Description too long"],
    },
    link: {
      type: String,
    },
    skills: {
      type: [String],
      default: [],
    },
    profile: {
      type: Schema.Types.ObjectId,
      ref: "Profile",
      required: [true, "Profile is required"],
    },
  },
  { timestamps: true }
);

module.exports = model("Project", projectSchema);

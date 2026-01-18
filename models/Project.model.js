const { Schema, model } = require("mongoose");

const projectSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    link: {
      type: String,
      trim: true,
    },

    skills: {
      type: [String],
      default: [],
    },

    profile: {
      type: Schema.Types.ObjectId,
      ref: "Profile",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Project", projectSchema);

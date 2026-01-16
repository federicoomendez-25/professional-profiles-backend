const { Schema, model } = require("mongoose");

const projectSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    link: {
      type: String,
    },
    skills: {
      type: [String],
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

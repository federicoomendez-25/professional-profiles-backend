const { Schema, model } = require("mongoose");

const profileSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
    },
    skills: {
      type: [String],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Profile", profileSchema);

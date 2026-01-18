const { Schema, model } = require("mongoose");

const profileSchema = new Schema(
  {
    fullName: { type: String, required: true },
    title: String,
    bio: String,
    skills: [String],
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("Profile", profileSchema);

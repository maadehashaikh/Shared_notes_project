const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isShared: { type: Boolean, default: false },
    shareLink: { type: String, default: null },
    private: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Note", noteSchema);

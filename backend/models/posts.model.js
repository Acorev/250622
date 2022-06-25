const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
    },
    likes: {
      type: Array,
      default: [],
    },

    message: {
      type: String
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
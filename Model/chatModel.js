const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  movieID: String,
  chat: {
    type: [
      {
        userID: String,
        message: {
          comment: String,
          likes: [String],
        },
      },
    ],
  },
});

module.exports = mongoose.model("Chat", chatSchema);

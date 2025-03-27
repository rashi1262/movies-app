const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    movieId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
      required: true,
    },
    reviews: [
      {
        userId: {
          type: String,
          ref: "User",
          required: true,
        },
        name: {
          type: String,
        },
        review: {
          type: String,
          required: true,
        },
        rating: {
          type: String,
          min: 0,
          max: 10,
        },
      },
    ],

    averageRating: {
      type: String,
      default: 0,
    },
  },
  { timestamps: true }
);

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;

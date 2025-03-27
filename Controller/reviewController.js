const Review = require("../Model/reviewModel");
const AppError = require("../Utils/AppError");
const User = require("../Model/userModel");

exports.createReview = async function (req, res, next) {
  try {
    const { userId, movieId, rating, comments } = req.body;

    if (!userId || !movieId || !rating) {
      return next(
        new AppError("userId, movieId, and rating are required.", 400)
      );
    }

    const review = await Review.create({ userId, movieId, rating, comments });
    await User.findByIdAndUpdate(
      review.userId,
      {
        $push: { reviews: review._id },
      },
      { upsert: true, new: true }
    );

    res.status(201).json({
      status: "success",
      message: review,
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      return next(new AppError(err.message, 400));
    }
    return next(new AppError("Failed to create review.", 500));
  }
};

exports.getAllReviews = async function (req, res, next) {
  try {
    const reviews = await Review.find().select("-__v");

    res.status(200).json({
      status: "success",
      totalReviews: reviews.length,
      message: reviews,
    });
  } catch (err) {
    return next(new AppError("Failed to fetch reviews.", 500));
  }
};

exports.getReview = async function (req, res, next) {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return next(new AppError("Review not found.", 404));
    }

    res.status(200).json({
      status: "success",
      message: review,
    });
  } catch (err) {
    if (err.name === "CastError") {
      return next(new AppError("Invalid review ID format.", 400));
    }
    return next(new AppError("Failed to fetch review.", 500));
  }
};

exports.updateReview = async function (req, res, next) {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return next(new AppError("Review not found.", 404));
    }

    if (req.body.rating) {
      review.rating = req.body.rating;
    }
    if (req.body.comments) review.comments = req.body.comments;

    await review.save({ validateBeforeSave: false });

    res.status(200).json({
      status: "success",
      message: review,
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      return next(new AppError(err.message, 400));
    }
    return next(new AppError("Failed to update review.", 500));
  }
};

exports.deleteReview = async function (req, res, next) {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return next(new AppError("Review not found.", 404));
    }

    await Review.findByIdAndDelete(req.params.id);

    res.status(200).json({
      status: "success",
      message: "Review deleted successfully",
    });
  } catch (err) {
    if (err.name === "CastError") {
      return next(new AppError("Invalid review ID format.", 400));
    }
    return next(new AppError("Failed to delete review.", 500));
  }
};

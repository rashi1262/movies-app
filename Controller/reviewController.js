const Review = require("../Model/reviewModel");
const AppError = require("../Utils/AppError");
const User = require("../Model/userModel");

exports.createReview = async function (req, res, next) {
  try {
    const movieId = req.params.movieid;
    let reviews;
    const result = await Review.findOne({ movieId });
    const { userId, name, rating, review } = req.body;
    if (!userId || !review || !rating || !name) {
      return next(
        new AppError("userId, review, name and rating are required.", 400)
      );
    }
    if (!result) {
      const data = {
        movieId,
        reviews: {
          userId,
          name,
          rating,
          review,
        },
        averageRating: rating,
      };
      reviews = await Review.create(data);
    } else {
      const totalRating =
        result.reviews.reduce((acc, el) => acc + Number(el.rating), 0) + rating;
      const total = result.reviews.length + 1;
      const avg = (totalRating / total).toFixed(2);
      const data = { userId, name, rating, review };
      reviews = await Review.findByIdAndUpdate(result._id, {
        $push: { reviews: data },
        averageRating: avg,
      });
    }

    res.status(201).json({
      status: "success",
      message: "Review added.",
    });
  } catch (err) {
    console.log(err);
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

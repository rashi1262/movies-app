const Movie = require("../Model/movieModel");
const AppError = require("../Utils/AppError");
const APIFeatures = require("../Utils/apiFeatures");

exports.createMovie = async function (req, res, next) {
  try {
    const movie = await Movie.create(req.body);
    res.status(201).json({
      status: "success",
      message: movie,
    });
  } catch (err) {
    return next(new AppError(err.message, 400));
  }
};

exports.getAllMovies = async function (req, res, next) {
  try {
    const features = new APIFeatures(Movie.find(), req.query)
      .filter()
      .sort()
      .paginate();
    const movies = await features.query;
    res.status(200).json({
      status: "success",
      totalMovies: movies.length,
      message: movies,
    });
  } catch (err) {
    console.log(err);
    return next(new AppError(err.message, 403));
  }
};

exports.getMovie = async function (req, res, next) {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return next(new AppError("Invalid Id or Movie doesn't exist.", 404));
    }
    res.status(200).json({
      status: "success",
      message: movie,
    });
  } catch (err) {
    return next(new AppError(err.message, 403));
  }
};

exports.updateMovie = async function (req, res, next) {
  try {
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!movie) {
      return next(new AppError("Invalid Id or Movie doesn't exist.", 404));
    }
    res.status(200).json({
      status: "success",
      message: movie,
    });
  } catch (err) {
    return next(new AppError(err.message, 400));
  }
};

exports.deleteMovie = async function (req, res, next) {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) {
      return next(new AppError("Invalid Id or Movie doesn't exist.", 404));
    }
    res.status(200).json({
      status: "success",
      message: "Movie deleted successfully",
    });
  } catch (err) {
    return next(new AppError(err.message, 403));
  }
};

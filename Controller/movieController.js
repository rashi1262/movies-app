const Movie = require("../Model/movieModel");
const AppError = require("../utils/AppError");

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
    let queryObj = { ...req.query };

    // const excludedFeilds = ["page", "sort", "limit", "feilds"];

    // excludedFeilds.forEach((el) => delete query[el]);

    if ("vote_average" in queryObj) {
      queryObj.vote_average = { gte: queryObj.vote_average };
    }

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/, (match) => `$${match}`);
    console.log(JSON.parse(queryStr));
    const query = Movie.find(JSON.parse(queryStr));
    const movies = await query;
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

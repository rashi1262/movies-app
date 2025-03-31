const Movie = require("../Model/movieModel");
const AppError = require("../Utils/AppError");

exports.addVote = async (req, res, next) => {
  try {
    const movie_id = req.params.id;
    const userID = req.body.userID;
    const movie = await Movie.findById(movie_id);
    if (!movie) {
      return next(new AppError("Movie doesn't exist", 404));
    }
    if (movie.votes.length == 0 || !movie.votes.includes(userID)) {
      movie.votes.push(userID);
      movie.vote_count = movie.votes.length;
    } else if (movie.votes.includes(userID)) {
      movie.votes = movie.votes.filter((el) => el !== userID);
      movie.vote_count = movie.votes.length;
    }
    await movie.save();
    res.status(200).json({
      status: "success",
      totalVotes: movie.votes.length,
    });
  } catch (err) {
    if (err.name === "CastError") {
      return next(new AppError("Invalid review ID format.", 400));
    }
    return next(new AppError("Failed to fetch review.", 500));
  }
};

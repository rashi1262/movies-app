const Movie = require("../Model/movieModel");
const AppError = require("../Utils/AppError");
const APIFeatures = require("../Utils/apiFeatures");
const axios = require("axios");
const fs = require("fs");

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
      .search()
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

exports.up = async function (req, res, next) {
  // const movieData = require("../data");
  try {
    let ans = [];
    let count = 0;
    const BASEURL = "https://image.tmdb.org/t/p/w1280";
    async function getMovie(id) {
      try {
        const data = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=148d7fb358e9a2f5b04a7567677ec479`
        );
        return data;
      } catch (err) {
        console.log(`Error fetching movie with ID ${id}: ${err.message}`);
        return null;
      }
    }

    for (const obj of movieData) {
      const newData = await getMovie(obj.movie_id);
      if (newData === null) {
        continue;
      }
      for (let [key, value] of Object.entries(newData.data)) {
        if (!(key in obj)) {
          obj[key] = value;
        }
        if (key.includes("path")) {
          obj[key] = `${BASEURL}${obj[key]}`;
        }
        if (key.includes("production_companies")) {
          for (let x of obj.production_companies) {
            x["logo_path"] = `${BASEURL}${x["logo_path"]}`;
          }
        }
        if (key.includes("belongs_to_collection") && value != null) {
          obj[key]["poster_path"] = `${BASEURL}${obj[key]["poster_path"]}`;
          obj[key]["backdrop_path"] = `${BASEURL}${obj[key]["backdrop_path"]}`;
        }
      }
      ans = [...ans, obj];
      console.log("count:", count++);
    }

    fs.writeFileSync("Updateddata", JSON.stringify(ans, null, 2));
    console.log("file written");

    res.status(200).json({
      status: "success",
      message: "Movie successfully modified",
      movieData: ans,
    });
  } catch (err) {
    return next(new AppError(err.message, 403));
  }
};

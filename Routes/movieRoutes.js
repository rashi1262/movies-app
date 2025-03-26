const express = require("express");
const router = express.Router();
const movieContoller = require("../Controller/movieController");

router.route("/movies").get(movieContoller.getAllMovies);
router.route("/movie").post(movieContoller.createMovie);
router.route("/movie/:id").get(movieContoller.getMovie);
router.route("/movie/:id").patch(movieContoller.updateMovie);
router.route("/movie/:id").delete(movieContoller.deleteMovie);
router.route("/popularmovies").get(movieContoller.popularMovies);
router.route("/trendingmovies").get(movieContoller.trendingMovies);
router.route("/upcomingmovies").get(movieContoller.upcomingMovies);
router.route("/data").get(movieContoller.up);

module.exports = router;

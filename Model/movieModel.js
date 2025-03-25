const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    movie_id: { type: Number, required: true },
    adult: { type: Boolean },
    backdrop_path: { type: String },
    genre_ids: [{ type: Number }],
    original_language: { type: String },
    original_title: { type: String },
    overview: { type: String },
    popularity: { type: Number },
    poster_path: { type: String },
    release_date: { type: Date },
    title: { type: String, required: true },
    video: { type: Boolean },
    vote_average: { type: Number },
    vote_count: { type: Number },
    belongs_to_collection: {
      id: { type: Number },
      name: { type: String },
      poster_path: { type: String },
      backdrop_path: { type: String },
    },
    budget: { type: Number },
    genres: [
      {
        id: { type: Number },
        name: { type: String },
      },
    ],
    homepage: { type: String },
    id: { type: Number },
    imdb_id: { type: String },
    origin_country: [{ type: String }],
    production_companies: [
      {
        id: { type: Number },
        logo_path: { type: String },
        name: { type: String },
        origin_country: { type: String },
      },
    ],
    production_countries: [
      {
        iso_3166_1: { type: String },
        name: { type: String },
      },
    ],
    revenue: { type: Number },
    runtime: { type: Number },
    spoken_languages: [
      {
        english_name: { type: String },
        iso_639_1: { type: String },
        name: { type: String },
      },
    ],
    status: { type: String },
    tagline: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Movie", movieSchema);

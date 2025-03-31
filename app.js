const express = require("express");
const app = express();
const cors = require("cors");
const errorHandler = require("./Controller/errorController");
const AppError = require("./Utils/AppError");
const cookieParser = require("cookie-parser");

const userRoutes = require("./Routes/userRoutes");
const movieRoutes = require("./Routes/movieRoutes");
const wishlistRoutes = require("./Routes/wishListRoutes");
const reviewRoutes = require("./Routes/reviewRoutes");
const voteRoutes = require("./Routes/voteRoutes");

app.use(
  cors({
    origin: ["http://localhost:5173", "https://vmoviescom.netlify.app"],
    methods: "GET,POST,PUT,DELETE,OPTIONS,PATCH",
    allowedHeaders: "Content-Type,Authorization",
    credentials: true,
  })
);

app.options("*", cors());
app.use(cookieParser());
app.use(express.json());

app.use("/api/v1", userRoutes);
app.use("/api/v1", movieRoutes);
app.use("/api/v1", wishlistRoutes);
app.use("/api/v1", reviewRoutes);
app.use("/api/v1", voteRoutes);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(errorHandler);
module.exports = app;

const express = require("express");
const app = express();
const cors = require("cors");
const errorHandler = require("./Controller/errorController");
const AppError = require("./Utils/AppError");
const cookieParser = require("cookie-parser");

const userRoutes = require("./Routes/userRoutes");
const movieRoutes = require("./Routes/movieRoutes");

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use("/api/v1", userRoutes);
app.use("/api/v1", movieRoutes);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(errorHandler);
module.exports = app;

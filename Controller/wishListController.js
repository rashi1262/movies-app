const User = require("../Model/userModel");
const AppError = require("../Utils/AppError");
const Movie = require("../Model/movieModel");
const mongoose = require("mongoose");
exports.addToWishlist = async (req, res, next) => {
  try {
    const { userID, movieID } = req.body;
    if (!userID || !movieID) {
      return next(new AppError("userID and movieID are required.", 404));
    }

    const user = await User.findById(userID);

    if (!user) {
      return next(new AppError("user doesn't exist", 404));
    }

    if (user.wishlist.length === 0 || !user.wishlist.includes(movieID)) {
      user.wishlist.push(movieID);
    } else if (user.wishlist.includes(movieID)) {
      user.wishlist = user.wishlist.filter((el) => el !== movieID);
    }
    await user.save();

    res.status(201).json({
      status: "sucesss",
      message: user.wishlist,
    });
  } catch (err) {
    console.log(err);
    return next(new AppError(err, 403));
  }
};

exports.getAllWishList = async (req, res, next) => {
  try {
    const user_id = req.params.id;

    const user = await User.findById(user_id);
    if (!user) {
      return next(new AppError("user doesn't exist", 404));
    }
    const { wishlist } = user;
    const list = await Movie.find({ _id: { $in: wishlist } });

    res.status(201).json({
      status: "sucesss",
      length: list.length,
      message: list,
    });
  } catch (err) {
    console.log(err);
    return next(new AppError(`${err.message}  Invalid Id`, 403));
  }
};

exports.deleteWishlist = async (req, res, next) => {
  try {
    const { userID, movieID } = req.body;
    if (!userID || !movieID) {
      return next(new AppError("userID and movieID are required.", 404));
    }

    const user = await User.findById(userID);
    if (!user.wishlist.includes(movieID)) {
      return next(new AppError("Movie is not in wishlist.", 404));
    }

    user.wishlist = user.wishlist.filter((el) => el !== movieID);
    await user.save();

    res.status(200).json({
      status: "sucessfully removed.",
    });
  } catch (err) {
    return next(new AppError(err, 403));
  }
};

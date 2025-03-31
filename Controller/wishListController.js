const User = require("../Model/userModel");
const AppError = require("../Utils/AppError");
const Movie = require("../Model/movieModel");
const mongoose = require("mongoose");
exports.addToWishlist = async (req, res, next) => {
  try {
    const { userID, movieID } = req.body;
    const result = await User.findByIdAndUpdate(
      userID,
      {
        $push: { wishlist: movieID },
      },
      { upsert: true, new: true }
    );

    res.status(201).json({
      status: "sucesss",
      message: result,
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
    console.log(list);

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

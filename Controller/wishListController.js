const User = require("../Model/userModel");
const AppError = require("../Utils/AppError");

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

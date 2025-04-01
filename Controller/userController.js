const User = require("../Model/userModel");
const AppError = require("../Utils/AppError");

exports.createUser = async function (req, res, next) {
  try {
    if (req.body.phone) {
      const user = await User.findOne({ phone: req.body.phone });
      if (user) {
        console.log("user exist by phone");
        return res.status(201).json({
          status: "success",
          message: user,
        });
      }
    } else if (req.body.email) {
      const user = await User.findOne({ email: req.body.email });
      if (user) {
        console.log("user exist by email");
        return res.status(201).json({
          status: "success",
          message: user,
        });
      }
    }
    const user = await User.create(req.body);
    res.status(201).json({
      status: "success",
      message: user,
    });
  } catch (err) {
    return next(new AppError(err.message, 400));
  }
};

exports.getAllUsers = async function (req, res, next) {
  try {
    const users = await User.find().select("-__v");
    res.status(201).json({
      status: "sucess",
      totalUsers: users.length,
      message: users,
    });
  } catch (err) {
    return next(new AppError(err, 403));
  }
};

exports.getUser = async function (req, res, next) {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (user === null) {
      return next(new AppError("Invalid Id or User doesn't exist.", 404));
    }
    res.status(201).json({
      status: "sucesss",
      message: user,
    });
  } catch (err) {
    return next(new AppError(err, 403));
  }
};

exports.updateUser = async function (req, res, next) {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (user === null) {
      return next(new AppError("Invalid Id or User doesn't exist.", 404));
    }

    user.phone = req.body.phone || user.phone;
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.status = req.body.status || user.status;

    await user.save({ validateBeforeSave: false });

    res.status(201).json({
      status: "sucesss",
      message: user,
    });
  } catch (err) {
    return next(new AppError(err, 403));
  }
};

exports.deleteUser = async function (req, res, next) {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (user === null) {
      return next(new AppError("Invalid Id or User doesn't exist.", 404));
    }

    const message = await User.findByIdAndDelete(req.params.id);

    res.status(201).json({
      status: "sucesss",
    });
  } catch (err) {
    return next(new AppError(err, 403));
  }
};

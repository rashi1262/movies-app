const Chat = require("../Model/chatModel");
const AppError = require("../Utils/AppError");

// Create Chat
exports.createChat = async function (req, res, next) {
  try {
    if (!req.body.movieID) {
      return next(new AppError("movieID is required!", 400));
    }

    const data = {
      movieID: req.body.movieID,
      chat: [
        {
          userID: req.body.userID,
          message: {
            comment: req.body.message,
          },
        },
      ],
    };

    const chat = await Chat.create(data);
    res.status(201).json({
      status: "success",
      message: chat,
    });
  } catch (err) {
    return next(new AppError(err.message, 500));
  }
};

// Get All Chats
exports.getAllChats = async function (req, res, next) {
  try {
    const chats = await Chat.find();
    if (chats.length === 0) {
      return next(new AppError("No chats found!", 404));
    }

    res.status(200).json({
      status: "success",
      totalChats: chats.length,
      message: chats,
    });
  } catch (err) {
    return next(new AppError(err.message, 500));
  }
};

exports.getChat = async function (req, res, next) {
  try {
    if (!req.params.id) {
      return next(new AppError("Chat ID is required!", 400));
    }

    const chat = await Chat.findById(req.params.id);
    if (!chat) {
      return next(new AppError("Invalid ID or Chat not found!", 404));
    }

    res.status(200).json({
      status: "success",
      message: chat,
    });
  } catch (err) {
    return next(new AppError("Invalid ID format!", 400));
  }
};

exports.updateChat = async function (req, res, next) {
  try {
    if (!req.params.id) {
      return next(new AppError("Chat ID is required!", 400));
    }

    if (!req.body.userID || !req.body.message) {
      return next(
        new AppError("userID and message are required to add a chat!", 400)
      );
    }

    const chat = await Chat.findById(req.params.id);
    if (!chat) {
      return next(new AppError("Invalid ID or Chat not found!", 404));
    }

    // Add new chat message to the array
    chat.chat.push({
      userID: req.body.userID,
      message: req.body.message,
      likes: req.body.likes || "0",
    });

    await chat.save({ validateBeforeSave: false });

    res.status(200).json({
      status: "success",
      message: chat,
    });
  } catch (err) {
    return next(new AppError("Invalid ID format!", 400));
  }
};

exports.deleteChat = async function (req, res, next) {
  try {
    if (!req.params.id) {
      return next(new AppError("Chat ID is required!", 400));
    }

    const chat = await Chat.findById(req.params.id);
    if (!chat) {
      return next(new AppError("Invalid ID or Chat not found!", 404));
    }

    await Chat.findByIdAndDelete(req.params.id);

    res.status(200).json({
      status: "success",
      message: "Chat deleted successfully",
    });
  } catch (err) {
    return next(new AppError("Invalid ID format!", 400));
  }
};

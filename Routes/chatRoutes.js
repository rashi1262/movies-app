const express = require("express");
const router = express.Router();
const chatController = require("../Controller/chatController");

router.route("/chats").get(chatController.getAllChats);
router.route("/chat").post(chatController.createChat);
router.route("/chat/:id").get(chatController.getChat);
router.route("/chat/:id").patch(chatController.updateChat);
router.route("/chat/:id").delete(chatController.deleteChat);

module.exports = router;

const express = require("express");
const router = express.Router();
const voteController = require("../Controller/voteController");

router.route("/vote/:id").post(voteController.addVote);

module.exports = router;

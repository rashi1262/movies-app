const express = require("express");
const router = express.Router();
const reviewController = require("../Controller/reviewController");

router.route("/reviews").get(reviewController.getAllReviews);
router.route("/review/:movieid").post(reviewController.createReview);
router.route("/review/:id").get(reviewController.getReview);
// router.route("/review/:id").patch(reviewController.updateReview);
router.route("/review/:id").delete(reviewController.deleteReview);

module.exports = router;

const express = require("express");
const router = express.Router();
const wishListController = require("../Controller/wishListController");

router.route("/addtowishlist").patch(wishListController.addToWishlist);
router.route("/getwishlist/:id").get(wishListController.getAllWishList);
router.route("/deletewishlist").post(wishListController.deleteWishlist);

module.exports = router;

const express = require("express");
const router = express.Router();
const userContoller = require("../Controller/userController");

router.route("/users").get(userContoller.getAllUsers);
router.route("/user").post(userContoller.createUser);
router.route("/user/:id").get(userContoller.getUser);
router.route("/user/:id").patch(userContoller.updateUser);
router.route("/user/:id").delete(userContoller.deleteUser);

module.exports = router;

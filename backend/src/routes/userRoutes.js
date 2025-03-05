const express = require("express");
const wrapAsync = require("../utility/wrapasync");
const userController = require("../controllers/userController");
const { validateUser, validateAuth } = require("../middlewares/validators");
const { isLoggedOutUser, isLoggedInUser } = require("../middlewares/authMiddlewares");
const router = express.Router();

//Register a user
router.post("/register", isLoggedOutUser, validateUser, wrapAsync(userController.userRegister));
// router.post("/verify", wrapAsync(userController.userVerify));

router.post("/login", isLoggedOutUser, validateAuth, wrapAsync(userController.login));
router.get("/logout", isLoggedInUser, wrapAsync(userController.logout));

router.get("/profile", isLoggedInUser, wrapAsync(userController.userProfile));

module.exports = router;

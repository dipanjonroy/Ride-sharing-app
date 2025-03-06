const express = require("express");
const wrapAsync = require("../utility/wrapasync");
const router = express.Router();
const captainController = require("../controllers/captainController");
const { validateCaptain, validateAuth } = require("../middlewares/validators");
const { isLoggedOutCaptain, isLoggedInCaptain } = require("../middlewares/authMiddlewares");

router.post(
  "/register",
  isLoggedOutCaptain,
  validateCaptain,
  wrapAsync(captainController.register)
);
router.post("/login",isLoggedOutCaptain, validateAuth, wrapAsync(captainController.login));
router.get("/logout", isLoggedInCaptain, wrapAsync(captainController.logout));

router.get("/profile",isLoggedInCaptain, wrapAsync(captainController.profile));

module.exports = router;

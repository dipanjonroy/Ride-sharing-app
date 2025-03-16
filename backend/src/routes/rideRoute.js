const express = require("express");
const wrapAsync = require("../utility/wrapasync");
const {
  createRide,
  getFare,
  acceptRide,
  confirmRide,
} = require("../controllers/rideController");
const {
  isLoggedInUser,
  isLoggedInCaptain,
} = require("../middlewares/authMiddlewares");
const router = express.Router();

router.post("/createRide", isLoggedInUser, wrapAsync(createRide));
router.get("/getfare", isLoggedInUser, wrapAsync(getFare));
router.put("/accept-ride", isLoggedInCaptain, wrapAsync(acceptRide));
router.get("/confirm-ride", isLoggedInCaptain, wrapAsync(confirmRide));

module.exports = router;

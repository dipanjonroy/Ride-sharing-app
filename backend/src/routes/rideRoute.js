const express = require("express");
const wrapAsync = require("../utility/wrapasync");
const { createRide, getFare } = require("../controllers/rideController");
const { isLoggedInUser } = require("../middlewares/authMiddlewares");
const router = express.Router();

router.post("/createRide", isLoggedInUser, wrapAsync(createRide));
router.get("/getfare", isLoggedInUser, wrapAsync(getFare));

module.exports = router;

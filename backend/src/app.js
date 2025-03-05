const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectToDb = require("./db/dbConfig");

const userRoutes = require("./routes/userRoutes");
const captainRoutes = require("./routes/captainRoutes");

const ExpressError = require("./utility/expresserror");

connectToDb();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users", userRoutes)
app.use("/api/captains", captainRoutes)

//ERROR Handleing
app.use("*", (req, res, next) => {
  next(new ExpressError(404, "Page not found."));
});

app.use((err, req, res, next) => {
  console.log(err);
  let { status = 500, message = "Server side issues" } = err;
  res.status(status).json({"message": message});
});

app.get("/", (req, res) => {
  res.send("Server is running.");
});

module.exports = app;

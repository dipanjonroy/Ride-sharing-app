require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectToDb = require("./db/dbConfig");

const userRoutes = require("./routes/userRoutes");
const captainRoutes = require("./routes/captainRoutes");

const ExpressError = require("./utility/expresserror");

connectToDb();

const port = process.env.PORT || 4001;

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api/captains", captainRoutes);

//ERROR Handleing
app.use("*", (req, res, next) => {
  next(new ExpressError(404, "Page not found."));
});

app.use((err, req, res, next) => {
  console.log(err);
  let { status = 500, message = "Server side issues" } = err;
  res.status(status).json({ success: false, message: message });
});

app.listen(port, () => {
  console.log("Server is running.");
});

module.exports = app;

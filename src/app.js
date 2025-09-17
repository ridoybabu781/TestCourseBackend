const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/user.routes");
const errorHandler = require("./middleware/errorHandler");
const courseRouter = require("./routes/course.routes");
const adminRouter = require("./routes/admin.routes");
require("dotenv").config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.CORS,
  })
);
app.use(cookieParser());

//routing

app.use("/api/auth", userRouter);
app.use("/api/admin", adminRouter);
app.use("/api/course", courseRouter);

// global error
app.use(errorHandler);

module.exports = app;

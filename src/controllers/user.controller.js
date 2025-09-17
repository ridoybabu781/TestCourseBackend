const User = require("../models/user.model");
const httpErrors = require("http-errors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createUser = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return next(httpErrors(404, "Something Is Missing"));
    }

    let instructor = "no";

    if (role === "instructor") {
      instructor = "pending";
    }

    if (role === "admin") {
      return next(httpErrors(401, "Admin Cannot be created by this api"));
    }

    const hashedPass = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPass,
      role,
      isInstructor: instructor,
    });

    await user.save();

    let message =
      user.role === "instructor"
        ? "Instructor Request Submitted Successfully"
        : "Account Created Successfully. Go to login page!";

    res.status(201).json({ message });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(httpErrors(404, "Something is missing"));
    }

    const user = await User.findOne({ email });

    if (!user) {
      return next(httpErrors(404, "User Not Found"));
    }

    const checkPass = await bcrypt.compare(user.password, password);
    if (!checkPass) {
      return next(httpErrors(401, "You're not an user"));
    }

    if (user.role === "instructor" && user.isInstructor === "pending") {
      return next(
        httpErrors(401, "You're not an instructor yet. Wait for verify")
      );
    }

    if (user.role === "instructor" && user.isInstructor === "no") {
      return next(httpErrors(401, "You've been banned as an instructor"));
    }

    const userData = user.toObject();
    delete userData.password;
    const token = jwt.sign({ id: user._id, email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
      })
      .json({ user: userData, message: "Login successful" });
  } catch (error) {
    next(error);
  }
};

const profile = async (req, res, next) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return next(httpErrors(404, "User not found"));
    }

    res.status(200).json({ message: "User Fetched Successsfully", user });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createUser,
  login,
  profile,
};

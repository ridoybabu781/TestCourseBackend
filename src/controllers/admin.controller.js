const createHttpError = require("http-errors");
const User = require("../models/user.model");

const createAdmin = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return next(createHttpError(404, "Something is missing"));
    }

    const user = new User({
      ...req.body,
    });

    await user.save();

    res.status(201).json({
      message: "Admin account created Successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { createAdmin };

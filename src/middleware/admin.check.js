const createHttpError = require("http-errors");
const User = require("../models/user.model");

const isAdmin = async (req, res, next) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId);

    if (!user.role === "admin") {
      return next(createHttpError(401, "You're not allowed to do this "));
    }
  } catch (error) {
    next(error);
  }
};

module.exports = isAdmin;

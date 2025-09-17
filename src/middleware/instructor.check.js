const createHttpError = require("http-errors");
const User = require("../models/user.model");

const isInstructor = async (req, res, next) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);

    if (!user.role === "instructor" && !user.isInstructor === "yes") {
      return next(createHttpError(401, "You're not allowed to do this "));
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = isInstructor;

const httpErrors = require("http-errors");
const Course = require("../models/course.model");
const User = require("../models/user.model");
const cloudinary = require("../utils/cloudinary");

const createCourse = async (req, res, next) => {
  try {
    const userId = req.userId;

    const data = req.body;

    const file = req.file;

    const streamBuffer = (stream) => {
      return new Promise((resolve, reject) => {
        const res = cloudinary.uploader.upload_stream(
          { folder: "/testCourses" },
          (err, data) => {
            if (data) resolve(data);
            else reject(err);
          }
        );
        res.end(stream);
      });
    };
    if (!photo) {
      return next(httpErrors(404, "Photo not found"));
    }
    const result = await streamBuffer(file.buffer);

    const course = new Course({
      ...data,
      instructorId: userId,
      thumbnail: result.secure_url,
    });

    if (!course) {
      return next(httpErrors(400, "Something went wrong in adding courses"));
    }

    await course.save();

    res.status(201).json({ message: "Course Added Successfully", course });
  } catch (error) {
    next(error);
  }
};

const getCourses = async (req, res, next) => {
  try {
    const courses = await Course.find();

    if (!courses) {
      return next(httpErrors(404, "No Course Data Found"));
    }
    res.status(200).json({
      message: "All Course Fetched",
      courses,
    });
  } catch (error) {
    next(error);
  }
};

const getCourse = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
const updateCourse = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
const deleteCourse = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createCourse,
  getCourse,
  getCourses,
  updateCourse,
  deleteCourse,
};

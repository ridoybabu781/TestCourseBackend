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
    if (!file) {
      return next(httpErrors(404, "Photo not found"));
    }
    const result = await streamBuffer(file.buffer);

    if (req.body.tags) {
      try {
        req.body.tags = JSON.parse(req.body.tags);
      } catch (err) {
        req.body.tags = [];
      }
    }

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

    if (courses.length === 0) {
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
    const courseId = req.params.id;
    const course = await Course.findById(courseId);

    if (!course) {
      return next(httpErrors(404, "No Course Data Found"));
    }
    res.status(200).json({
      message: "Course Fetched",
      course,
    });
  } catch (error) {
    next(error);
  }
};

const updateCourse = async (req, res, next) => {
  try {
    const courseId = req.params.id;
    const data = req.body;

    const course = await Course.findById(courseId);
    if (!course) {
      return next(httpErrors(404, "Course not found"));
    }

    if (typeof data.tags === "string") {
      try {
        data.tags = JSON.parse(data.tags);
      } catch (err) {
        data.tags = [];
      }
    }

    const updatedCourse = await Course.findByIdAndUpdate(courseId, data, {
      new: true,
    });

    res
      .status(200)
      .json({ message: "Course Updated Successfully", course: updatedCourse });
  } catch (error) {
    next(error);
  }
};

const deleteCourse = async (req, res, next) => {
  try {
    const courseId = req.params.id;
    const deletedCourse = await Course.findByIdAndDelete(courseId);

    if (!deletedCourse) {
      return next(httpErrors(400, "Course Didn't deleted"));
    }

    res.status(200).json({ message: "Course deleted Successfully" });
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

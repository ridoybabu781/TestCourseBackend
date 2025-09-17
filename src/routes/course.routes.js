const {
  createCourse,
  getCourses,
  getCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/course.controller");
const isInstructor = require("../middleware/instructor.check");
const User = require("../middleware/user.check");
const validator = require("../validator/middlewares/validate");
const {
  courseSchema,
  updateCourseSchema,
} = require("../validator/schemas/course.schema");
const upload = require("../utils/multer");

const router = require("express").Router();

router.post(
  "/addCourse",
  validator(courseSchema),
  upload.single("courseImage"),
  User,
  isInstructor,
  createCourse
);

router.post("/getCourses", getCourses);
router.post("/getCourse/:id", getCourse);
router.put(
  "/updateCourse/:id",
  User,
  isInstructor,
  validator(updateCourseSchema),
  updateCourse
);
router.put("/deleteCourse/:id", User, isInstructor, deleteCourse);

module.exports = router;

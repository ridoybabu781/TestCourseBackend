const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  instructorId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },

  category: {
    type: String,
    required: true,
    enum: [
      "Web Development",
      "Mobile Development",
      "Data Science",
      "AI",
      "Design",
      "Other",
    ],
  },

  price: {
    type: Number,
    required: true,
    min: 0,
  },
  discount: {
    type: Number,
    default: 0,
  },

  level: {
    type: String,
    enum: ["Beginner", "Intermediate", "Advanced"],
    default: "Beginner",
  },
  language: {
    type: String,
    default: "English",
  },
  thumbnail: {
    type: String,
    default: "",
  },
  tags: [{ type: String }],

  isPublished: {
    type: Boolean,
    default: false,
  },
  enrolledStudents: [
    {
      studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      enrolledAt: { type: Date, default: Date.now },
      progress: { type: Number, default: 0 },
    },
  ],
  reviews: [
    {
      studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      rating: { type: Number, min: 1, max: 5 },
      comment: { type: String },
      createdAt: { type: Date, default: Date.now },
    },
  ],
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;

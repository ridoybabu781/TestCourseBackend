const Joi = require("joi");

const categories = [
  "Web Development",
  "Mobile Development",
  "Data Science",
  "AI",
  "Design",
  "Other",
];
const levels = ["Beginner", "Intermediate", "Advanced"];

const courseSchema = Joi.object({
  title: Joi.string().trim().min(3).max(200).required(),
  description: Joi.string().min(10).required(),
  category: Joi.string()
    .valid(...categories)
    .required(),
  price: Joi.number().min(0).required(),
  discount: Joi.number().default(0),
  level: Joi.string()
    .valid(...levels)
    .default("Beginner"),
  language: Joi.string().default("English").trim().min(2),
  tags: Joi.array().items(Joi.string().trim().min(1)).default([]),
  isPublished: Joi.boolean().default(false),
});

module.exports = courseSchema;

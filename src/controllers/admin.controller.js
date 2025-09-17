const createHttpError = require("http-errors");
const User = require("../models/user.model");
const sendMail = require("../utils/sendMail");

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

const approveInstructor = async (req, res, next) => {
  try {
    const instructorId = req.params.id;

    const instructor = await User.findByIdAndUpdate(
      instructorId,
      {
        isInstructor: "yes",
      },
      { new: true }
    );

    if (!instructor) {
      return next(createHttpError(404, "Instructor not found"));
    }

    const approvalHtml = `
      <!doctype html>
      <html>
        <head>
          <meta charset="utf-8" />
          <title>Instructor Approval</title>
        </head>
        <body style="font-family: Arial, sans-serif; background:#f9fafb; margin:0; padding:20px;">
          <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px; margin:auto; background:#ffffff; border:1px solid #e5e7eb; border-radius:6px;">
            <tr>
              <td style="padding:20px; text-align:center; background:#111827; color:#ffffff; border-radius:6px 6px 0 0;">
                <h2 style="margin:0;">Instructor Account Approved</h2>
              </td>
            </tr>
            <tr>
              <td style="padding:20px; color:#111827;">
                <p style="font-size:16px; margin-bottom:12px;">Hello ${
                  instructor.name || "Instructor"
                },</p>
                <p style="margin:0 0 16px 0; line-height:1.5; color:#374151;">
                  Congratulations! Your instructor account has been approved. You can now log in and start creating courses for your students.
                </p>
                <p style="margin:0; color:#6b7280; font-size:14px;">
                  If you have any questions, just reply to this email.
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding:12px; text-align:center; background:#f3f4f6; font-size:12px; color:#6b7280; border-radius:0 0 6px 6px;">
                <p style="margin:0;">&copy; ${new Date().getFullYear()} Your Platform. All rights reserved.</p>
              </td>
            </tr>
          </table>
        </body>
      </html>
      `;

    await sendMail(
      instructor.email,
      "Instructor Account Approved",
      approvalHtml
    );

    res.status(200).json({ message: "Instructor Approval Accepted" });
  } catch (error) {
    next();
  }
};

const deleteProfile = async (req, res, next) => {
  try {
    const userId = req.params.id;

    const deleteUser = await User.findByIdAndDelete(userId);

    if (!deleteUser) {
      return next(createHttpError(400, "User Deletion Failed"));
    }
    res.status(200).json({ message: "User Deleted Successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = { createAdmin, approveInstructor, deleteProfile };

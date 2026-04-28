const mongoose = require("mongoose");

const enrollmentSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    studentName: { type: String, required: true },
    studentEmail: { type: String, required: true },
    courseName: { type: String, required: true },
    status: {
      type: String,
      enum: ["Pending", "Active", "Completed"],
      default: "Active",
    },
    paymentStatus: {
      type: String,
      enum: ["Paid", "Pending", "Free"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Enrollment", enrollmentSchema);

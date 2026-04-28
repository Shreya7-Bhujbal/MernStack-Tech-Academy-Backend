const express = require("express");
const router = express.Router();
const Enrollment = require("../models/Enrollment");
const Course = require("../models/Course");
const Student = require("../models/Student");

// POST enroll a student
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, courseId } = req.body;

    let student = await Student.findOne({ email });
    if (!student) {
      student = new Student({ name, email, phone });
      await student.save();
    }

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ error: "Course not found" });

    const exists = await Enrollment.findOne({ studentEmail: email, course: courseId });
    if (exists) return res.status(400).json({ error: "Already enrolled in this course" });

    const enrollment = new Enrollment({
      student: student._id,
      course: courseId,
      studentName: name,
      studentEmail: email,
      courseName: course.title,
      paymentStatus: course.price === 0 ? "Free" : "Paid",
    });
    await enrollment.save();

    await Course.findByIdAndUpdate(courseId, { $inc: { studentsEnrolled: 1 } });

    res.status(201).json({ message: "Enrollment successful! 🎉", enrollment });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET all enrollments
router.get("/", async (req, res) => {
  try {
    const enrollments = await Enrollment.find().populate("course").sort({ createdAt: -1 });
    res.json(enrollments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET enrollments by email
router.get("/student/:email", async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ studentEmail: req.params.email }).populate("course");
    res.json(enrollments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

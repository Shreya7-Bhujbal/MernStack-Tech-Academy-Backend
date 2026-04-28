const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Beginner",
    },
    duration: { type: String, required: true },
    price: { type: Number, required: true },
    instructor: { type: String, required: true },
    image: { type: String, default: "" },
    rating: { type: Number, default: 4.5 },
    studentsEnrolled: { type: Number, default: 0 },
    topics: [{ type: String }],
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);

const mongoose = require("mongoose");

const internshipSchema = new mongoose.Schema(
  {
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: "student" }],
    employe: { type: mongoose.Schema.Types.ObjectId, ref: "employe" },
    profile: String,
    internshiptype: {
      type: String,
      enum: ["In office", "remote"],
    },
    openings: Number,
    skills: String,
    from: String,
    to: String,
    duration: String,
    responsibility: String,
    stipend: {
      status: {
        type: String,
        enum: ["Fixed", "Negotiable", "Performanced Based", "Unpaid"],
      },
      amount: Number,
    },
    perks: String,
    assessment: String,
  },
  { timestamps: true }
);
const Internship = mongoose.model("internship", internshipSchema);
module.exports = Internship;


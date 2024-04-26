const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: "student" }],
    employe: { type: mongoose.Schema.Types.ObjectId, ref: "employe" },
    title: String,
    jobtype: {
      type: String,
      enum: ["In office", "remote"],
    },
    openings: Number,
    skills: String,
    description:String,
    preferences:String,
    salary:Number,
    perks: String,
    assessment: String,
  },
  { timestamps: true }
);
const Job = mongoose.model("job", jobSchema);
module.exports = Job;
 


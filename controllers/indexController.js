const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");
const Student = require("../models/studentModel");
const Job = require("../models/jobModel");
const Internship = require("../models/internshipModel")
const ErrorHandler = require("../utils/errorHandler");
const { sendtoken } = require('../utils/JwtSendToken');
const { SendMail } = require("../utils/Nodemailer");
const imagekit = require('../utils/ImageKit').initImageKit()
const path = require('path')


exports.homepage = catchAsyncErrors(async (req, res, next) => {
    res.json({ message: "Secure homePage!" })
});

exports.currentStudent = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    res.json({ student })
});

exports.studentsignup = catchAsyncErrors(async (req, res, next) => {
    const student = await new Student(req.body).save();
    sendtoken(student, 201, res);
});

exports.studentsignin = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findOne({ email: req.body.email }).select("+password").exec();

    if (!student) return next(new ErrorHandler("Student Not Found With This Email Address", 404));

    const isMatch = student.comparepassword(req.body.password);
    if (!isMatch) return next(new ErrorHandler("Wrong Credientials", 500))
    sendtoken(student, 200, res);
});

exports.studentsignout = catchAsyncErrors(async (req, res, next) => {

    res.clearCookie("token");
    res.json({ message: "successfully signOut!" })

});

exports.studentSendmail = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findOne({ email: req.body.email }).exec();
  
    if (!student)
      return next(
        new ErrorHandler(
          `User not registered with this email address: ${req.body.email}`,
          404
        )
      );
  
    const url = `${req.protocol}://${req.get("host")}/student/forget-link/${
      student._id
    }`;
  
    SendMail(req, res, next, url);
    student.resetPasswordToken = 1;
    student.save();
  });
  
  exports.studentForgetLink = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.params.id).exec();
  
    if (!student)
      return next(
        new ErrorHandler(
          `User not registered with this email address: ${req.body.email}`,
          404
        )
      );
  
    if (student.resetPasswordToken == 1) {
      student.resetPasswordToken = 0;
      student.password = req.body.password;
      await student.save();
    } else {
      return next(new ErrorHandler(`Invalid password reset link`, 500));
    }
  
    res.status(200).json({ message: "password reset successfully" });
  });
  
  exports.studentResetPassword = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.params.id).exec();
    student.password = req.body.password;
    await student.save();
    sendtoken(student, 201, res);
  });
  
exports.studentupdate = catchAsyncErrors(async (req, res, next) => {
    await Student.findByIdAndUpdate(req.params.id, req.body).exec();
  res
    .status(200)
    .json({ success: true, message: "student updated successfully" });
});

exports.studentavatar = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.params.id).exec();
    const file = req.files.avatar;
    const ModifiedFilename = `resumebiulder-${Date.now()}${path.extname(file.name)}`;

    if(student.avatar.fileId !== ""){
        await imagekit.deleteFile(student.avatar.fileId)
    }//agar field mein phele se koi id hai toh ye use hoga


    const {fileId,url} = await imagekit.upload({
        file: file.data,
        fileName:  ModifiedFilename,
      });
     student.avatar ={fileId,url};
     await student.save();
     res.status(200).json({ success:true ,message: "Profile avatar updated" })

});


exports.studentApplyInternship = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id);
  const internship = await Internship.findById(req.params.id);
  student.internships.push(internship._id);
  internship.students.push(student._id);
  await student.save();
  await internship.save();
  res.json({ student });
});

exports.studentApplyJob = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id);
  const job = await Job.findById(req.params.id);
  student.jobs.push(job._id);
  job.students.push(student._id);
  await student.save();
  await job.save();
  res.json({ student });
});

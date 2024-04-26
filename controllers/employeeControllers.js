const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");
const Employe = require("../models/employeModel");
const ErrorHandler = require("../utils/errorHandler");
const { sendtoken } = require('../utils/JwtSendToken');
const { SendMail } = require("../utils/Nodemailer");
const imagekit = require('../utils/ImageKit').initImageKit();
const Internship = require('../models/internshipModel');
const jobModel = require('../models/jobModel')
const path = require('path');


exports.homepage = catchAsyncErrors(async (req, res, next) => {
    res.json({ message: "Secure employe homePage!" })
});

exports.currentemploye = catchAsyncErrors(async (req, res, next) => {
    const employe = await Employe.findById(req.id).exec();
    res.json({ employe })
});

exports.employesignup = catchAsyncErrors(async (req, res, next) => {
    const employe = await new Employe(req.body).save();
    sendtoken(employe, 201, res);
});

exports.employesignin = catchAsyncErrors(async (req, res, next) => {
    const employe = await Employe.findOne({ email: req.body.email }).select("+password").exec();

    if (!employe) return next(new ErrorHandler("employe Not Found With This Email Address", 404));

    const isMatch = employe.comparepassword(req.body.password);
    if (!isMatch) return next(new ErrorHandler("Wrong Credientials", 500))
    sendtoken(employe, 200, res);
});

exports.employesignout = catchAsyncErrors(async (req, res, next) => {
    res.clearCookie("token");
    res.json({ message: "successfully signOut!" })

});


exports.employeSendmail = catchAsyncErrors(async (req, res, next) => {
    const employe = await Employe.findOne({ email: req.body.email }).exec();
  
    if (!employe)
      return next(
        new ErrorHandler(
          `User not registered with this email address: ${req.body.email}`,
          404
        )
      );
  
    const url = `${req.protocol}://${req.get("host")}/employe/forget-link/${
      employe._id
    }`;
  
    SendMail(req, res, next, url);
    employe.resetPasswordToken = 1;
    employe.save();
  });
  
  exports.employeForgetLink = catchAsyncErrors(async (req, res, next) => {
    const employe = await Employe.findById(req.params.id).exec();
  
    if (!employe)
      return next(
        new ErrorHandler(
          `User not registered with this email address: ${req.body.email}`,
          404
        )
      );
  
    if (employe.resetPasswordToken == 1) {
      employe.resetPasswordToken = 0;
      employe.password = req.body.password;
      await employe.save();
    } else {
      return next(new ErrorHandler(`Invalid password reset link`, 500));
    }
  
    res.status(200).json({ message: "password changed successfully" });
  });
  
  exports.employeResetPassword = catchAsyncErrors(async (req, res, next) => {
    const employe = await Employe.findById(req.params.id).exec();
    employe.password = req.body.password;
    await employe.save();
    sendtoken(employe, 201, res);
    res.status(200).json({ message: "password reset successfully" });
    
  });
exports.employeupdate = catchAsyncErrors(async (req, res, next) => {
    await Employe.findByIdAndUpdate(req.params.id, req.body).exec();
  res
    .status(200)
    .json({ success: true, message: "Employe updated successfully" });
});


exports.employeeOrganisationlogo = catchAsyncErrors(async (req, res, next) => {
    const employe = await Employe.findById(req.params.id);
    const file = req.files.organisationlogo;
    const modifiedFileName = `resumebuilder-${Date.now()}${path.extname(
      file.name
    )}`;
  
    const { fileId, url } = await imagekit.upload({
      file: file.data,
      fileName: modifiedFileName,
    });
  
    if (employe.organisationlogo.fileId !== "") {
      await imagekit.deleteFile(employe.organisationlogo.fileId);
    }
  
    employe.organisationlogo = { fileId, url };
    await employe.save();
  
    res.json({ employe });
  });
  
  // -----------------------------------------------------internships --------------------------------
  
  exports.createInternship = catchAsyncErrors(async (req, res, next) => {
    const employe = await Employe.findById(req.id);
    const newInternship = await new Internship({...req.body,employe:employe._id}).save();
    employe.internships.push(newInternship._id);
    await employe.save();
    res.status(201).json({ employe,newInternship });
  });
  
  exports.readInternship = catchAsyncErrors(async (req, res, next) => {
    const {internships} = await Employe.findById(req.id).populate('internships');
    res.status(200).json({ internships });
  });
  
  exports.readSingleInternship = catchAsyncErrors(async (req, res, next) => {
    const internship = await Internship.findById(req.params.id);
    res.status(200).json({ internship });
  });
  
  
  //  ----------------------------------------------------------------jobs ----------------------------------------------------------------
  
  exports.createJob = catchAsyncErrors(async (req, res, next) => {
    const employe = await Employe.findById(req.id);
    const newjob = await new jobModel({...req.body,employe:employe._id}).save();
    employe.jobs.push(newjob._id);
    await employe.save();
    res.status(201).json({ employe,newjob });
  });
  
  exports.readJob = catchAsyncErrors(async (req, res, next) => {
    const {jobs} = await Employe.findById(req.id).populate('jobs');
    res.status(200).json({ jobs });
  });
  
  exports.readSingleJob = catchAsyncErrors(async (req, res, next) => {
    const job = await jobModel.findById(req.params.id);
    res.status(200).json({ job });
  });
  
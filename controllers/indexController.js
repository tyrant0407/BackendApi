const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");
const Student = require("../models/studentModel");
const ErrorHandler = require("../utils/errorHandler");


exports.homepage = catchAsyncErrors(async (req,res,next)=>{
    res.json({message:"homePage"})
}); 

exports.studentsignup = catchAsyncErrors(async (req,res,next)=>{
   const student = await new Student(req.body).save();
   res.status(201).json(student);
});
exports.studentsignin = catchAsyncErrors(async (req,res,next)=>{
    const student = await Student.findOne({email:req.body.email}).select("+password").exec();

    if(!student) return next(new ErrorHandler("Student Not Found With This Email Address",404));

    const isMatch = student.comparepassword(req.body.password);
    if(!isMatch) return next(new ErrorHandler("Wrong Credientials",500))
    res.status(201).json(student);

});
exports.studentsignout = catchAsyncErrors(async (req,res,next)=>{

});
const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");
const Student = require("../models/studentModel");
const ErrorHandler = require("../utils/errorHandler");
const { sendtoken } = require('../utils/JwtSendToken');
const { SendMail } = require("../utils/Nodemailer");


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

    const url = `${req.protocol}://${req.get("host")}/student/forget-link/${student._id
        }`;

    SendMail(req, res, next, url);
    student.resetPasswordToken = "1";
    await student.save();
    res.json({ student, url })

});


exports.studentforgetlink = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.params.id).exec();

    if (!student) {
        return next(
            new ErrorHandler(
                `User not registered with this email address: ${req.body.email}`,
                404
            )
        );
    }
    if (student.resetPasswordToken == "1") {
        student.resetPasswordToken = "0";
        student.password = req.body.password;
    } else {
        return next(
            new ErrorHandler(
                "Invalid Reset Password Link! please use valid link ",
                500
            )
        );
    }
    await student.save();
    res.status(200).json({ message: "Password has been Successfully Changed" })


});

exports.studentresetpassword = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();

    student.resetPasswordToken = "0";
    student.password = req.body.password;
    await student.save();
    sendtoken(student,201,res.json({ message: "Password has been Successfully Reset" })
)

});


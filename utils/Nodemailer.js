const nodemailer = require("nodemailer");
const ErrorHandler = require("./errorHandler");

exports.SendMail = (req, res, next, url) => {
  // res.json({success:true,'process.env.NODEMAILER_EMAIL':process.env.NODEMAILER_EMAIL,"process.env.NODEMAILER_password":process.env.NODEMAILER_PASSWORD})
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp",
    post: 465,
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: `Aman Pvt Ltd. <process.env.EMAIL_ADDRESS>`,
    to: req.body.email,
    subject: "Forget password Link",
    html: `<h1>Click below to change the password</h1>
        <a href="${url}" >Forgot Password Link</a>     `,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return next(new ErrorHandler(error, 500));
    }

    return res.status(200).json({
      message: "Email has been sent to your email address",
      url,
      info,
    });
  });
};

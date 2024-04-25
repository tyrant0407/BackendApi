const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");


const studentModel = new mongoose.Schema({
   firstname: {
      type: String,
      required: [true, "First Name is required"], 
      trim: true,
      minLength:[4,"First Name should be atleast 4 character long"]
   },
   lastname: {
      type: String,
      required: [true, "Last Name is required"],
      trim: true,
   },
   
   contact: {
      type: String,
      required: [true, "First Name is required"],
      trim: true,
      maxLength: [12, 'Contact must not exceed 12 characters'],
      minLength: [10, 'Contact should atleast contain 10 characters'],
   },
   city: {
      type: String,
      required: [true, "City is required"],
      trim: true,
   },
   gender: {
      type: String,
      enum: ["Male", "Female", "Others"],
      required: [true, "Gender is required"]
   },
   email: {
      type: String,
      required: [true, "Email address id required"],
      trim: true,
      unique: true,
      match: [
         /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
         "Please fill a valid email address",
      ],
   },
   avatar:{
      type:Object,
      default:{
         fileId:'',
         url:"https://play-lh.googleusercontent.com/HnzbI7urJlB6V26dtKiawYoBrH4iR5DAAk4KqNZzIa0NRWQukskR6aX7IrV55AULKIgA"
      }
   }, 
   password: {
      type: String,
      select: false,
      required: [true, "Password required"],
      maxLength: [15, 'Password Should not be exceed more than 15 characters'],
      minLength: [6, 'Password Should have atleast 6 characters'],
      // match:[]
   },
   resetPasswordToken: {
      type:Number,
      default: 0,
    },
   resume:{
      education:[],
      jobs:[],
      internships:[],
      responsibilities:[],
      courses:[],
      projects:[],
      skills:[],
      accomplishments:[],
    },
}, { timestamps: true })

studentModel.pre("save", function () {
   if (!this.isModified("password")) { return };
   let salt = bcrypt.genSaltSync(10);
   this.password = bcrypt.hashSync(this.password, salt);

});

studentModel.methods.comparepassword = function (password) {
   return bcrypt.compareSync(password, this.password)

}

//token
studentModel.methods.getjwttoken = function () {
   return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
   });
};
const Student = mongoose.model("student", studentModel);

module.exports = Student;
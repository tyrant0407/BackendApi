const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const employeModel = new mongoose.Schema(
  {
    firstname:{
      type: String,
      required: [true, "First Name is required"],
      trim: true,
    },
    lastname:{
        type: String,
        required: [true, "Last Name is required"],
        trim: true,
    },
    contact:{
        type: String,
        required: [true, "First Name is required"],
        trim: true,
        maxLength:[12,'Contact must not exceed 12 characters'],
        mixLength:[10,'Contact should atleast contain 10 characters'],
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
    organisationlogo:{
        type:Object,
        default:{
            fileId:'',
            url:'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        }
    },
    organisationname:{
      type: String,
      required: [true, "Organisation Name is required"],
      trim: true,
    },
    internships:[
        {type:mongoose.Schema.Types.ObjectId,ref:'internship'}
    ],
    jobs:[
        {type:mongoose.Schema.Types.ObjectId,ref:'job'}
    ],
  }, {timestamps: true });

employeModel.pre("save", function () {
  if (!this.isModified("password")) { return };
  let salt = bcrypt.genSaltSync(10);
  this.password = bcrypt.hashSync(this.password, salt);

});

employeModel.methods.comparepassword = function (password) {
  return bcrypt.compareSync(password, this.password)

}

//token
employeModel.methods.getjwttoken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
     expiresIn: process.env.JWT_EXPIRE,
  });
};

const Employe = mongoose.model("employe", employeModel);
module.exports = Employe;
 
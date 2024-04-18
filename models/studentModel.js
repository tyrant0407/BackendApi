const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')


const studentModel = new mongoose.Schema({
 email:{
    type:String,
    unique:true,
    required:[true,"Email is Required"],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
 },
 password:{
    type:String,
    select:false,
    maxLength:[15,'Password Should not be exceed more than 15 characters'],
    minLength:[6,'Password Should have atleast 6 characters'],
    // match:[]
 },
},{timestamps:true})

studentModel.pre("save",function(){
   if(!this.isModified("password")){return};
   let salt = bcrypt.genSaltSync(10);
   this.password = bcrypt.hashSync(this.password, salt);

});

studentModel.methods.comparepassword = function(password){
    return bcrypt.compareSync(password,this.password)

}

const Student = mongoose.model("student",studentModel);

module.exports = Student;
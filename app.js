require("dotenv").config("path", "./.env");
const express = require('express')
const app = express();


//db connection
require('./models/dataBase.js').databaseConnection();


//logger
const logger = require('morgan');
app.use(logger("tiny"));


// bodyparser
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//session and cookie
const session = require('express-session');
const cookieparser = require('cookie-parser');
app.use(session({
  resave:true,
  saveUninitialized:true,
  secret:process.env.EXPRESS_SESSION_SECRET,
}))
app.use(cookieparser());
//express file-upload
const fileupload = require("express-fileupload");
app.use(fileupload());

//routes
app.use('/',require('./routes/indexRoutes.js'));
app.use('/resume',require('./routes/resumeRoutes.js'));
app.use('/employe',require('./routes/EmployeeRoutes.js'));

//error handling
const generateError = require("./middlewares/errors.js");
const ErrorHandler = require("./utils/errorHandler.js");
const cookieParser = require("cookie-parser");
app.all("*", (req, res, next) => {
  next(new ErrorHandler(`Requested URL Not Found: ${req.url}`, 404));
});
app.use(generateError);


app.listen(process.env.PORT,console.log(`server running on ${process.env.PORT}`));
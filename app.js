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
app.use(express.urlencoded({extended:false}))



//routes
app.use('/',require('./routes/indexRoutes.js'));

//error handling
const generateError = require("./middlewares/errors.js");
const ErrorHandler = require("./utils/errorHandler.js");
app.all("*", (req, res, next) => {
  next(new ErrorHandler(`Requested URL Not Found: ${req.url}`, 404));
});
app.use(generateError);


app.listen(process.env.PORT,console.log(`server running on ${process.env.PORT}`));
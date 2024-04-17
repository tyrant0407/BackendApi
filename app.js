require("dotenv").config("path", "./.env");
const express = require('express')
const app = express();

//logger
const logger = require('morgan');
app.use(logger("tiny"))

//routes
app.use('/',require('./routes/indexRoutes.js'))


app.listen(process.env.PORT,console.log(`server running on ${process.env.PORT}`));
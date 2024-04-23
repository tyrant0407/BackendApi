const express = require('express');
const { homepage, studentsignup, studentsignin, 
    studentsignout, currentStudent , studentSendmail , studentforgetlink 
,studentresetpassword} = require('../controllers/indexController');
const { isAuthenticated } = require('../middlewares/auth');
const router = express.Router();


//GET
router.get('/',homepage);

//GET/student/signout 
router.get('/student/signout',isAuthenticated,studentsignout);


//POST/student/signup 
router.post('/student/signup',studentsignup);

//POST/student/signin 
router.post('/student/signin',studentsignin);

//POST/student
router.post('/student',isAuthenticated,currentStudent);

// POST /student/send-mail
router.post("/student/sendmail", studentSendmail);

// GET /student/forget-link/:studentid
router.get("/student/forget-link/:id", studentforgetlink);

// POST /student/reset-password/:studentid
router.post("/student/reset-password/:id", isAuthenticated,studentresetpassword);




module.exports = router;
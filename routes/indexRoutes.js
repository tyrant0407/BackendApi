const express = require('express');
const { homepage, studentsignup, studentsignin,
    studentsignout, currentStudent, studentSendmail, studentavatar,
    studentForgetLink, studentResetPassword , studentupdate,studentApplyInternship,studentApplyJob  } = require('../controllers/indexController');
const { isAuthenticated } = require('../middlewares/auth');
const router = express.Router();


//GET
router.get('/', homepage);

//GET/student/signout 
router.get('/student/signout', isAuthenticated, studentsignout);


//POST/student/signup 
router.post('/student/signup', studentsignup);

//POST/student/signin 
router.post('/student/signin', studentsignin);

//POST/student
router.post('/student', isAuthenticated, currentStudent);

// POST /student/send-mail
router.post("/student/sendmail", studentSendmail);

// GET /student/forget-link/:id
router.get("/student/forget-link/:id", studentForgetLink);

// POST /student/reset-password/:studentid
router.post("/student/reset-password/:id", isAuthenticated, studentResetPassword );

// POST /student/update/:studentid
router.post("/student/update/:id", isAuthenticated, studentupdate);

// POST /student/avatar/:studentid
router.post("/student/avatar/:id", isAuthenticated, studentavatar);

// ----------------------------apply internships ---------------------------- 

// POST /student/apply/internship/:id
router.post("/student/apply/internship/:id",isAuthenticated, studentApplyInternship);

// POST /student/apply/job/:id
router.post("/student/apply/job/:id",isAuthenticated, studentApplyJob);


module.exports = router;
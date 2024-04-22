const express = require('express');
const { homepage, studentsignup, studentsignin, studentsignout, currentStudent } = require('../controllers/indexController');
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





module.exports = router;
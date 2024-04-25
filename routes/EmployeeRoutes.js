const express = require('express');
const router = express.Router();
const { homepage, employesignup, employesignin,
    employesignout, currentemploye, employeSendmail,
    employeForgetLink, employeResetPassword, 
    employeupdate,employeeOrganisationlogo,
    createInternship,
    readInternship,
    readSingleInternship,
    createJob,
    readJob,
    readSingleJob, } = require('../controllers/employeeControllers');
const { isAuthenticated } = require('../middlewares/auth');



//GET
router.post('/', homepage);

//GET/signout 
router.get('/signout',isAuthenticated,employesignout);


//POST/signup 
router.post('/signup', employesignup);

//POST/signin 
router.post('/signin', employesignin);

//POST
router.post('/loggedinemploye', isAuthenticated, currentemploye);

// POST /send-mail
router.post("/sendmail", employeSendmail);

// GET /forget-link/:employeid
router.get("/forget-link/:id", employeForgetLink);

// POST /reset-password/:employeid
router.post("/reset-password/:id", isAuthenticated, employeResetPassword);

// POST /update/:employeid
router.post("/update/:id", isAuthenticated, employeupdate);

// POST /oreganisationlog/:id
router.post("/organisationlogo/:id",isAuthenticated, employeeOrganisationlogo);


// ----------------------------------------- internships -------------------------------


// POST /internship/create
router.post("/internship/create",isAuthenticated, createInternship);

// POST /internship/read/
router.post("/internship/read/",isAuthenticated, readInternship);

// POST /internship/read/:id
router.post("/internship/read/:id",isAuthenticated, readSingleInternship);



// ----------------------------------------- jobs -------------------------------


// POST /job/create
router.post("/job/create",isAuthenticated, createJob);

// POST /job/read/
router.post("/job/read/",isAuthenticated, readJob);

// POST /job/read/:id
router.post("/job/read/:id",isAuthenticated, readSingleJob);




module.exports = router;
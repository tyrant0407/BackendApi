const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middlewares/auth');
const { resume, addeducation, editeducation, deleteEducation,
    addJobs,
    editJobs,
    deleteJobs,
    addinternships,
    editinternships,
    deleteinternships,
    addResponsibilities,
    editResponsibilities,
    deleteResponsibilities,
    addCourses,
    editCourses,
    deleteCourses,
    addProjects,
    editProjects,
    deleteProjects,
    addSkills,
    editSkills,
    deleteSkills,
    addAccomplishments,
    editAccomplishments,
    deleteAccomplishments,
} = require('../controllers/resumeControllers');




//GET
router.get('/', isAuthenticated, resume);

//---------------EDUCATION------------------------

//POST/add-edu
router.post('/add-edu', isAuthenticated, addeducation);

//POST/edit-edu/:eduid
router.post('/edit-edu/:eduid', isAuthenticated, editeducation);

//POST/edit-edu/:eduid
router.post('/delete-edu/:eduid', isAuthenticated, deleteEducation);


// -----------------------------jobs --------------------------------

// POST /
router.post("/add-jobs/", isAuthenticated, addJobs);

// POST /
router.post("/edit-jobs/:jobId", isAuthenticated, editJobs);

// POST /
router.post("/delete-jobs/:jobId", isAuthenticated, deleteJobs);


// -----------------------------internships --------------------------------

// POST /
router.post("/add-internships/", isAuthenticated, addinternships);

// POST /
router.post("/edit-internships/:internshipId", isAuthenticated, editinternships);

// POST /
router.post("/delete-internships/:internshipId", isAuthenticated, deleteinternships);

// -----------------------------responsibilities --------------------------------

// POST /
router.post("/add-responsibilities/", isAuthenticated, addResponsibilities);

// POST /
router.post("/edit-responsibilities/:responsibilitiesId", isAuthenticated, editResponsibilities);

// POST /
router.post("/delete-responsibilities/:responsibilitiesId", isAuthenticated, deleteResponsibilities);


// -----------------------------courses --------------------------------

// POST /
router.post("/add-courses/", isAuthenticated, addCourses);

// POST /
router.post("/edit-courses/:coursesId", isAuthenticated, editCourses);

// POST /
router.post("/delete-courses/:coursesId", isAuthenticated, deleteCourses);





// -----------------------------projects --------------------------------

// POST /
router.post("/add-projects/", isAuthenticated, addProjects);

// POST /
router.post("/edit-projects/:projectsId", isAuthenticated, editProjects);

// POST /
router.post("/delete-projects/:projectsId", isAuthenticated, deleteProjects);




// -----------------------------skills --------------------------------

// POST /
router.post("/add-skills/", isAuthenticated, addSkills);

// POST /
router.post("/edit-skills/:skillsId", isAuthenticated, editSkills);

// POST /
router.post("/delete-skills/:skillsId", isAuthenticated, deleteSkills);



// -----------------------------accomplishments --------------------------------

// POST /
router.post("/add-accomplishments/", isAuthenticated, addAccomplishments);

// POST /
router.post("/edit-accomplishments/:accomplishmentsId", isAuthenticated, editAccomplishments);

// POST /
router.post("/delete-accomplishments/:accomplishmentsId", isAuthenticated, deleteAccomplishments);



module.exports = router;
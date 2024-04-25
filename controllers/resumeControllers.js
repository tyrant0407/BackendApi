const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");
const Student = require("../models/studentModel");
const ErrorHandler = require("../utils/errorHandler");
const { v4: uuidv4 } = require('uuid')

exports.resume = catchAsyncErrors(async (req, res, next) => {
    const resume = await Student.findById(req.id).exec();
    res.json({ message: "Secure resumePage!", resume })
});
//--------------------EDUCATION------------------------
exports.addeducation = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    student.resume.education.push({ ...req.body, id: uuidv4() });
    await student.save();
    res.json({ message: "Education Added!" })
});

exports.editeducation = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const edutIndex = student.resume.education.findIndex((i) => i.id === req.params.eduid);
    student.resume.education[edutIndex] = { 
        ...student.resume.education[edutIndex], 
        ...req.body, 
    };
    await student.save();
    res.json({ message: "Education Updated!" })
});
exports.deleteEducation = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const filterededu = student.resume.education.filter((i) => i.id !== req.params.eduid);
    student.resume.education =  filterededu;
    await student.save();
    res.json({ message: "Education Deleted!" })
});


// -------------------------------Jobs-----------------------------------

exports.addJobs = catchAsyncErrors(async (req, res, next) => {
    const student = await studentModel.findById(req.id).exec();
    student.resume.jobs.push({ ...req.body, id: uuidv4() });
    await student.save();
    res.status(200).json({ message: "Jobs added successfully!" });
  });
  
  exports.editJobs = catchAsyncErrors(async (req, res, next) => {
    const student = await studentModel.findById(req.id).exec();
    const index = student.resume.jobs.findIndex((e) => e.id == req.params.jobId);
    student.resume.jobs[index] = {
      ...student.resume.jobs[index],
      ...req.body,
    };
    await student.save();
    res.status(200).json({ message: "jobs edited successfully!" });
  });
  
  exports.deleteJobs = catchAsyncErrors(async (req, res, next) => {
    const student = await studentModel.findById(req.id).exec();
    const filteredJobs = student.resume.jobs.filter(
      (e) => e.id !== req.params.jobId
    );
    student.resume.jobs = filteredJobs;
    await student.save();
    res.status(200).json({ message: "jobs deleted successfully!" });
  });
  
  
  // -------------------------------Internships-----------------------------------
  
  exports.addinternships = catchAsyncErrors(async (req, res, next) => {
    const student = await studentModel.findById(req.id).exec();
    student.resume.internships.push({ ...req.body, id: uuidv4() });
    await student.save();
    res.status(200).json({ message: "internships added successfully!" });
  });
  
  exports.editinternships = catchAsyncErrors(async (req, res, next) => {
    const student = await studentModel.findById(req.id).exec();
    const index = student.resume.internships.findIndex((e) => e.id == req.params.internshipId);
    student.resume.internships[index] = {
      ...student.resume.internships[index],
      ...req.body,
    };
    await student.save();
    res.status(200).json({ message: "internships edited successfully!" });
  });
  
  exports.deleteinternships = catchAsyncErrors(async (req, res, next) => {
    const student = await studentModel.findById(req.id).exec();
    const filteredinternships = student.resume.internships.filter(
      (e) => e.id !== req.params.internshipId
    );
    student.resume.internships = filteredinternships;
    await student.save();
    res.status(200).json({ message: "internships deleted successfully!" });
  });
  
  
  // -------------------------------Responsibilities-----------------------------------
  
  exports.addResponsibilities = catchAsyncErrors(async (req, res, next) => {
    const student = await studentModel.findById(req.id).exec();
    student.resume.responsibilities.push({ ...req.body, id: uuidv4() });
    await student.save();
    res.status(200).json({ message: "responsibilities added successfully!" });
  });
  
  exports.editResponsibilities = catchAsyncErrors(async (req, res, next) => {
    const student = await studentModel.findById(req.id).exec();
    const index = student.resume.responsibilities.findIndex((e) => e.id == req.params.responsibilitiesId);
    student.resume.responsibilities[index] = {
      ...student.resume.responsibilities[index],
      ...req.body,
    };
    await student.save();
    res.status(200).json({ message: "responsibilities edited successfully!" });
  });
  
  exports.deleteResponsibilities = catchAsyncErrors(async (req, res, next) => {
    const student = await studentModel.findById(req.id).exec();
    const filteredresponsibilities = student.resume.responsibilities.filter(
      (e) => e.id !== req.params.responsibilitiesId
    );
    student.resume.responsibilities = filteredresponsibilities;
    await student.save();
    res.status(200).json({ message: "responsibilities deleted successfully!" });
  });
  
  
  
  // -------------------------------Courses-----------------------------------
  
  exports.addCourses = catchAsyncErrors(async (req, res, next) => {
    const student = await studentModel.findById(req.id).exec();
    student.resume.courses.push({ ...req.body, id: uuidv4() });
    await student.save();
    res.status(200).json({ message: "courses added successfully!" });
  });
  
  exports.editCourses = catchAsyncErrors(async (req, res, next) => {
    const student = await studentModel.findById(req.id).exec();
    const index = student.resume.courses.findIndex((e) => e.id == req.params.coursesId);
    student.resume.courses[index] = {
      ...student.resume.courses[index],
      ...req.body,
    };
    await student.save();
    res.status(200).json({ message: "courses edited successfully!" });
  });
  
  exports.deleteCourses = catchAsyncErrors(async (req, res, next) => {
    const student = await studentModel.findById(req.id).exec();
    const filteredcourses = student.resume.courses.filter(
      (e) => e.id !== req.params.coursesId
    );
    student.resume.courses = filteredcourses;
    await student.save();
    res.status(200).json({ message: "courses deleted successfully!" });
  });
  
  
  
  // -------------------------------Projects-----------------------------------
  
  exports.addProjects = catchAsyncErrors(async (req, res, next) => {
    const student = await studentModel.findById(req.id).exec();
    student.resume.projects.push({ ...req.body, id: uuidv4() });
    await student.save();
    res.status(200).json({ message: "projects added successfully!" });
  });
  
  exports.editProjects = catchAsyncErrors(async (req, res, next) => {
    const student = await studentModel.findById(req.id).exec();
    const index = student.resume.projects.findIndex((e) => e.id == req.params.projectsId);
    student.resume.projects[index] = {
      ...student.resume.projects[index],
      ...req.body,
    };
    await student.save();
    res.status(200).json({ message: "projects edited successfully!" });
  });
  
  exports.deleteProjects = catchAsyncErrors(async (req, res, next) => {
    const student = await studentModel.findById(req.id).exec();
    const filteredprojects = student.resume.projects.filter(
      (e) => e.id !== req.params.projectsId
    );
    student.resume.projects = filteredprojects;
    await student.save();
    res.status(200).json({ message: "projects deleted successfully!" });
  });
  
  
  
  
  // -------------------------------Skills-----------------------------------
  
  exports.addSkills = catchAsyncErrors(async (req, res, next) => {
    const student = await studentModel.findById(req.id).exec();
    student.resume.skills.push({ ...req.body, id: uuidv4() });
    await student.save();
    res.status(200).json({ message: "skills added successfully!" });
  });
  
  exports.editSkills = catchAsyncErrors(async (req, res, next) => {
    const student = await studentModel.findById(req.id).exec();
    const index = student.resume.skills.findIndex((e) => e.id == req.params.skillsId);
    student.resume.skills[index] = {
      ...student.resume.skills[index],
      ...req.body,
    };
    await student.save();
    res.status(200).json({ message: "skills edited successfully!" });
  });
  
  exports.deleteSkills = catchAsyncErrors(async (req, res, next) => {
    const student = await studentModel.findById(req.id).exec();
    const filteredskills = student.resume.skills.filter(
      (e) => e.id !== req.params.skillsId
    );
    student.resume.skills = filteredskills;
    await student.save();
    res.status(200).json({ message: "skills deleted successfully!" });
  });
  
  
  
  // -------------------------------Accomplishments-----------------------------------
  
  exports.addAccomplishments = catchAsyncErrors(async (req, res, next) => {
    const student = await studentModel.findById(req.id).exec();
    student.resume.accomplishments.push({ ...req.body, id: uuidv4() });
    await student.save();
    res.status(200).json({ message: "accomplishments added successfully!" });
  });
  
  exports.editAccomplishments = catchAsyncErrors(async (req, res, next) => {
    const student = await studentModel.findById(req.id).exec();
    const index = student.resume.accomplishments.findIndex((e) => e.id == req.params.accomplishmentsId);
    student.resume.accomplishments[index] = {
      ...student.resume.accomplishments[index],
      ...req.body,
    };
    await student.save();
    res.status(200).json({ message: "accomplishments edited successfully!" });
  });
  
  exports.deleteAccomplishments = catchAsyncErrors(async (req, res, next) => {
    const student = await studentModel.findById(req.id).exec();
    const filteredaccomplishments = student.resume.accomplishments.filter(
      (e) => e.id !== req.params.accomplishmentsId
    );
    student.resume.accomplishments = filteredaccomplishments;
    await student.save();
    res.status(200).json({ message: "accomplishments deleted successfully!" });
  });
  
const express = require("express");
const studentController = require("../controllers/student.controller");

const router = express.Router();

router
  .route("/")
  .post(studentController.createStudent)
  .get(studentController.getStudents);

module.exports = router;

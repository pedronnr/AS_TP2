const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const pick = require("../utils/pick");
const studentService = require("../services/student.service");

/**
 * Create a presence
 * @param {Object} studentBody
 * @returns {Promise<Student>}
 */
const createStudent = catchAsync(async (req, res) => {
  const presence = await studentService.create(req.body);
  res.status(httpStatus.CREATED).send(presence);
});

const getStudents = catchAsync(async (req, res) => {
  const filter = pick(req.query, ["studentId"]);
  const options = pick(req.query, ["sortBy", "limit", "page"]);
  const result = await studentService.getAll(filter, options);
  res.send(result);
});

const getStudent = catchAsync(async (req, res) => {
  const student = await studentService.getById(req.params.id);
  if (!student) {
    throw new ApiError(httpStatus.NOT_FOUND, "Student not found");
  }
  res.send(student);
});

const getPresences = catchAsync(async (req, res) => {
  const filter = pick(req.query, ["from", "to", "room"]);
  const student = await studentService.getPresencesById(req.params.id, filter);
  if (!student) {
    throw new ApiError(httpStatus.NOT_FOUND, "Student not found");
  }
  res.send(student);
});

module.exports = {
  createStudent,
  getStudents,
  getStudent,
  getPresences,
};

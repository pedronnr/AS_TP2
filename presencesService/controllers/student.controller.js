const httpStatus = require("http-status");
const { Student } = require("../models");
const catchAsync = require("../utils/catchAsync");
const pick = require("../utils/pick");

/**
 * Create a presence
 * @param {Object} studentBody
 * @returns {Promise<Student>}
 */
const createStudent = catchAsync(async (req, res) => {
  const presence = await Student.create(req.body);
  res.status(httpStatus.CREATED).send(presence);
});

const getStudents = catchAsync(async (req, res) => {
  const filter = pick(req.query, ["studentId"]);
  const options = pick(req.query, ["sortBy", "limit", "page"]);
  const result = await Student.paginate(filter, options);
  res.send(result);
});

module.exports = {
  createStudent,
  getStudents,
};

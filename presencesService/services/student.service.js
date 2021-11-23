const { Student } = require("../models");

/**
 * Create a Student
 * @param {Object} studentBody
 * @returns {Promise<Student>}
 */
const create = async (studentBody) => {
  const student = await Student.create(studentBody);
  return student;
};

/**
 * Query for students
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const getAll = async (filter, options) => {
  const students = await Student.paginate(filter, options);
  return students;
};

const getById = async (id) => {
  return await Student.findOne({ studentId: id }, { presences: 0, id: 0 });
};

const getPresencesById = async (id) => {
  return await Student.findOne({ studentId: id }, { presences: 1 });
};

const updateStudentPresences = async (id, presences) => {
  let student = await Student.findOne({ studentId: id }, {});
  console.log(student);
  if (!student) {
    throw new ApiError(httpStatus.NOT_FOUND, "Student not found");
  }
  Object.assign(student.presences, presences);
  await student.save();
  return student;
};

module.exports = {
  create,
  getAll,
  getById,
  updateStudentPresences,
  getPresencesById,
};

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

module.exports = {
  create,
  getAll,
};

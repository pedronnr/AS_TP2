const { Presence } = require("../models");

/**
 * Create a Presence
 * @param {Object} presenceBody
 * @returns {Promise<Presence>}
 */
const create = async (presenceBody) => {
  const presence = await Presence.create(presenceBody);
  return presence;
};

/**
 * Query for presences
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const getAll = async (filter, options) => {
  const presences = await Presence.paginate(filter, options);
  return presences;
};

module.exports = {
  create,
  getAll,
};

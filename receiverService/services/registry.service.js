const { Registry } = require("../models");

/**
 * Create a Registry
 * @param {Object} registryBody
 * @returns {Promise<Registry>}
 */
const create = async (registryBody) => {
  const registry = await Registry.create(registryBody);
  return registry;
};

/**
 * Query for registries
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const getAll = async (filter, options) => {
  const registries = await Registry.paginate(filter, options);
  return registries;
};

module.exports = {
  create,
  getAll,
};

const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const pick = require("../utils/pick");
const { registryService } = require("../services");

/**
 * Create a registry
 * @param {Object} registryBody
 * @returns {Promise<Registry>}
 */
const createRegistry = catchAsync(async (req, res) => {
  const registry = await registryService.create(req.body);
  res.status(httpStatus.CREATED).send(registry);
});

const getAllRegistries = catchAsync(async (req, res) => {
  const filter = pick(req.query, ["value", "room", "timestamp"]);
  const options = pick(req.query, ["sortBy", "limit", "page"]);
  const result = await registryService.getAll(filter, options);
  res.send(result);
});

module.exports = {
  createRegistry,
  getAllRegistries,
};

const express = require("express");
const registryController = require("../controllers/registry.controller");

const router = express.Router();

router
  .route("/")
  .post(registryController.createRegistry)
  .get(registryController.getAllRegistries);

module.exports = router;

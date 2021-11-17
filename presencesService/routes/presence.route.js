const express = require("express");
const presenceController = require("../controllers/presence.controller");

const router = express.Router();

router
  .route("/")
  .post(presenceController.createPresence)
  .get(presenceController.getAllPresences);

router.route("/process").post(presenceController.processRegistries);

module.exports = router;

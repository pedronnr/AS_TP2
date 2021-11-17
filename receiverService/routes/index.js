const express = require("express");

const registryRoute = require("./registry.route");

const router = express.Router();

// Default Routes available in all modes
const defaultRoutes = [
  {
    path: "/registries",
    route: registryRoute,
  },
];

/* Create routes to be used in api */
defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;

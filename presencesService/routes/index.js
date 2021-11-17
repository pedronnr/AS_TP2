const express = require("express");

const presenceRoute = require("./presence.route");
const studentRoute = require("./student.route");

const router = express.Router();

// Default Routes available in all modes
const defaultRoutes = [
  {
    path: "/presences",
    route: presenceRoute,
  },
  {
    path: "/students",
    route: studentRoute,
  },
];

/* Create routes to be used in api */
defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;

const express = require("express");
const registryController = require("../controllers/registry.controller");

const router = express.Router();

router
  .route("/")
  .post(registryController.createRegistry)
  .get(registryController.getAllRegistries);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Registry
 *   description: Registry from Node-Red
 */


/**
 * @swagger
 * /registries:
 *   get:
 *     summary: Get Registries
 *     description: Get Registries.
 *     tags: [Registry]
 *     parameters:
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: sort by query in the form of field:desc/asc (ex. name:asc)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of registries
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Registry'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 * 
 *   post:
 *     summary: Create a Registry
 *     description: Create a Student.
 *     tags: [Registry]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Registry'
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Registry'
 */

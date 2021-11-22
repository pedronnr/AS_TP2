const express = require("express");
const studentController = require("../controllers/student.controller");

const router = express.Router();

router
  .route("/")
  .get(studentController.getStudents)
  .post(studentController.createStudent);


router.route("/:id").get(studentController.getStudent);

module.exports = router;


/**
 * @swagger
 * tags:
 *   name: Students
 *   description: Students data
 */


/**
 * @swagger
 * /students:
 *   get:
 *     summary: Get Student
 *     description: Get Students.
 *     tags: [Students]
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
 *         description: Maximum number of students
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
 *                $ref: '#/components/schemas/Student'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 * 
 *   post:
 *     summary: Create a Student
 *     description: Create a Student.
 *     tags: [Students]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Student'
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Student'
 */

const httpStatus = require("http-status");
const { Presence } = require("../models");
const catchAsync = require("../utils/catchAsync");
const pick = require("../utils/pick");
const http = require("http");
const config = require("../src/config");
const presenceService = require("../services/presence.service");
const studentService = require("../services/student.service");

/**
 * Create a presence
 * @param {Object} presenceBody
 * @returns {Promise<Presence>}
 */
const createPresence = catchAsync(async (req, res) => {
  const presence = await Presence.create(req.body);
  res.status(httpStatus.CREATED).send(presence);
});

const getAllPresences = catchAsync(async (req, res) => {
  const filter = pick(req.query, ["value", "room", "timestamp"]);
  const options = pick(req.query, ["sortBy", "limit", "page"]);
  const result = await Presence.paginate(filter, options);
  res.send(result);
});

const processRegistries = catchAsync(async (req, res) => {
  console.log(req.body);

  let studentPromise = await studentService.getAll({}, {});
  let students = studentPromise.results;
  console.log(students);

  http.get(
    config.urlReceiverService + "registries?limit=50&timestamp>=",
    function (resp) {
      console.log("Processing registries...");

      let data = "";

      resp.on("data", (chunk) => {
        data += chunk;
      });

      resp.on("end", () => {
        let presences = JSON.parse(data).results;
        console.log(presences);

        // itera sobre as presenças e insere na bd de presencas
        presences.forEach((p, index, array) => {
          console.log("Presença: " + p);

          // Verifica se valor existe na lista de estudantes
          let student = students.find((s) => s.studentId === p.value);
          if (student) {
            // Insere presença atraves do servico
            presenceService.create(p);
          }
        });

        res.status(httpStatus.OK).send(presences);
        console.log("Finished Processing registries. ");
      });
    }
  );
});

module.exports = {
  createPresence,
  getAllPresences,
  processRegistries,
};

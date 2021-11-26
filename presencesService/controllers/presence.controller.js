const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const moment = require("moment");
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
  const presence = await presenceService.create(req.body);
  res.status(httpStatus.CREATED).send(presence);
});

const getAllPresences = catchAsync(async (req, res) => {
  const filter = pick(req.query, ["year", "month", "day"]);
  const options = pick(req.query, ["sortBy", "limit", "page"]);
  const result = await presenceService.getAll(filter, options);
  res.send(result);
});

const processRegistries = catchAsync(async (req, res) => {
  console.log(req.body);
  const filter = pick(req.query, ["timestamp"]);
  console.log(filter);

  let queryStr = "";
  if (filter.timestamp) {
    queryStr = "&timestamp>=" + filter.timestamp;
  }

  let studentPromise = await studentService.getAll({}, {});
  let students = studentPromise.results;
  console.log(students);

  http.get(
    config.urlReceiverService + "registries?limit=50" + queryStr,
    function (resp) {
      console.log("Processing registries...");

      let data = "";

      resp.on("data", (chunk) => {
        data += chunk;
      });

      resp.on("end", () => {
        let presences = JSON.parse(data).results;
        console.log(presences);

        let presenceObj = { presences: [] };

        // itera sobre as presenças e insere na bd de presencas
        presences.forEach((p, index, array) => {
          // Verifica se valor existe na lista de estudantes
          let indexStudent = students.findIndex((s) => s.card.code === p.value);
          if (indexStudent >= 0) {
            // Cria presença
            let presence = {
              date: moment(p.timestamp),
              year: moment(p.timestamp).year(),
              month: moment(p.timestamp).month(),
              day: moment(p.timestamp).day(),
              hour: moment(p.timestamp).hour(),
              minute: moment(p.timestamp).minute(),
              room: p.room,
            };

            // Insere presença atraves do servico
            students[indexStudent].presences.push(presence);
          }
        });

        // Atualiza todos os students
        students.forEach((s, index, array) => {
          studentService.updateStudentPresences(s.studentId, s.presences);
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

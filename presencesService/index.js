const express = require("express");
const mongoose = require("mongoose");
const config = require("./src/config");
const cors = require("cors");
const swaggerRouter = require("./routes/docs.route");
const presenceRouter = require("./routes/presence.route");
const studentRouter = require("./routes/student.route");

// configuração Express
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/docs", swaggerRouter);
app.use("/presences", presenceRouter);
app.use("/students", studentRouter);

app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT ,DELETE");
  next();
});

// Connect to mongo and init server
mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
  console.log("Connected to MongoDB");
});

app.listen(config.port, () => {
  console.log(`servidor a executar em http://localhost:${config.port}`);
});

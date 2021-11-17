/*
 * Disponibilização das principais configurações do serviço
 *
 */

// Container for all environments
//const environment = {};

const environment = {
  log: {
    level: process.env.LOG_LEVEL,
  },
  mongoose: {
    url: "mongodb://localhost:27017/presences",
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  port: 4000,
  urlReceiverService: "http://localhost:3000/",
};

// export the module
module.exports = environment;

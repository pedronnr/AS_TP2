/*
 * Disponibilização das principais configurações do serviço
 *
 */

// Container for all environments
//const environment = {};

const environment = {
  mqtt: {
    broker: "localhost", // 'broker.hivemq.com' ,
    port: 1883,
    topic: "sala",
    rooms: ["sala/e", "sala/s", "sala/t"],
  },
  log: {
    level: process.env.LOG_LEVEL,
  },
  mongoose: {
    url: "mongodb://localhost:27017/registries",
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  port: 3000,
};

// export the module
module.exports = environment;

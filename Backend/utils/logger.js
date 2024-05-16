const pino = require("pino");

const logger = pino({
  transport: {
    target: "pino-pretty",
    option: {
      colorize: true,
    },
  },
});
module.exports = logger;

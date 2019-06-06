const pino = require('pino')({
  prettyPrint: { colorize: true },
  level: process.env.LEVEL || 'info',
});

const expressPino = require('express-pino-logger')({
  logger: pino,
});

module.exports = expressPino;

module.exports = require('pino')({
    prettyPrint: { colorize: true },
    level: process.env.LEVEL || 'info',
});

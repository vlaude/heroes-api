const http = require('http');

const api = require('./routes/routes');
const logger = require('./util/logger');

const server = http.Server(api);

const port = process.env.PORT || 3000;
const ip = process.env.IP || '0.0.0.0';

server.listen(port, ip, err =>
  err
    ? logger.error(`Failed to start API : ${err.stack}`)
    : logger.info(`Server is listening on port ${port} ...`)
);

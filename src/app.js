const http = require('http');

const api = require('./routes/routes');

const server = http.Server(api);

const port = process.env.PORT || 3000;
const ip = process.env.IP || '0.0.0.0';

server.listen(port, ip, err =>
  err
    ? console.error(`Failed to start API : ${err.stack}`)
    : console.log(`Server is listening on port ${port} ...`)
);

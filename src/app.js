const http = require('http');

const db = require('./db/models');
const api = require('./routes/routes');
const logger = require('./util/logger');

const server = http.Server(api);
const io = require('socket.io')(server);
const { initChat } = require('./sockets/chat.socket');

initChat(io);

const port = process.env.PORT || 3000;
const ip = process.env.IP || '0.0.0.0';

db.sequelize
    .authenticate()
    .then(() => {
        db.sequelize.sync().then(() => {
            server.listen(port, ip, err =>
                err
                    ? logger.error(`Failed to start API : ${err.stack}`)
                    : logger.info(`Server is listening on port ${port} ...`)
            );
        });
    })
    .catch(err => {
        logger.error(`Failed to connect to database : ${err.stack}`);
    });

const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');

const api = require('./routes/routes');
api.use(cors);

const server = http.Server(api);
const io = socketIO(server);

const db = require('./db');

io.on('connection', socket => {
  console.log('user connected');

  socket.on('new-message', message => {
    console.log(message);
    io.emit('new-message', message);
  });
});


db.sequelize
  .sync()
  .then(() =>
    server.listen(process.env.PORT || 3000, () => {
      console.log('🏋 Server listening on port 3000 ...');
    })
  )
  .catch(err => console.log(`🔥 Failed to connect database : ${err.stack}`));

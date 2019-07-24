const messageBuilder = require('../builders/message.builder');
const userBuilder = require('../builders/user.builder');
const roomBuilder = require('../builders/room.builder');

const initChat = io => {
    const clients = {};

    io.of('/chat').on('connection', socket => {
        const username = socket.handshake.query.username;
        console.log(`${username} is connected to the chat`);

        clients[username] = socket.id;
        io.of('/chat').emit('clients', clients);

        socket.on('join-room', room => {
            socket.join(room);
            console.log(`a user join room ${room}`);

            socket.on('new-message', async msg => {
                socket.in(room).emit('new-message', msg);

                if (msg.room.name === room) {
                    const poster = await userBuilder.getUserById(msg.poster.id);
                    const roomEntity = await roomBuilder.getRoomById(msg.room.id);
                    messageBuilder.createMessage(msg.content, poster, roomEntity);
                }
            });
        });

        socket.on('leave-room', room => {
            socket.leave(room);
            console.log(`a user leave room ${room}`);
        });

        socket.on('disconnect', () => {
            console.log(`${username} is now disconnected`);
            delete clients[username];
            io.of('/chat').emit('clients', clients);
        });
    });
};

module.exports = { initChat };

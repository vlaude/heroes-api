const messageBuilder = require('../builders/message.builder');
const userBuilder = require('../builders/user.builder');
const roomBuilder = require('../builders/room.builder');

const initChat = io => {
    io.of('/chat').on('connection', socket => {
        console.log('a user is connected to the chat');

        socket.on('join-room', room => {
            socket.join(room);
            console.log(`a user join room ${room}`);

            socket.on('new-message', async msg => {
                console.log(`message sent to room ${room} : ${msg.message}`);
                socket.in(room).emit('new-message', msg);

                // TODO Look at this
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
    });
};

module.exports = { initChat };

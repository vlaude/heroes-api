const messageBuilder = require('../builders/message.builder');
const userBuilder = require('../builders/user.builder');
const roomBuilder = require('../builders/room.builder');
const convService = require('../services/conversation.service');

const initChat = io => {
    const clients = {};
    // const typers = {};

    io.of('/chat').on('connection', socket => {
        const { username } = socket.handshake.query;

        clients[username] = socket.id;
        io.of('/chat').emit('clients', clients);

        socket.on('join-room', room => {
            socket.join(room);

            socket.on('new-message', async msg => {
                socket.in(room).emit('new-message', msg);

                if (msg.room.name === room) {
                    const poster = await userBuilder.getUserById(msg.poster.id);
                    const roomEntity = await roomBuilder.getRoomById(msg.room.id);
                    // On persiste le message.
                    messageBuilder.createMessage(msg.content, msg.attachment, poster, roomEntity);
                    // On notifie les autres users de la room.
                    convService.markAllConvAsNoreadByRoom(msg.poster.id, msg.room.id);
                }
            });

            // socket.on('is-typing', typer => {
            //     console.log(`${typer.username} is typing on ${typer.room.name}`);
            //     typers[typer.username] = typer.room;
            //     socket.in(room).emit('is-typing', typer);
            // });
        });

        socket.on('leave-room', room => {
            socket.leave(room);
        });

        socket.on('room-read', conv => {
            convService.markConvAsReadByUserAndRoom(conv.userId, conv.roomId);
        });

        socket.on('disconnect', () => {
            delete clients[username];
            io.of('/chat').emit('clients', clients);
        });
    });
};

module.exports = { initChat };

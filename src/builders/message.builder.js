const { Message, User, Room } = require('../db/models');

const createMessage = (content, poster, room) => {
    return new Promise(async (resolve, reject) => {
        try {
            const message = await Message.create({
                content,
                date: new Date(),
            });
            await message.setPoster(poster);
            await message.setRoom(room);
            resolve(message);
        } catch (error) {
            reject(error);
        }
    });
};

const getAllMessages = () =>
    Message.findAll({
        attributes: {
            exclude: Message.excludeAttributes,
        },
        include: [
            {
                model: User,
                as: 'poster',
                attributes: {
                    exclude: User.excludeAttributes,
                },
            },
            {
                model: Room,
                as: 'room',
                attributes: {
                    exclude: Room.excludeAttributes,
                },
            },
        ],
    });

module.exports = {
    createMessage,
    getAllMessages,
};

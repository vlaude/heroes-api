const { Message, User } = require('../db/models');

const createMessage = (content, poster) => {
    return new Promise(async (resolve, reject) => {
        try {
            const message = await Message.create({
                content,
                date: new Date(),
            });
            await message.setPoster(poster);
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
        ],
    });

module.exports = {
    createMessage,
    getAllMessages,
};

const { Conversation } = require('../db/models');

const createConversation = (user, room) => {
    return new Promise(async (resolve, reject) => {
        try {
            const conversation = await Conversation.create({
                isRead: false,
            });
            await conversation.setUser(user.id);
            await conversation.setRoom(room.id);
            resolve(conversation);
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = { createConversation };

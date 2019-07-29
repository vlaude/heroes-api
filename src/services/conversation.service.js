const convBuilder = require('../builders/conversation.builder');
const roomBuilder = require('../builders/room.builder');

/**
 * Crée une conversation dans toutes les room publiques pour un user.
 * @param user
 * @returns {Promise<any[]>}
 */
const createConvsForUserAndPublicRooms = async user => {
    const publicRooms = await roomBuilder.getAllRooms();
    const promisesConv = [];
    publicRooms.forEach(room => {
        promisesConv.push(convBuilder.createConversation(user, room));
    });

    return Promise.all(promisesConv);
};

module.exports = { createConvsForUserAndPublicRooms };

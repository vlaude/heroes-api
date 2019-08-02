const roomBuilder = require('../builders/room.builder');
const userBuilder = require('../builders/user.builder');

/**
 * Get all private and project rooms joined by the user.
 */
const getAllJoinedRooms = user =>
    new Promise(async (resolve, reject) => {
        try {
            const entityUser = await userBuilder.getUserById(user.id);
            resolve(entityUser.Rooms);
        } catch (error) {
            reject(error);
        }
    });

/**
 * Create a classic room (private or project).
 */
const createRoom = (creator, room) =>
    new Promise(async (resolve, reject) => {
        try {
            // Automatically add the creator in the members room.
            if (!room.members.find(m => m === creator.id)) {
                room.members.push(creator.id);
            }
            let newRoom = await roomBuilder.createRoom(room);
            // TODO Rollback création room si addMembers plante.
            newRoom = room.members ? await roomBuilder.addMembers(newRoom, room.members) : newRoom;
            resolve(newRoom);
        } catch (error) {
            reject(error);
        }
    });

/**
 * Create a public room (name must be unique).
 */
const createPublicRoom = room =>
    new Promise(async (resolve, reject) => {
        try {
            let newRoom = room;
            newRoom.type = 'PUBLIC';
            newRoom = await roomBuilder.createPublicRoom(newRoom);
            // See Sequelize findOrCreate documentation for more information about what happened below.
            const roomAlreadyExists = !newRoom[1];
            if (roomAlreadyExists) {
                reject({ status: 409, message: 'A public room with this name already exists.' });
            }
            resolve(newRoom[0]);
        } catch (error) {
            reject(error);
        }
    });

module.exports = { createRoom, createPublicRoom, getAllJoinedRooms };

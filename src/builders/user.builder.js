const { User, Room } = require('../db/models');

const getAllUsers = () =>
    User.findAll({
        attributes: {
            exclude: User.excludeAttributes,
        },
    });

const getUserById = id =>
    User.findOne({
        where: { id },
        attributes: {
            exclude: User.excludeAttributes,
        },
        include: {
            model: Room,
            as: 'Rooms',
            attributes: {
                exclude: Room.excludeAttributes,
            },
            through: { attributes: [] },
        },
    });

const getUserByUsernameWithHash = username =>
    User.findOne({
        where: { username },
        attributes: { exclude: ['createdAt', 'updatedAt'] },
    });

const createUser = user =>
    User.findOrCreate({
        where: {
            username: user.username,
        },
        defaults: user,
    }).spread((newUser, created) => {
        if (created) {
            const newUserMinified = newUser.get({ plain: true });
            User.excludeAttributes.forEach(att => {
                delete newUserMinified[att];
            });
            return [newUserMinified, created];
        }
        return [newUser, created];
    });

module.exports = {
    getAllUsers,
    createUser,
    getUserById,
    getUserByUsernameWithHash,
};

const { User } = require('../db/models');

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

module.exports = { getAllUsers, createUser, getUserById };

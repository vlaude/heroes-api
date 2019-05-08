const omit = require('lodash.omit');
const { Users } = require('../../db');

const createUser = ({ username, email, password }) =>
  Users.create({
    username,
    email: email || null,
    hash: password,
  }).then(user => omit(user.get({ plain: true }), Users.excludeAttributes));

const getUserById = ({ id }) =>
  Users.findOne({
    where: {
      id,
    },
  }).then(user =>
    user && !user.deletedAt
      ? omit(
          user.get({
            plain: true,
          }),
          Users.excludeAttributes
        )
      : Promise.reject(new Error('unknown or deleted user'))
  );

const getUserByUsername = username =>
  Users.findOne({
    where: {
      username,
    },
  }).then(user =>
    user && !user.deletedAt
      ? omit(
          user.get({
            plain: true,
          }),
          Users.excludeAttributes
        )
      : Promise.reject(new Error('unknown or deleted user'))
  );

module.exports = { createUser, getUserById, getUserByUsername };

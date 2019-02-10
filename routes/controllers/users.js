const omit = require('lodash.omit');
const { Users } = require('../../db');

const createUser = ({ username, email, password }) =>
  Users.create({
    username,
    email: email || null,
    hash: password,
  }).then(user => omit(user.get({ plain: true }), Users.excludeAttributes));

module.exports = { createUser };

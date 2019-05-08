const express = require('express');
const { createUser, getUserByUsername } = require('./controllers/users');

const apiUsers = express.Router();

apiUsers.post('/', (req, res) =>
  !req.body.username || !req.body.password
    ? res.status(400).send({
        success: false,
        message: 'username and password are required',
      })
    : createUser(req.body)
        .then(user => {
          res.status(201).send({
            success: true,
            data: user,
            message: 'user created',
          });
        })
        .catch(err => {
          console.log(`💥 Failed to create user : ${err.stack}`);
          return res.status(500).send({
            success: false,
            message: `${err.name} : ${err.message}`,
          });
        })
);

apiUsers.get('/:username', (req, res) =>
  getUserByUsername(req.params.username)
    .then(user => res.status(200).send(user))
    .catch(err => {
      res.status(404).send(`${err.name} : ${err.message}`);
    })
);

module.exports = apiUsers;

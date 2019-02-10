const express = require('express');
const jwt = require('jwt-simple');
const { createUser } = require('./controllers/users');

const apiUsers = express.Router();

apiUsers.post('/', (req, res) =>
  !req.body.username || !req.body.password
    ? res.status(400).send({
        success: false,
        message: 'username and password are required',
      })
    : createUser(req.body)
        .then(user => {
          const token = jwt.encode({ id: user.id }, process.env.JWT_SECRET);
          res.status(201).send({
            token,
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

module.exports = apiUsers;

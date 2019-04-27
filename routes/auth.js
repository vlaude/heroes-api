const express = require('express');
const jwt = require('jwt-simple');
const { loginUser } = require('./controllers/auth');

const apiAuth = express.Router();

apiAuth.post('/login', (req, res) =>
  !req.body.username || !req.body.password
    ? res.status(400).send({
        success: false,
        message: 'username and password required',
      })
    : loginUser(req.body)
        .then(user => {
          const token = jwt.encode({ id: user[0].id }, process.env.JWT_SECRET);
          res.status(200).send({
            success: true,
            token: token,
            profile: user[0],
            message: 'user logged in',
          });
        })
        .catch(error => {
          res.status(500).send({
            success: false,
            message: `${error.name} : ${error.message}`,
          });
        })
);

module.exports = apiAuth;

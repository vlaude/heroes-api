const express = require('express');
const bodyParser = require('body-parser');
const hpp = require('hpp');
const helmet = require('helmet');

const api = express();
api.use(express.json({ limit: '1mb' }));
const apiRoutes = express.Router();

const apiMessages = require('./messages');

api.use(bodyParser.urlencoded());
// api.use(hpp);
api.use(helmet());

apiRoutes.get('/', (req, res) => {
  res.status(200).send({ message: 'Hello from the awesome heroes api !' });
});

apiRoutes.use('/messages', apiMessages).use((err, req, res, next) => {
  res.status(403).send({
    success: false,
    message: `${err.name} : ${err.message}`,
  });
  next();
});

api.use('/api/v1', apiRoutes);

module.exports = api;

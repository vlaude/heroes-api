const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const expressPino = require('express-pino-logger');
const logger = require('../util/logger');

const api = express();
const apiRoutes = express.Router();

const userApi = require('./user.route');

api.use(bodyParser.json());
api.use(bodyParser.urlencoded({ extended: true }));
api.use(helmet());
api.use(cors());
if (process.env.NODE_ENV !== 'test') {
  api.use(expressPino({ logger }));
}

apiRoutes.get('/', (req, res) => {
  res.status(200).send({ message: `Hello from my awesome API !` });
});

apiRoutes.use('/users', userApi);

api.use('/api/v1', apiRoutes);

module.exports = api;

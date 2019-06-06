const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const logger = require('../util/logger');
const expressPino = require('express-pino-logger');

const api = express();
const apiRoutes = express.Router();

api.use(bodyParser.json());
api.use(bodyParser.urlencoded({ extended: true }));
api.use(helmet());
api.use(cors());
api.use(expressPino({ logger: logger }));

apiRoutes.get('/', (req, res) => {
  res.status(200).send({ message: `Hello from my awesome API !` });
});

api.use('/api/v1', apiRoutes);

module.exports = api;

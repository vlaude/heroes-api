const express = require('express');
const bodyParser = require('body-parser');
const xhub = require('express-x-hub');

const cors = require('cors');
// const hpp = require('hpp');
const helmet = require('helmet');

const { initAuth, isAuthenticated } = require('./controllers/auth');
const apiAuth = require('./auth');
const apiUsers = require('./users');
const apiMessages = require('./messages');

const api = express();
initAuth();

const apiRoutes = express.Router();

api.use(bodyParser.json());
api.use(bodyParser.urlencoded({ extended: true }));
const xhubSecret = 'MySecretKey';
api.use(xhub({ algorithm: 'sha1', secret: xhubSecret }));

api.use(cors());
// api.use(hpp);
api.use(helmet());

apiRoutes.get('/', (req, res) => {
  res.status(200).send({ message: 'Hello from the awesome heroes api !' });
});

apiRoutes.post('/webhook', function(req, res) {
  if (!req.isXHubValid()) {
    res.status(400).send('Invalid X-Hub Request');
    console.log('Secret key is invalid');
    return;
  }

  const command = req.headers['x-github-event'];
  console.log('Command received : ' + command);

  switch (command) {
    case 'push':
      console.log(req.body.sender.login);
      console.log(req.body.sender.url);
      console.log(req.body.head_commit.message);
      res.send('Event push trigger');
      break;

    default:
      res.status(400).send('Event not supported : ' + command);
      console.log('Event not supported : ' + req.headers['X-Github-Event']);
  }
});

apiRoutes
  .use('/auth', apiAuth)
  .use('/users', apiUsers)
  .use('/messages', apiMessages)
  .use(isAuthenticated)
  .get('/checkJwt', (req, res) => {
    res.status(200).send({ message: 'Your token is valid :-)' });
  })
  .use((err, req, res, next) => {
    res.status(403).send({
      success: false,
      message: `${err.name} : ${err.message}`,
    });
    next();
  });

api.use('/api/v1', apiRoutes);

module.exports = api;

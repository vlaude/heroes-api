const express = require('express');

const config = require('../config');
const roomController = require('../controllers/room.controller');
const { allowOnly } = require('../middlewares/auth.middleware');

const apiRoom = express.Router();
const apiRoomProtected = express.Router();

// TODO Make these routes protected
apiRoom.get('/', roomController.getAllRooms);
apiRoom.post('/', roomController.createRoom);

module.exports = { apiRoom, apiRoomProtected };

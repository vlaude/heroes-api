const Sequelize = require('sequelize');
const sequelize = new Sequelize('postgresql://user:password@localhost:5439/heroes');

module.exports = sequelize;

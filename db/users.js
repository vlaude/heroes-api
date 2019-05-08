const bcrypt = require('bcrypt'); // https://github.com/kelektiv/node.bcrypt.js

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    'Users',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: true,
        },
        unique: true,
      },
      hash: {
        type: DataTypes.STRING,
        allowNull: false,
        set(val) {
          const hash = bcrypt.hashSync(val, 12);
          this.setDataValue('hash', hash);
        },
      },
    },
    {
      paranoid: true,
    }
  );

  // we don't want to send password even if crypted
  Users.excludeAttributes = ['hash', 'createdAt', 'updatedAt', 'deletedAt'];

  Users.prototype.comparePassword = function(password) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, this.hash, (err, res) => {
        if (err || !res) {
          reject(new Error('invalid credentials'));
        }
        resolve();
      });
    });
  };

  return Users;
};

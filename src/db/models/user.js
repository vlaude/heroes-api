const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
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
      role: {
        type: DataTypes.ENUM,
        values: ['USER', 'ADMIN', 'SUPADMIN'],
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
  User.associate = models => {
    // associations can be defined here
  };

  // we don't want to send password even if crypted
  User.excludeAttributes = ['hash', 'createdAt', 'updatedAt', 'deletedAt'];

  User.prototype.comparePassword = password => {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, this.hash, (err, res) => {
        if (err || !res) {
          return reject(new Error('INVALID CREDENTIALS'));
        }
        return resolve();
      });
    });
  };

  return User;
};

const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
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
  });
  User.associate = models => {
    // associations can be defined here
  };

  // we don't want to send password even if crypted
  User.excludeAttributes = [
    'hash',
    'role',
    'createdAt',
    'updatedAt',
    'deletedAt',
  ];

  return User;
};

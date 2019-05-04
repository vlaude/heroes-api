module.exports = (sequelize, DataTypes) => {
  const Messages = sequelize.define(
    'Messages',
    {
      timeStamp: DataTypes.DATE,
      message: DataTypes.STRING,
    },
    {
      paranoid: true,
    }
  );

  Messages.associate = models => {
    Messages.belongsTo(models.Users, {
      foreignKey: {
        field: 'posterId',
        targetKey: 'id',
        allowNull: false,
      },
      as: 'poster',
    });
  };

  return Messages;
};

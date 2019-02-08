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

  // Messages.sync({ force: true }).then(() => {
  //   return Messages.create({
  //     timeStamp: new Date(),
  //     message: 'Hello World!',
  //   });
  // });

  return Messages;
};

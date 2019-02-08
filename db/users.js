module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    'Users',
    {
      username: DataTypes.STRING,
    },
    {
      paranoid: true,
    }
  );

  // Users.sync({ force: true }).then(() => {
  //   return Users.create({
  //     username: 'admin',
  //   });
  // });

  return Users;
};

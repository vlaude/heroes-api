module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Users', 'deletedAt');
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Users', 'deletedAt', {
      allowNull: true,
      defaultValue: null,
      type: Sequelize.DATE,
    });
  },
};

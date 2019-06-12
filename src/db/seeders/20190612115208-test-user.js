module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        id: 'fc16f7d7-c1e2-40e8-95bf-ae35cd4272c9',
        username: 'test2',
        hash: '$2b$12$E0wV3UMvs0NPAsp5/qQG2ehL3Ontkzs.WQaN0AT.S1N..ah4stRS2',
        role: 'USER',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  },
};

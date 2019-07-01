module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        id: '09d10e5b-3f26-4e7b-9ecb-bdea62391259',
        username: 'admin',
        hash: '$2b$12$8k7GApCWSybxruBHy6WUbepyddIQjFX8h2Jqhboa61.KWNMYE7LuS',
        role: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '3f1994bd-6df7-438a-874c-b835687306f7',
        username: 'test',
        hash: '$2b$12$htEIsRHl3flc7tQokQNMxe5Gek9Lrtco5xMr5k6rVWidQdpZG9c/O',
        role: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'fc16f7d7-c1e2-40e8-95bf-ae35cd4272c9',
        username: 'test2',
        hash: '$2b$12$E0wV3UMvs0NPAsp5/qQG2ehL3Ontkzs.WQaN0AT.S1N..ah4stRS2',
        role: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  },
};

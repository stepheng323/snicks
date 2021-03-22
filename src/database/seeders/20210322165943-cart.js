export default {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Carts',
      [
        {
          userId: 2,
          productId: 2,
          quantity: 5,
          updatedAt: '2021-03-22T14:13:26.200Z',
          createdAt: '2021-03-22T14:13:26.200Z',
        },
        {
          userId: 1,
          productId: 1,
          quantity: 3,
          updatedAt: '2021-03-22T14:13:26.200Z',
          createdAt: '2021-03-22T14:13:26.200Z',
        },
        {
          userId: 1,
          productId: 4,
          quantity: 1,
          updatedAt: '2021-03-22T14:13:26.200Z',
          createdAt: '2021-03-22T14:13:26.200Z',
        },
        {
          userId: 2,
          productId: 5,
          quantity: 1,
          updatedAt: '2021-03-22T14:13:26.200Z',
          createdAt: '2021-03-22T14:13:26.200Z',
        },
        {
          userId: 1,
          productId: 3,
          quantity: 1,
          updatedAt: '2021-03-22T14:13:26.200Z',
          createdAt: '2021-03-22T14:13:26.200Z',
        },
      ],
      {}
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Carts', null, {});
  },
};

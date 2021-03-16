/* eslint-disable no-unused-vars */
export default {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          firstName: 'John',
          lastName: 'Doe',
          email: 'johndoe@gmail.com',
          password: '$2b$10$YMZelRt.7eqMmqrfiO/gLepdQWwbIf5lBFBtTtp2gfsaZOsokz8uC',
          phone: '23454666565',
          role: 'user'
        },
        {
          firstName: 'Gordon',
          lastName: 'James',
          email: 'stepheng323@gmail.com',
          password: '$2b$10$YMZelRt.7eqMmqrfiO/gLepdQWwbIf5lBFBtTtp2gfsaZOsokz8uC',
          phone: '23454666565',
          role: 'admin'
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  },
};

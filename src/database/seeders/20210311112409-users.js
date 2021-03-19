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
          role: 'user',
          refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZmlyc3ROYW1lIjoiR29yZG9uIiwibGFzdE5hbWUiOiJKYW1lcyIsImVtYWlsIjoic3RlcGhlbmczMjNAZ21haWwuY29tIiwicGhvbmUiOiIyMzQ1NDY2NjU2NSIsInJvbGUiOiJhZG1pbiIsInJlZnJlc2hUb2tlbiI6bnVsbCwiaWF0IjoxNjE2MDI2MjM3LCJleHAiOjE2MTg2MTgyMzd9.gpLDyntBChvpgu9rpsW3wyIrMuVYs1i0k9-ydS2t2Mk'
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

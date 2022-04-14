'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Reviews',
      [
        {
          listing: 1,
          author: 2,
          provider: 3,
          comment: 'Very good job, the leaves were nowhere to be seen',
          rating: 5,
        },
        {
          listing: 4,
          author: 2,
          provider: 4,
          comment: 'There were some patches of uncut grass at the edge',
          rating: 1,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Reviews', null, {});
  },
};

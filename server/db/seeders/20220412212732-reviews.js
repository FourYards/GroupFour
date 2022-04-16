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
        {
          listing: 4,
          author: 2,
          provider: 4,
          comment: 'Missed a spot... or two',
          rating: 2,
        },
        {
          listing: 4,
          author: 2,
          provider: 4,
          comment: 'Machine leaked oil and left a trail of yellow grass behind',
          rating: 1,
        },
        {
          listing: 4,
          author: 2,
          provider: 4,
          comment: 'Great job',
          rating: 5,
        },
        {
          listing: 4,
          author: 2,
          provider: 4,
          comment: 'Brought a really cute dog',
          rating: 4,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Reviews', null, {});
  },
};

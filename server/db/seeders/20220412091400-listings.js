'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Listings',
      [
        {
          title: 'Front Yard Leaves',
          description: 'Need someone to clean up my front yard',
          lengthInMinutes: 70,
          creator: 2,
          place: 2,
          type: 2,
          status: 3,
        },
        {
          title: 'Weekly Lawn Mowing',
          description:
            '.25 acres that I need mowed weekly. Looking to pay $100 per mowing.',
          lengthInMinutes: 50,
          creator: 2,
          place: 3,
          type: 1,
          status: 2,
        },
        {
          title: 'Lovely April Snow',
          description:
            "Grandma's driveway needs shoveling and I do not have the time to do it",
          lengthInMinutes: 30,
          creator: 3,
          place: 4,
          type: 3,
          status: 1,
        },
        {
          title: 'Weekly Lawn Mowing ~$125',
          description:
            'USU needs the quad mowed every tuesday. Looking to pay $125.',
          lengthInMinutes: 120,
          creator: 2,
          place: 3,
          type: 1,
          status: 1,
        },
        {
          title: 'Law nMow',
          description: 'My mower broke down, but grass still grows.',
          lengthInMinutes: 45,
          creator: 2,
          place: 3,
          type: 1,
          status: 1,
        },
        {
          title: 'STUCK INSIDE THE HOUSE',
          description:
            'The snow was pretty good last night. And now my doors are stuck. Please Help',
          lengthInMinutes: 45,
          creator: 3,
          place: 3,
          type: 3,
          status: 1,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Listings', null, {});
  },
};

'use strict';

/**
 * Note: All seeded users in dev will have the same password by default.
 * That password is - you guessed it - password
 * In a production setting, you usually just let people sign up or you use an additional script that can
 * be run to setup an admin user.
 */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'UserAccounts',
      [
        {
          realName: 'Test User',
          emailAddress: 'test.user@usu.edu',
          passwordHash:
            '$argon2id$v=19$m=15360,t=3,p=1$qztbmFD2qq0t+rs5PFAvdA$zPubCBzB3sWuBuFw2oY97kk/SsVfYPGRhHgCpHH8fh3f2n1u92xmGI2OV9+OkyWngpjnyuiO4sTwNEyGeQxOiVMXxfSYEn9skshDiwR0BK8TDHdI8ISG8Cvtg0MT89VE1AIoqegwNCkW/Et/PnnKcjM2iLDeMaFImlPM7kFKe/I',
          phoneNumber: '1234567890',
          createdAt: new Date(),
          updatedAt: new Date(),
          displayType: null,
          role: 'ADM',
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('UserAccounts', null, {});
  },
};

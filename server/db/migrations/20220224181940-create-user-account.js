'use strict';

const db = require('../models');

module.exports = {
  async up() {
    await db.UserAccount.sync();
  },
  async down() {
    await db.UserAccount.drop();
  },
};

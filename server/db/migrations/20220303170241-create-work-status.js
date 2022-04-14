'use strict';

const db = require('../models');

module.exports = {
  async up() {
    await db.WorkStatus.sync();
  },

  async down() {
    await db.Location.drop();
    await db.WorkStatus.drop();
  },
};

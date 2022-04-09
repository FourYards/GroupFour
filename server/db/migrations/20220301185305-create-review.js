'use strict';

const db = require('../models');

module.exports = {
  async up() {
    await db.Review.sync();
  },

  async down() {
    await db.Review.drop();
  },
};

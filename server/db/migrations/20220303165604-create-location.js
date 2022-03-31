'use strict';

const db = require('../models');

module.exports = {
  async up () {
    await db.Location.sync();
  },

  async down () {
    await db.Location.drop();
  }
};

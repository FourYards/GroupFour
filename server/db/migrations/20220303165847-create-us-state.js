'use strict';

const db = require('../models');

module.exports = {
  async up () {
    await db.USState.sync();
  },

  async down () {
    await db.USState.drop();
  }
};

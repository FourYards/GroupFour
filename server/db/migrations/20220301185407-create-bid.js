'use strict';

const db = require('../models');

module.exports = {
  async up () {
    await db.Bid.sync();
  },

  async down () {
    await db.Bid.drop();
  }
};

'use strict';

const db = require('../models');

module.exports = {
  async up () {
    await db.Listing.sync();
  },

  async down () {
    await db.Listing.drop();
  }
};

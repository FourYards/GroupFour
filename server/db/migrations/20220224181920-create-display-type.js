'use strict';

const db = require('../models');

module.exports = {
  async up() {
    await db.DisplayType.sync();
  },
  async down() {
    await db.DisplayType.drop();
  },
};

'use strict';

const db = require('../models');

module.exports = {
  async up() {
    await db.Role.sync();
  },
  async down() {
    await db.Role.drop();
  },
};

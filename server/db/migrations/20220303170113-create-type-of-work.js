'use strict';

const db = require('../models');

module.exports = {
  async up() {
    await db.TypeOfWork.sync();
  },

  async down() {
    await db.TypeOfWork.drop();
  },
};

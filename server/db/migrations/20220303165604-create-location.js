'use strict';

const db = require('../models');

module.exports = {
  async up() {
    await db.Location.sync();
  },

  async down() {
    // Handling this in a later migration since these aren't ordered quite right.
    // Need to remove this inside work status to get things to run without reordering files.
    // Reordering is the right thing to do, but I'm too lazy to do it the right way since these
    // seeds are more of a convenience file at this point.
  },
};

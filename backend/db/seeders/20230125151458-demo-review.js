'use strict';
/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        userId: 1,
        review: 'Nice experience',
        stars: 5,
      },
      {
        spotId: 2,
        userId: 2,
        review: 'I love it',
        stars: 4,
      },
      {
        spotId: 3,
        userId: 3,
        review: 'bad',
        stars: 3,
      },
      {
        spotId: 2,
        userId: 1,
        review: 'noisy',
        stars: 3.8,
      },
      {
        spotId: 1,
        userId: 2,
        review: 'convenient',
        stars: 4,
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      id: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};

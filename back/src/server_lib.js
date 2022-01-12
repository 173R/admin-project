const moment = require("moment");

function getRandomValue(min, max) {
  return Math.random() * (max - min) + min;
}

function randomDate(start, end) {
  const resultDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return moment.utc(resultDate).toDate();
}

module.exports = {getRandomValue, randomDate}

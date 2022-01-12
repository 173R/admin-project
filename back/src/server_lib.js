const moment = require("moment");

function getRandomValue(min, max) {
  return Math.random() * (max - min) + min;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}

function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  //return moment(resultDate).toDate();
}

function newRandomDate(index, start, end) {

}

module.exports = {getRandomInt, getRandomValue, randomDate, newRandomDate}

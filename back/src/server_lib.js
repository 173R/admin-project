function getRandomValue(min, max) {
  return Math.random() * (max - min) + min;
}

function randomDate(start, end) {
  const resultDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  resultDate.setSeconds(0,0);
  return resultDate.toISOString();
}

module.exports = {getRandomValue, randomDate}

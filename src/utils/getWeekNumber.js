/** @format */

function getWeekNumber(date) {
  const oneJan = new Date(date.getFullYear(), 0, 1);
  const dayOfYear = (date - oneJan + 86400000) / 86400000;
  return [date.getFullYear(), Math.ceil(dayOfYear / 7)];
}
module.exports = {
  getWeekNumber,
};

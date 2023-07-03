function getDate() {
  const todayDate = new Date();
  let year = todayDate.getFullYear();
  let month = todayDate.getMonth() + 1;
  let date = todayDate.getDate();
  let hours = todayDate.getHours(); // 시
  let minutes = todayDate.getMinutes(); // 분
  let today = `${year}-${month}-${date} ${hours}:${minutes}`;
  return today;
}

module.exports = getDate;

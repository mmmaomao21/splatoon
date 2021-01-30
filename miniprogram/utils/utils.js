const gameTypeMap={
  regular:'通常比赛',
  salmon:'鲑鱼打工',
  league:'联盟比赛',
  ranked:'真格比赛'
}

const formatDate = (str) => {
  let time = new Date(str * 1000);
  return `${("0" + (time.getMonth() + 1)).slice(-2)}/${("0" + time.getDate()).slice(-2)} ${("0" + time.getHours()).slice(-2)}:00`;
}


module.exports = {
  gameTypeMap,
  formatDate
}
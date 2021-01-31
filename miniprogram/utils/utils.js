const app = getApp()

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

const formatData=(res)=>{
    let target=res.map(item=>{
      return {
        ...item,
        'start_time':formatDate(item['start_time']),
        'end_time':formatDate(item['end_time']),
      }
    })

    return target;
}

const getGameData=(type)=>{
  return new Promise((resolve, reject)=>{
    if (!app.globalData.gameData) {
      wx.showToast({title: '加载中', icon: 'loading'});
      wx.request({
        url: 'https://splatoon2.ink/data/schedules.json',
        type: 'GET',
        success: (res) => {
wx.hideToast();
          if (res.statusCode === 200) {
            let target = res.data;
            app.globalData.gameData = target;
            resolve(formatData(target[type]))
          }
        },
        error:()=>{
          wx.hideToast();
          reject()
        }
      })
    } else {
      resolve(formatData(app.globalData.gameData[type]))
    }
  })
      
}


module.exports = {
  gameTypeMap,
  formatDate,
  getGameData
}
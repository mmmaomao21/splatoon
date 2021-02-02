const app = getApp()

const gameTypeMap={
  regular:'通常比赛',
  salmon:'鲑鱼打工',
  league:'联盟比赛',
  ranked:'真格比赛'
}

const stageNameMap={
  "Camp Triggerfish":'营地',
  "Moray Towers":'停车场',
  "Inkblot Art Academy":'海女美术大学',
  "New Albacore Hotel":'酒店',
  "Musselforge Fitness":'健身房',
  "Ancho-V Games":'游戏公司',
  "Starfish Mainstage":'野外音乐堂',
  "Humpback Pump Track":'赛车场',
  "Piranha Pit":'矿山',
  "Shellendorf Institute":'海洋博物馆',
  "Manta Maria":'玛丽亚轮船',
  "Arowana Mall":'商业街',
  "Walleye Warehouse":'仓库',
  "Snapper Canal":'河川',
  "Kelp Dome":'农园',
  "Sturgeon Shipyard":'造船厂',
  "Port Mackerel":'码头',
  "Blackbelly Skatepark":'滑板公园',
  "Skipper Pavilion":'神社',
  "The Reef":'寿司街',
  "MakoMart":'超市',
  "Goby Arena":'篮球场',
  "Wahoo World":'游乐场',
}

const formatDate = (str) => {
  let time = new Date(str * 1000);
  return `${((time.getMonth() + 1))}/${(time.getDate())} ${("0" + time.getHours()).slice(-2)}:00`;
}

const formatData=(res)=>{
    let target=res.map(item=>{
      return {
        ...item,
        'start_time':formatDate(item['start_time']),
        'end_time':formatDate(item['end_time']),
        'stage_a_name':stageNameMap[item['stage_a'].name],
        'stage_b_name':stageNameMap[item['stage_b'].name],
      }
    })

    return target;
}

const getGameData=(type,refresh)=>{
  return new Promise((resolve, reject)=>{
    if (!app.globalData.gameData || refresh) {
      wx.showLoading({
        title: '加载中',
      })
      wx.request({
        url: 'https://splatoon2.ink/data/schedules.json',
        type: 'GET',
        success: (res) => {
        wx.hideLoading();
        wx.stopPullDownRefresh();

          if (res.statusCode === 200) {
            let target = res.data;
            app.globalData.gameData = target;
            resolve(formatData(target[type]))
          }
        },
        error:()=>{
          wx.hideLoading();
        wx.stopPullDownRefresh();

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
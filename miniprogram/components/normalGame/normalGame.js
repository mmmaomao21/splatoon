const FATAL_REBUILD_TOLERANCE = 10
const SETDATA_SCROLL_TO_BOTTOM = {
  scrollTop: 100000,
  scrollWithAnimation: true,
}
const app = getApp()

Component({
  properties: {
    type: String,
  },

  data: {
    gameDataList: []
  },

  lifetimes: {
    attached() {
      if (!app.globalData.gameData) {
        wx.request({
          url: 'https://splatoon2.ink/data/schedules.json',
          type: 'GET',
          success: (res) => {
            if (res.statusCode === 200) {
              let target = res.data;
              // const formatDate = (str) => {
              //   let time = new Date(str * 1000);
              //   return `${("0" + (time.getMonth() + 1)).slice(-2)}/${("0" + time.getDate()).slice(-2)} ${("0" + time.getHours()).slice(-2)}:00`;
              // }
              // target.details.forEach(item => {
              //   item['startTimeFormat'] = formatDate(item['start_time']);
              //   item['endTimeFormat'] = formatDate(item['end_time']);
              // })

              // target.schedules.forEach(item => {
              //   item['startTimeFormat'] = formatDate(item['start_time']);
              //   item['endTimeFormat'] = formatDate(item['end_time']);
              // })
              app.globalData.gameData = target;
              this.setData({
                gameDataList: target[this.properties.type]
              })
            }
          }
        })
      } else {
        this.setData({
          gameDataList: app.globalData.gameData[this.properties.type]
        })
      }
    }
  },


  methods: {


  }


})

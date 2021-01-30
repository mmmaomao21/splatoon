const utils = require('../../utils/utils');
const app = getApp()

Component({
  properties: {
    type: String,
  },

  data: {
    gameDataList: [],
    imgConstant: 'https://splatoon2.ink/assets/splatnet/'
  },

  lifetimes: {
    attached() {
    }
  },

  pageLifetimes:{
    show(){

      const formatData=(res)=>{
        return res.map(item=>{
          return {
            ...item,
            'start_time':utils.formatDate(item['start_time']),
            'end_time':utils.formatDate(item['end_time']),
          }
        })
      }
      if (!app.globalData.gameData) {
        wx.request({
          url: 'https://splatoon2.ink/data/schedules.json',
          type: 'GET',
          success: (res) => {
            if (res.statusCode === 200) {
              let target = res.data;
              app.globalData.gameData = target;
              this.setData({
                gameDataList: formatData(target[this.properties.type])
              })
            }
          }
        })
      } else {
        this.setData({
          gameDataList: formatData(app.globalData.gameData[this.properties.type])
        })
      }
    }
  },


  methods: {


  }


})

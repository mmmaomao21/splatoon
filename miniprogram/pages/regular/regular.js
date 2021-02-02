const app = getApp()
const utils = require('../../utils/utils');
Page({
  data: {
    gameDataList:[]
  },

  onLoad: function (options){
    utils.getGameData('regular').then(res=>{
      this.setData({gameDataList:res})
    });
    // const formatData=(res)=>{
    //   return res.map(item=>{
    //     return {
    //       ...item,
    //       'start_time':utils.formatDate(item['start_time']),
    //       'end_time':utils.formatDate(item['end_time']),
    //     }
    //   })
    // }
    // if (!app.globalData.gameData) {
    //   wx.request({
    //     url: 'https://splatoon2.ink/data/schedules.json',
    //     type: 'GET',
    //     success: (res) => {
    //       if (res.statusCode === 200) {
    //         let target = res.data;
    //         app.globalData.gameData = target;
    //         this.setData({
    //           gameDataList: formatData(target[this.properties.type])
    //         })
    //       }
    //     }
    //   })
    // } else {
    //   this.setData({
    //     gameDataList: formatData(app.globalData.gameData[this.properties.type])
    //   })
    // }
  },
  onPullDownRefresh:function(){
    utils.getGameData('regular','refresh').then(res=>{
      this.setData({gameDataList:res})
    });
  },

})

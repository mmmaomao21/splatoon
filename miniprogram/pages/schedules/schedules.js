const app = getApp()
const utils=require('../../utils/utils');
Page({
  data: {
    type: '',
    result:null
  },

  onLoad: function (options) {

    this.setData({
      type: utils.gameTypeMap[options.type]
    })
    this.getGameData(options.type);
  },

  getGameData:function(type){
    let url=type==='salmon'?'https://splatoon2.ink/data/coop-schedules.json':'https://splatoon2.ink/data/schedules.json';

    wx.request({
      url: 'https://splatoon2.ink/data/coop-schedules.json',
      type:'GET',
      success:function(res){
        if(res.statusCode===200){
          this.setData({
            result:res.data
          })
          this.initPage(res.data)
        }
        console.log(res)
      }
    })

  },
  initPage:function(data){
    console.log(data);
  }
})

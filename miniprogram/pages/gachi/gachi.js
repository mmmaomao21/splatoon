const app = getApp()
const utils = require('../../utils/utils');
Page({
  data: {
    type: '',
    gameDataList: []
  },

  onLoad: function (options) {
    utils.getGameData('gachi').then(res => {
      this.setData({ gameDataList: res })
    });
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
  },
  onPullDownRefresh: function () {
    utils.getGameData('gachi', 'refresh').then(res => {
      this.setData({ gameDataList: res })
    });
  },

})

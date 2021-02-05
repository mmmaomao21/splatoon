const app = getApp()
const utils = require('../../utils/utils');
Page({
  data: {
    gameDataList: []
  },

  onLoad: function (options) {
    utils.getGameData('regular').then(res => {
      this.setData({ gameDataList: res })
    });
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
  },
  onPullDownRefresh: function () {
    utils.getGameData('regular', 'refresh').then(res => {
      this.setData({ gameDataList: res })
    });
  },
})

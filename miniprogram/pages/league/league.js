const app = getApp()
const utils = require('../../utils/utils');
Page({
  data: {
    type: '',
    Coop: {},
  },

  onLoad: function (options) {
    utils.getGameData('league').then(res => {
      this.setData({ gameDataList: res })
    });
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
  },
  onPullDownRefresh: function () {
    utils.getGameData('league', 'refresh').then(res => {
      this.setData({ gameDataList: res })
    });
  },
})

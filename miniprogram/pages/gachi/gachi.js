const app = getApp();
const utils = require("../../utils/utils");
Page({
  data: {
    type: '',
  },

  onLoad: function (options) {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
  },
  
})

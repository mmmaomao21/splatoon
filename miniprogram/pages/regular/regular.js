const app = getApp();
const utils = require("../../utils/utils");
Page({
  data: {
    gameDataList: [],
  },

  onLoad: function (options) {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ["shareAppMessage", "shareTimeline"],
    });
  },
});

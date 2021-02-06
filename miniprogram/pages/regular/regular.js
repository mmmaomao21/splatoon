const app = getApp();
const utils = require("../../utils/utils");
Page({
  data: {
  },

  onLoad: function (options) {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ["shareAppMessage", "shareTimeline"],
    });
  },
});

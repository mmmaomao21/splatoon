//index.js
const app = getApp()
const utils=require('../../utils/utils');

Page({
  data: {
    map:null
  },

  onLoad: function() {
    this.setData({
      map: utils.gameTypeMap
    })
  },


})

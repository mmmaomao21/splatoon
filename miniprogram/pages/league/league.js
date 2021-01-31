const app = getApp()
const utils = require('../../utils/utils');
Page({
  data: {
    type: '',
    Coop: {},
    imgConstant: 'https://splatoon2.ink/assets/splatnet/'
  },

  onLoad: function (options) {
    utils.getGameData('league').then(res=>{
      this.setData({gameDataList:res})
    });
   
  },
})

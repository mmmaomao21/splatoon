const app = getApp()
const utils = require('../../utils/utils');
Page({
  data: {
    type: '',
    Coop: {},
    imgConstant: 'https://splatoon2.ink/assets/splatnet/'
  },

  onLoad: function (options) {

    this.setData({
      type: utils.gameTypeMap[options.type]
    })
    this.getGameData(options.type);
  },

  getGameData() {
    wx.request({
      url: 'https://splatoon2.ink/data/coop-schedules.json',
      type: 'GET',
      success: (res) => {
        if (res.statusCode === 200) {
          let target = res.data;
          const formatDate = (str) => {
            let time = new Date(str * 1000);
            return `${("0" + (time.getMonth() + 1)).slice(-2)}/${("0" + time.getDate()).slice(-2)} ${("0" + time.getHours()).slice(-2)}:00`;
          }
          target.details.forEach(item => {
            item['startTimeFormat'] = formatDate(item['start_time']);
            item['endTimeFormat'] = formatDate(item['end_time']);
          })

          target.schedules.forEach(item => {
            item['startTimeFormat'] = formatDate(item['start_time']);
            item['endTimeFormat'] = formatDate(item['end_time']);
          })

          console.log(target);

          this.setData({
            Coop: target
          })
        }
      }
    })

  },
})

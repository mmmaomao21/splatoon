const app = getApp()
const utils = require('../../utils/utils');
Page({
  data: {
    type: '',
    Coop: {},
    imgConstant: 'https://splatoon2.ink/assets/splatnet',
    // imgConstant: '../..',
    gearImg:null
  },

  onLoad: function (options) {

    this.setData({
      type: utils.gameTypeMap[options.type]
    })
    this.getGameData(options.type);
  },

  getGameData() {
    const stageMap={
      'Spawning Grounds':'大坝',
      'Ruins of Ark Polaris':'方舟'
    }


    //timeline
    wx.showToast({title: '加载中', icon: 'loading'});
    wx.request({
      url: 'https://splatoon2.ink/data/coop-schedules.json',
      type: 'GET',
      success: (res) => {
        wx.hideToast();

        if (res.statusCode === 200) {
          let target = res.data;
          const formatDate = (str) => {
            let time = new Date(str * 1000);
            return `${("0" + (time.getMonth() + 1)).slice(-2)}/${("0" + time.getDate()).slice(-2)} ${("0" + time.getHours()).slice(-2)}:00`;
          }
          target.details.forEach(item => {
            item['startTimeFormat'] = formatDate(item['start_time']);
            item['endTimeFormat'] = formatDate(item['end_time']);
            item['stageName']=stageMap[item.stage.name];
          })

          target.schedules.forEach(item => {
            item['startTimeFormat'] = formatDate(item['start_time']);
            item['endTimeFormat'] = formatDate(item['end_time']);
          })

          this.setData({
            Coop: target
          })
        }
      }
    })

    // 打工奖励图片
    wx.request({
      url: 'https://splatoon2.ink/data/timeline.json',
      type: 'GET',
      success: (res) => {
        if (res.statusCode === 200) {
          this.setData({
            gearImg: res.data.coop['reward_gear'].gear.image
          })
        }
      }
    })
  },
})

const app = getApp()
const utils = require('../../utils/utils');
Page({
  data: {
    type: '',
    Coop: {},
    imgConstant: 'https://splatoon2.ink/assets/splatnet',
    gearImg:null,
    icloudPath:'cloud://master-2g7pj0ip716784f4.6d61-master-2g7pj0ip716784f4-1304928350'
  },

  onLoad: function (options) {

    this.setData({
      type: utils.gameTypeMap[options.type]
    })
    this.getGameData();
  },

  onPullDownRefresh:function(){
    this.getGameData()
  },

  getGameData() {
    const stageMap={
      'Spawning Grounds':'鲑来坝',
      'Ruins of Ark Polaris':'方舟',
      'Salmonid Smokeyard':'鲑鱼熏工坊',
      'Lost Outpost':'海上集落',
      'Marooner':'破船',
    }

    //timeline
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: 'https://splatoon2.ink/data/coop-schedules.json',
      type: 'GET',
      success: (res) => {
        wx.hideLoading();
        wx.stopPullDownRefresh();
        if (res.statusCode === 200) {
          let target = res.data;
          target.details.forEach(item => {
            item['startTimeFormat'] = utils.formatDate(item['start_time']);
            item['endTimeFormat'] = utils.formatDate(item['end_time']);
            item['stageName']=stageMap[item.stage.name];
            if(item.stage.name.indexOf('aroon')>0){
              item['stageName']='破船'
            }
            
          })

          target.schedules.forEach(item => {
            item['startTimeFormat'] = utils.formatDate(item['start_time']);
            item['endTimeFormat'] = utils.formatDate(item['end_time']);
          })

          this.setData({
            Coop: target
          })
        }
      },
      fail:()=>{
        wx.hideLoading()
        wx.stopPullDownRefresh()
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

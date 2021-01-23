const app = getApp()

Page({
  data: {
    type: '',
  },

  onLoad: function (options) {
    console.log(options)
    
    let typeMap={
      salmon:'打工'
    };

    this.setData({
      type: options.type
    })

    if (app.globalData.openid) {
      this.setData({
        openid: app.globalData.openid
      })
    }

    console.groupEnd()
  },
})

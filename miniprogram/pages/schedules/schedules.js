const app = getApp()

Page({
  data: {
    type: '',
    result:null
  },

  onLoad: function (options) {
    console.log(options)
    
    let typeMap={
      salmon:'打工'
    };

    this.setData({
      type: options.type
    })

    wx.request({
      url: 'https://splatoon2.ink/data/coop-schedules.json',
      type:'GET',
      success:function(res){
        if(res.statusCode===200){
          this.setData({
            result:res.data
          })
        }
        console.log(res)
      }
    })


  },
})

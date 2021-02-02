const utils = require('../../utils/utils');
const app = getApp()

Component({
  properties: {
    type: String,
    game:Array,
  },
  observers: {
    game: function (game) {
      if (!game.length) {
        return;
      }
      this.setData({
        gameDataList: this.data.showMore?game:game.slice(0,2)
      });
    },
  },

  data: {
    gameDataList: [],
    // imgConstant: 'https://splatoon2.ink/assets/splatnet/',
    imgConstant: '../..',
    showMore:false
  },

 

  lifetimes: {
    attached() {
    }
  },

  pageLifetimes:{
  },


  methods: {
    showMore:function(){
      this.setData({
        showMore:true,
        gameDataList:this.properties.game
      })
    },
    preview:function(event){
        console.log(event.currentTarget.dataset.src)
        let currentUrl = event.currentTarget.dataset.src
        wx.previewImage({
          current: currentUrl, // 当前显示图片的http链接
          urls: [currentUrl] // 需要预览的图片http链接列表
        })
    }

  }


})

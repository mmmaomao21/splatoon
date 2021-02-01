const utils = require('../../utils/utils');
const app = getApp()

Component({
  properties: {
    type: String,
    game:Array,
  },
  observers: {
    game: function (game) {
      console.log(this.data);
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
    imgConstant: 'https://splatoon2.ink/assets/splatnet/',
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

  }


})

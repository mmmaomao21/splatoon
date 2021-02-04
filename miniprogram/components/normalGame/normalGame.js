const utils = require('../../utils/utils');
const app = getApp()

Component({
  properties: {
    type: String,
    game: Array,
  },
  observers: {
    game: function (game) {
      if (!game.length) {
        return;
      }
      this.setData({
        gameDataList: this.data.showMore ? game : game.slice(0, 2)
      });
    },
  },

  data: {
    gameDataList: [],
    imgConstant: 'https://splatoon2.ink/assets/splatnet',
    localPath:'../..',
    showMore: false,
    icloudPath: 'cloud://master-2g7pj0ip716784f4.6d61-master-2g7pj0ip716784f4-1304928350'
  },

  lifetimes: {
    attached() {
    }
  },

  pageLifetimes: {
  },

  methods: {
    showMore: function () {
      this.setData({
        showMore: !this.data.showMore,
      }, () => {
        this.setData({
          gameDataList: this.data.showMore ? this.properties.game : this.properties.game.slice(0, 2)
        })
      })
    },
    preview: function (event) {
      let currentUrl = event.currentTarget.dataset.src
      wx.previewImage({
        current: currentUrl, // 当前显示图片的http链接
        urls: [currentUrl] // 需要预览的图片http链接列表
      })
    }

  }
})

const utils = require("../../utils/utils");
const app = getApp();

Component({
  properties: {
    type: String,
  },
  data: {
    gameDataList: [],
    triggered: false,
    imgConstant: "https://splatoon2.ink/assets/splatnet",
    localPath: "../..",
    showMore: false,
    icloudPath:
      "cloud://master-2g7pj0ip716784f4.6d61-master-2g7pj0ip716784f4-1304928350",
      showError:false
  },

  lifetimes: {
    attached: function() {
      this.getGameData(this.properties.type);
    },
  },

  pageLifetimes: {
   
  },

  methods: {
    showMore: function () {
      this.setData(
        {
          showMore: !this.data.showMore,
        },
        () => {
          let curGame = this.formatData(app.globalData.gameData[this.properties.type]);
          this.setData({
            gameDataList: this.data.showMore ? curGame : curGame.slice(0, 2),
          });
        }
      );
    },
    preview: function (event) {
      let currentUrl = event.currentTarget.dataset.src;
      wx.previewImage({
        current: currentUrl, // 当前显示图片的http链接
        urls: [currentUrl], // 需要预览的图片http链接列表
      });
    },
    getGameData: function (type, refresh) {
    this.setData({showError:false});
      if (!app.globalData.gameData || refresh) {
        wx.showLoading({
          title: "加载中",
        });
        wx.request({
          url: "https://splatoon2.ink/data/schedules.json",
          type: "GET",
          success: (res) => {
            wx.hideLoading();
            this.setData({
              triggered: false,
            });

            if (res.statusCode === 200) {
              let target = res.data;
              app.globalData.gameData = target;

              let data = this.formatData(target[type]);
              this.setData({
                gameDataList: this.data.showMore ? data : data.slice(0, 2),
              });
            }
          },
          fail: () => {
            wx.hideLoading();
            this.setData({
              triggered: false,
              showError:true
            });
          },
        });
      } else {
        let target = this.formatData(app.globalData.gameData[type]);
        this.setData({
          gameDataList: this.data.showMore ? target : target.slice(0, 2),
        });
      }
    },

    formatData: function (res = []) {
      let target = res.map((item) => {
        return {
          ...item,
          start_time: utils.formatDate(item["start_time"]),
          end_time: utils.formatDate(item["end_time"]),
          stage_a_name: utils.stageNameMap[item["stage_a"].name],
          stage_b_name: utils.stageNameMap[item["stage_b"].name],
          gameMode: utils.modeMap[item.rule.key],
        };
      });

      return target;
    },

    onRefresh() {
      this.getGameData(this.properties.type, "refresh");
    },
  },
});

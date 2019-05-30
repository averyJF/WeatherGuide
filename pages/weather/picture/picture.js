//引入常量文件
let constant = require('../../../js/constant.js');
//公共方法文件
let avery = require('../../../js/avery.js');
Page({
  data: {
    p24Title: '',
    p24Pic: '',
    p24OnShow: true,
    p48Title: '',
    p48Pic: '',
    p48OnShow: false,
    p72Title: '',
    p72Pic: '',
    p72OnShow: false,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let avary = this;
    wx.request({
      url: constant.weatherMap,
      success: function(res) {
        let ps = res.data.data;
        console.log(ps)
        for (let j = 0; ps[j] != null; j++) {
          let po = ps[j];
          if (po.title == '24小时') {
            avary.setData({
              p24Title: po.title,
              p24Pic: po.pic,
              p24OnShow: true,
            });
          } else if (po.title == '48小时') {

            avary.setData({
              p48Title: po.title,
              p48Pic: po.pic,
              p48OnShow: false,
            });
          } else {
            avary.setData({
              p72Title: po.title,
              p72Pic: po.pic,
              p72OnShow: false,
            });
          }

        }

      }
    })

  },
  onPTap: function(event) {
    let avary = this;
    let title = event.target.dataset.title;
    let pic = event.target.dataset.pic;
    if (title == '24小时') {
      avary.setData({
        p24OnShow: true,
        p48OnShow: false,
        p72OnShow: false,
      });
    } else if (title == '48小时') {
      avary.setData({
        p24OnShow: false,
        p48OnShow: true,
        p72OnShow: false,
      });
    } else {
      avary.setData({
        p24OnShow: false,
        p48OnShow: false,
        p72OnShow: true,
      });
    }
    console.log(title)
  }

})
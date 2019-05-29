//index.js
//获取应用实例
const app = getApp()
var multiplyBy2 = require('../components/common/main')
Page({
  data: {
    motto: 'Hello Worlderr',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onMyEvent: function(e) {
    console.log(e.detail,e,'值'); // 获取子组件传给父组件的值
    this.selectComponent('.page-component')._onlist() // 调取子组件里的方法和属性
  },
  touchstartay: function(event) {
    console.log(event,'event');
  },
  request: function() {
    wx.request({
      url: 'https://easy-mock.com/mock/5cda52a3ae238e6feb61eb9b/example/ay/explote', //仅为示例，并非真实的接口地址
      data: {},
      methods:'get',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
      }
    })
  },
  clickMe: function() {
    // wx.scanCode({
    //   success: (res) => {
    //     console.log(res)
    //   }
    // })
    this.setData({motto: '引入了'+multiplyBy2(4)})
  },
  swiper:function(){
    wx.navigateTo({
      url: '../swip/index'
    })
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function (option) {
    console.log(option,'option');
    console.log(789,'explotone');
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})

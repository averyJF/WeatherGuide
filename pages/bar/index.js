//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    // 页面的初始数据
    motto: 'Hello Worlderr',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    routeurl: '../components/common/route1.jpg'
  },
  clickMe: function() {
    wx.navigateTo({
      url: '../explotone/explotone'
    })
    // this.setData({motto: '点击了我'})
  },
  //事件处理函数
  bindViewTap: function() {
    //小程序宿主环境限制了这个页面栈的最大层级为10层 
    // wx.navigateBack() 可以退出当前页面栈的最顶上页面
    //使用wx.redirectTo({ url: 'pageE' }) 是替换当前页变成pageE
    // 我们可以在刚刚的例子所在的页面栈中使用wx.switchTab({ url: 'pageF' })，此时原来的页面栈会被清空（除了已经声明为Tabbar页pageA外其他页面会被销毁），
    // wx.navigateTo和wx.redirectTo只能打开非TabBar页面，wx.switchTab只能打开Tabbar页面。
    // 我们还可以使用 wx. reLaunch({ url: 'pageH' }) 重启小程序，并且打开pageH，此时页面栈为 [ pageH ]
    //
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  //
  //
  //
  onLoad: function () {
    // 生命周期函数--监听页面加载，触发时机早于onShow和onReady
    console.log(123,'index');
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
  onShow: function() {
    // 生命周期函数--监听页面显示，触发事件早于onReady
   },
  onReady: function() { 
    // 生命周期函数--监听页面初次渲染完成
  },
  onHide: function() {
    // 生命周期函数--监听页面隐藏
   },
  onUnload: function() { 
    // 生命周期函数--监听页面卸载
  },
  onPullDownRefresh: function() { 
    // 页面相关事件处理函数--监听用户下拉动作
    // 监听用户下拉刷新事件，需要在app.json的window选项中或页面配置page.json中设置enablePullDownRefresh为true。
    //当处理完数据刷新后，wx.stopPullDownRefresh可以停止当前页面的下拉刷新。
  },
  onReachBottom: function() {
    // 页面上拉触底事件的处理函数
    //监听用户上拉触底事件。可以在app.json的window选项中或页面配置page.json中设置触发距离onReachBottomDistance。在触发距离内滑动期间，本事件只会被触发一次。
   },
  onShareAppMessage: function () { 
    // 用户点击右上角转发
    // 只有定义了此事件处理函数，右上角菜单才会显示“转发”按钮，在用户点击转发按钮的时候会调用，此事件需要return一个Object，包含title和path两个字段，用于自定义转发内容，如代码清单3-13所示。
    return {
      title: '自定义转发标题',
      path: '/page/logs?id=123'
    }
  },
  onPageScroll: function() {
    // 页面滚动触发事件的处理函数
    // 监听用户滑动页面事件，参数为 Object，包含 scrollTop 字段，表示页面在垂直方向已滚动的距离（单位px）。
   }
})

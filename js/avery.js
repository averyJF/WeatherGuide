//引入常量文件
let constant = require('../js/constant.js');
//校验位置权限是否打开
function checkPositionAuthorization() {
  //选择位置，需要用户授权
  wx.getSetting({
    success(res) {
      if (!res.authSetting['scope.userLocation']) {
        wx.authorize({
          scope: 'scope.userLocation',
          success() {
            wx.showToast({
              title: '授权成功！',
              duration: 1500
            })
          },
          fail() {
            that.showSettingToast('需要授权位置信息');
          }
        })
      }
    }
  })
};
// 打开权限设置页提示框
function showSettingToast(e) {
  wx.showModal({
    title: '提示！',
    confirmText: '去设置',
    showCancel: false,
    content: e,
    success: function (res) {
      if (res.confirm) {
        //调用微信设置页面重新获取位置权限
        wx.openSetting();
      }
    }
  })
};

function getWeatherNow( city,cityCode ,latitude, longitude){
    wx.request({
      url: constant.currentWeatherByCityId + cityCode,
      success:function(data){
        wx.setStorageSync('weatherNow', data.data);
        console.log(JSON.stringify(data.data))
      }
    })
};

module.exports = {
  //获取地图位置信息常量KEY  秘密 不要外漏
  showSettingToast: showSettingToast,
  //获取天气信息接口
  checkPositionAuthorization: checkPositionAuthorization,
  //获取今天天气信息
  getWeatherNow: getWeatherNow
  
}
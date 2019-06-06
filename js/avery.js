//引入常量文件
let constant = require('../js/constant.js');
//引入腾讯地图 
let QQMapWX = require('../js/qqmap-wx-jssdk.js');
//腾讯地图全局API
let qqmapsdk;
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
    success: function(res) {
      if (res.confirm) {
        //调用微信设置页面重新获取位置权限
        wx.openSetting();
      }
    }
  })
};

let getImgInfo = (config) => {
  return new Promise((resolve, reject) => {
    wx.getImageInfo({
      src: config.src,
      success: (res) => {
        config.src = res.path
        resolve(config)
      },
      fail: () => {

      }
    })
  })
}
// let getWeatherNow = ( city,cityCode ,latitude, longitude)=>{
//     return new Promise((resolve,reject) => {
//         wx.request({
//         url: constant.currentWeatherByCityId + cityCode,
//         success:function(data){
//             wx.setStorageSync('weatherNow', data.data);
//             resolve(city,cityCode ,latitude, longitude)
//             console.log(JSON.stringify(data.data))
//         }
//     })
// })
// };
let getWeatherNow = (config) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: constant.currentWeatherByCityId + config.cityCode,
      success: function(data) {
        wx.setStorageSync('weatherNow', data.data);
        resolve(config)
        //console.log(JSON.stringify(data.data))
      }
    })
  })
};

let getLocation = (config) => {
  return new Promise((resolve, reject) => {
    wx.getLocation({
      type: 'wgs84', //wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
      altitude: true, //传入 true 会返回高度信息
      success: function(res) {
        const latitude = res.latitude
        const longitude = res.longitude
        config.setData({
            latitude: latitude,
            longitude: longitude
          }),
          console.log(latitude, longitude)

          // 实例化API核心类
          qqmapsdk = new QQMapWX({
            key: constant.mapKey
          });
        //获取位置详细信息
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: latitude,
            longitude: longitude
          },
          success: function(location) {
            let result = location.result;
            //获取地址信息
            let addressComponent = result.address_component;
            //获取城市Code
            let cityCode = result.ad_info.city_code;
            var cityInfo = {
              nation: addressComponent.nation,
              province: addressComponent.province,
              city: addressComponent.city,
              district: addressComponent.district,
              street: addressComponent.street,
              streetNumber: addressComponent.street_number,
              cityCode: cityCode,
            }
            console.log(cityInfo)
            //给默认值初始化
            config.setData({
              addressComponent: cityInfo
            });
            //将城市信息放入缓存经度纬度
            wx.setStorageSync('cityInfo', cityInfo);
            // city,cityCode ,latitude, longitude
            let obj = {
              city: '',
              cityCode: cityCode,
              latitude: latitude,
              longitude: longitude
            }
            Promise.all([getWeatherNow(obj)]).then((res) => {
               config.setData({
                 weatherNow: wx.getStorageSync("weatherNow")
               })
                //console.log(JSON.stringify());
              })
            resolve(config)
            //console.log(JSON.stringify(that.data.addressComponent));
          },
          fial(res) {
            //失败应该弹出模态框
            wx.showModal({
              title: '提示',
              content: '获取位置信息失败',
              success(res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            });
          }
        });
      }
    });
  })
};

module.exports = {
  //获取地图位置信息常量KEY  秘密 不要外漏
  showSettingToast: showSettingToast,
  //获取天气信息接口
  checkPositionAuthorization: checkPositionAuthorization,
  //获取用户位置授权信息
  getLocation: getLocation

}


/**当前天气数据对应字段
 * date	日期
 * week	星期
 * update_time	气象台更新时间
 * wea	天气情况
 * tem	当前温度
 * air	空气质量
 * air_pm25	PM2.5
 * air_level	空气质量等级
 * humidity	湿度
 * visibility	能见度
 * pressure	气压hPa
 * win	风向
 * win_speed	风速等级
 * win_meter	风速 如: 12km/h
 * 
 * 
 * 
 * 



wea_img	天气对应图标(xue, lei, shachen, wu, bingbao, yun, yu, yin, qing)




air_tips	空气质量描述





alarm	预警信息
┗ alarm_type	预警类型
┗ alarm_level	预警级别
┗ alarm_content	预警信息
 * 
 * 
 */
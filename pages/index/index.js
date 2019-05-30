//引入常量文件
let constant = require('../../js/constant.js');
//引入腾讯地图 
let QQMapWX = require('../../js/qqmap-wx-jssdk.js');
//公共方法文件
let avery = require('../../js/avery.js');
//腾讯地图全局API
let qqmapsdk;
//获取应用实例
const app = getApp();

Page({
  data: {
    imgUrls: [
      'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
      'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
      'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'
    ],
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    hasUserInfo: false,
    latitude: null, //纬度
    longitude: null, //经度
    addressComponent: {
      nation: "",
      province: "",
      city: "",
      district: "",
      street: "",
      streetNumber: "",
      cityCcode: ""
    }
  },
  onLoad: function() {
    wx.clearStorage();
    //校验用户是否打开维护权限
    avery.checkPositionAuthorization();
    //初始化调用是否获取用户位置权限信息
    this.getLocation(this);
  },
  //获取位置名称
  getLocation(that) {
    wx.getLocation({
      type: 'wgs84', //wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
      altitude: true, //传入 true 会返回高度信息
      success: function (res) {
        const latitude = res.latitude
        const longitude = res.longitude
        that.setData({
          latitude: latitude,
          longitude: longitude
        }),
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
          success: function (location) {

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
              cityCcode: addressComponent.cityCcode,
            }
            //给默认值初始化
            that.setData({
              addressComponent: cityInfo
            });
            //将城市信息放入缓存经度纬度
            wx.setStorageSync('cityInfo', cityInfo);
            wx.setStorageSync('latitude', latitude);
            wx.setStorageSync('longitude', longitude);
            avery.getWeatherNow('北京市', cityCode,'342','423423');
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
  },

})
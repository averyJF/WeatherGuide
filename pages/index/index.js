//引入常量文件
let constant = require('../../js/constant.js');
//引入腾讯地图 
let QQMapWX = require('../../js/qqmap-wx-jssdk.js');
//公共方法文件
let avery = require('../../js/avery.js');

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
    
    //校验用户是否打开维护权限
    avery.checkPositionAuthorization();
    //初始化调用是否获取用户位置权限信息
    Promise.all([avery.getLocation(this)]);
     
    
  }
})
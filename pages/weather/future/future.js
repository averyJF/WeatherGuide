//引入常量文件
let constant = require('../../../js/constant.js');

Page({

  data:{

  },

  onLoad: function(){
      let avery=this;
      //获取未来一周天气信息
      let cityInfo = wx.getStorageSync("cityInfo");
      if( cityInfo !=  null ){
        //获取当前位置的七天天气信息
        wx.request({
          url: constant.futureWeatherByCityId + cityInfo.cityCode,
          success:function(res){
            
            avery.setData({
              //未来七天天气
              futureWeather: res.data.data,
              //城市信息
              cityInfo: cityInfo
            })
            console.log(res.data.data)

          },
          fail:function(){

          }
        })
      }
     
  }

})
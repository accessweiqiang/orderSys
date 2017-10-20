//index.js
//获取应用实例
var app = getApp();
var util = require("../../utils/util.js");
Page({
  data: {
    storeInfo: {
    },
    todayOrderNum:"",
    todayIncom:"",
  },
  //https://www.wendin.cn/dcb/wxrestaurant.do?getMyRestaurant&sessionId=8874429239226273254
  //获取餐馆信息
  getMyRestaurant:function(){
    var that = this;
    wx.request({
      url: 'https://www.wendin.cn/dcb/wxrestaurant.do?getMyRestaurant',
      data: { sessionId: app.globalData.sessionId},
      method:'POST',
      header:{
        'content-type':"application/x-www-form-urlencoded"
      },
      success:function(res){
        console.log(res);
        var data = res.data.attributes;
        var environments = data.environments;
        var photo = "/images/page/store-img.png";
        if (environments){
           photo = 'https://www.wendin.cn/dcb/wxfile.do?showOrDownByurl&filePath=' + environments + '&sessionId=' + app.globalData.sessionId
        }
        that.setData({
          storeInfo: data,
          photo
        });
        app.globalData.storeInfo=data;
      }
    })
  },
  getTodayOrder: function () {
    var that = this;
    wx.showLoading({
      title: '加载中',
    })
    var date = new Date();
    var timeStart = util.formatDate(date) + " :00:00:00";
    var timeEnd = util.formatDate(date) + " :23:59:59";
    wx.request({
      url: "https://www.wendin.cn/dcb/wxorder.do?findByPro&sessionId=" + app.globalData.sessionId,
      method: 'POST',
      header: {
        'content-type': "application/x-www-form-urlencoded"
      },
      data: {
        timeStart,
        timeEnd
      },
      complete: function () {
        wx.hideLoading();
      },
      success: function (res) {
        console.log(res)
        var data = res.data;
        if (!data.success) {
          wx.showModal({
            title: '提示',
            content: data.msg,
            showCancel: false
          })
        } else {
          var todayOrder = data.attributes.orders;
          var todayIncom = 0;
          var length = todayOrder.length;
          for (var i = 0; i < length;i++){
            var item = todayOrder[i];
            if (item.status == 7 || item.status == 8 || item.status == 5){
              todayIncom += item.factPrice;
            }
          }
          that.setData({
            todayOrderNum: length,
            todayIncom: todayIncom
          });
          app.globalData.todayOrder = todayOrder;
        }
      }
    })
  },
  //事件处理函数
  swiperchange: function (e) {
    that.setData({
      swiperCurrent: e.detail.current
    })
  },
  onShow: function () {
    this.getMyRestaurant();
    this.getTodayOrder();
  },
  onLoad: function () {
    
  }
})

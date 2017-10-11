//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    loadingHidden: false, // loading
    storeInfo: {
      name: "蜗牛店铺",
      introduce: "很好吃很啊华东师范很好吃很啊华东师范",
      photo: "https://img.meituan.net/msmerchant/b60ca34725098c2510d9942ae34675ae417400.jpg@750w_320h_1e_1c",
      expire: '201',
      qr: "../../images/qr.png"
    },
    todayInfo: {
      order: 100,
      turnover: 5000
    },
    swiperCurrent: 0,
    selectCurrent: 0
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
        that.setData({
          storeInfo: data
        });
        app.globalData.storeInfo=data;
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

  },
  onLoad: function () {
    this.getMyRestaurant()
  }
})

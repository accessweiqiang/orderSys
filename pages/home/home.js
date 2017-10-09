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
  //事件处理函数
  swiperchange: function (e) {
    //console.log(e.detail.current)
    this.setData({
      swiperCurrent: e.detail.current
    })
  },
  doLogin:function(code){
   
  },
  onShow: function () {
    console.log(99)
  },
  onLoad: function () {
    

  }
})

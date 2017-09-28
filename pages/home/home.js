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
  toDetailsTap: function (e) {
    wx.navigateTo({
      url: "/pages/goods-details/index?id=" + e.currentTarget.dataset.id
    })
  },
  tapBanner: function (e) {
    if (e.currentTarget.dataset.id != 0) {
      wx.navigateTo({
        url: "/pages/goods-details/index?id=" + e.currentTarget.dataset.id
      })
    }
  },
  bindTypeTap: function (e) {
    this.setData({
      selectCurrent: e.index
    })
  },
  doLogin:function(code){
    wx.request({
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      url: 'https://www.wendin.cn/dcb/wxauthenticate.do?onLogin&code=' + code,
      success:function(res){
  console.log(res)
      }
    })
  },
  onLoad: function () {
    var that = this;
    wx.login({
      success: function (res) {
        if (res.code) {
          //发起网络请求
          console.log(res.code);
          
    
          
          wx.getUserInfo({
            withCredentials:true,
            success: function (res) {
              console.log(res)
              that.setData(
                { test: 1 }
              )
            },fail:function(res){
              console.log(res)
              that.setData(
                {test:0}
              )
            }
          })
          
         // that.doLogin(res.code)
          
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });
    /*
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
    */
    /* wx.request({
       url: 'https://api.it120.cc/' + app.globalData.subDomain + '/banner/list',
       data: {
         key: 'mallName'
       },
       success: function (res) {
         if (res.data.code == 404) {
           wx.showModal({
             title: '提示',
             content: '请在后台添加 banner 轮播图片',
             showCancel: false
           })
         } else {
           that.setData({
             banners: res.data.data
           });
         }
       }
     })
 
   //https://www.wendin.cn/dcb/wxwithdrawRecord.do?apply&sessionId=43892
 
     wx.request({
       url: 'https://www.wendin.cn/dcb/wxwithdrawRecord.do?apply&sessionId=43892',
       success: function (res) {
         console.log(res)
       }
     })
     */

  }
})

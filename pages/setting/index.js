// pages/setting/index.js
var util = require('../../utils/util.js')

var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    photo: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3054320777,3640847721&fm=27&gp=0.jpg',
    hangye: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3523986493,13298610&fm=27&gp=0.jpg',
    zhizhao: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1508123660&di=1b6ce4bfc1a1a5ce026c2f2ce9c5afd4&imgtype=jpg&er=1&src=http%3A%2F%2Fdocs.ebdoor.com%2FImage%2FCompanyCertificate%2F12%2F126651.jpg',
    storeInfo:{

    }

  },
  viewPhoto: function (e) {
    var src = e.currentTarget.dataset.src || "/images/icon/default.png";
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: [src] // 需要预览的图片http链接列表
    })
  },
  toEditBaseInfo:function(){
    var query = util.obj2query(this.data.storeInfo);
    wx.navigateTo({
      url: '/pages/setting-baseInfo/index?' + query,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'https://www.wendin.cn/dcb/wxrestaurant.do?getMyRestaurant',
      data: { sessionId: app.globalData.sessionId },
      method: 'POST',
      header: {
        'content-type': "application/x-www-form-urlencoded"
      },
      success: function (res) {
        console.log(res);
        var data = res.data.attributes;
        that.setData({
          storeInfo: data
        });
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log(99)
  }

})
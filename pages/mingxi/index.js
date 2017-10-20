var util = require('../../utils/util.js')
var app = getApp();
Page({
  data: {
    orderList: []
  },
  bindTimeStart: function (e) {
    this.setData({
      timeStart: e.detail.value
    })
  },
  bindTimeEnd: function (e) {
    this.setData({
      timeEnd: e.detail.value
    })
  },
  search: function () {
    var that = this;
    wx.showLoading({
      title: '加载中',
    })
    var timeStart = this.data.timeStart + " :00:00:00";
    var timeEnd = this.data.timeEnd + " :23:59:59";
    var status = 8;
    wx.request({
      url: "https://www.wendin.cn/dcb/wxorder.do?findByPro&sessionId=" + app.globalData.sessionId,
      method: 'POST',
      header: {
        'content-type': "application/x-www-form-urlencoded"
      },
      data: {
        timeStart,
        timeEnd,
        status
      },
      complete: function () {
        wx.hideLoading();
      },
      success: function (res) {
        var data = res.data;
        if (!data.success) {
          wx.showModal({
            title: '提示',
            content: data.msg,
            showCancel: false
          })
        } else {
          var orderList = data.attributes.orders;
          that.setData({
            orderList
          });
        }
      }
    })
  },
  onShow: function () {
    var date = new Date();
    var timeStart = util.formatDate(date)
    var timeEnd = util.formatDate(date)
    this.setData({
      timeStart,
      timeEnd
    })
    // 获取订单列表
    this.search();
  }
})
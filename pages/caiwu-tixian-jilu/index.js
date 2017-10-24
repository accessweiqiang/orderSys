// pages/caiwu-tixian-jilu/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  list:[]
  },
  getList: function (options) {
    wx.showLoading({
      title: '获取提现记录',
    })
    var that = this;
    wx.request({
      url: "https://www.wendin.cn/dcb/wxwithdrawRecord.do?getByRestaurantNo&pageNum=1&pageSize=1000&restaurantNo=" + app.globalData.storeInfo.no + "&sessionId=" + app.globalData.sessionId,
      method: 'POST',
      header: {
        'content-type': "application/x-www-form-urlencoded"
      },
      complete: function () {
        wx.hideLoading();
      },
      success: function (res) {
        var data = res.data;
        if (!data.success) {
          wx.hideLoading();
          wx.showModal({
            title: '提示',
            content: data.msg,
            showCancel: false
          })
        } else {
          that.setData({
            list: data.obj
          })
        }
      }
    })
  },
  onShow: function () {
    this.getList();
  }
})
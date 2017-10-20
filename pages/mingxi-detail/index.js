// pages/mingxi-detail/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order:{}
  },
  getOrder: function (id) {
    var that = this;
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: "https://www.wendin.cn/dcb/wxorder.do?findByPro&sessionId=" + app.globalData.sessionId,
      method: 'POST',
      header: {
        'content-type': "application/x-www-form-urlencoded"
      },
      data: {
        id
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
          var order = data.attributes.orders[0];
          var orderDetailEntitys = order.orderDetailEntitys;
          var detail =[];
          for (var i = 0; i < orderDetailEntitys.length; i++) {
            var item = orderDetailEntitys[i];
            var t = item.goodsName + ":¥" + item.factPrice+  "x" + item.goodsNum;
            detail.push(t)
          }
          detail = detail.join(",");
          order.detail = detail;
          that.setData({
            order
          })
        }
      }
    })
  },
  onLoad: function (options) {
    var id = options.id;
    this.setData({
      id
    })
  },
  onShow: function () {
    var id = this.data.id;
    this.getOrder(id)
  }  
})
var app = getApp()
var util = require("../../utils/util.js");
/*
首先下单（未处理），   1
支付时（支付中），3
支付 完（支付成功，待处理），5
支付失败（支付失败），6
商家看到订单（处理中），7
商品上桌，（处理完成），8
1 ，3 ，5 ，6 的状态系统自动维护，前台
要维护的状态为7 ，8
*/
Page({
  data: {
    orderList: null
  },
  orderDetail: function (e) {
    var orderId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: "/pages/order-detail/index?id=" + orderId
    })
  },

  getList: function () {
    var that = this;
    wx.showLoading({
      title: '加载中',
    })
    var date = new Date();
    var timeStart = util.formatDate(date)+" :00:00:00";
    var timeEnd = util.formatDate(date) + " :23:59:59";
    wx.request({
      url: "https://www.wendin.cn/dcb/wxorder.do?findByPro&sessionId=" + app.globalData.sessionId,
      method: 'POST',
      header: {
        'content-type': "application/x-www-form-urlencoded"
      },
      data:{/*
        timeStart,
        timeEnd,*/
        status:1
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
          that.setData({
            orderList:data.attributes.orders
          })
        }
      }
    })
  },
  onShow: function () {
    // 获取订单列表
    this.getList();
  }
})
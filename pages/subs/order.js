var app = getApp()
var sessionId = '';
var cartTotal = [];
var shopId = 'shop-1';
wx.getStorage({
  key: 'code',
  success: function (res) {
    sessionId = res.data;
  }
})
Page({
  data: {
  orderList:[], 
  },
  onLoad: function (options) {
    this.popPay();
  },
  popPay: function () {
    var that = this;
    wx.request({
      header: {
        'content-type': "application/json"
      },
      url: "https://www.wendin.cn/dcb/wxorder.do?findByPro&sessionId=" + sessionId + "&restaurantNo=" + shopId,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      success: function (resp) {
        that.setData({
          orderList: resp.data.attributes.orders,
        })
      },
      fail: function () {
        console.log("fail")
      },
      complete: function () {
      }
    })
  },
  deleteOrder: function (event) {
    var orderId = event.currentTarget.dataset.orderid;
    wx.request({
      header: {
        'content-type': "application/json"
      },
      url: "https://www.wendin.cn/dcb/wxorder.do?doBatchDel&sessionId=" + sessionId + "&ids=" + orderId,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      success: function (resp) {
        console.log(resp);
      },
      fail: function () {
        console.log("fail")
      },
      complete: function () {
      }
    })
  }
})


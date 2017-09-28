var wxpay = require('../../utils/pay.js')
var app = getApp()
Page({
  data: {
    statusType: ["已完成", "已关闭"],
    currentType: 0,
    tabClass: ["", "",],
    orderList: null
  },
  statusTap: function (e) {
    var curType = e.currentTarget.dataset.index;
    this.data.currentType = curType
    this.setData({
      currentType: curType
    });
    this.onShow();
  },
  orderDetail: function (e) {
    var orderId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: "/pages/order-details/index?id=" + orderId
    })
  },
  onLoad: function (options) {
    // 生命周期函数--监听页面加载

  },
  onReady: function () {
    // 生命周期函数--监听页面初次渲染完成

  },
  onShow: function () {
    // 获取订单列表

    this.setData({
      orderList: [
        { "dateAdd": "2018-9-9", "statusStr": "已完成", "status": -1, "orderNumber": "FF1245454", "customer": "魏强", "pic": "https://img.meituan.net/msmerchant/b60ca34725098c2510d9942ae34675ae417400.jpg@750w_320h_1e_1c", "tel": "18628977163" },
        { "dateAdd": "2018-9-9", "statusStr": "已关闭", "status": 1, "orderNumber": "FF1245454", "customer": "魏强", "pic": "http://p1.meituan.net/deal/e2f4eb1c2edd2fc2bc80783d4eeb42cc94206.jpg@180w_164h_1e_1c", "tel": "18628977163" }
      ]
    });

  },
  contact: function (e) {
    wx.makePhoneCall({
      phoneNumber: e.target.dataset.tel //仅为示例，并非真实的电话号码
    })
  },
  onHide: function () {
    // 生命周期函数--监听页面隐藏

  },
  onUnload: function () {
    // 生命周期函数--监听页面卸载

  },
  onPullDownRefresh: function () {
    // 页面相关事件处理函数--监听用户下拉动作

  },
  onReachBottom: function () {
    // 页面上拉触底事件的处理函数

  }
})
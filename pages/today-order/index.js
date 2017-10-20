var app = getApp();
var util = require("../../utils/util.js")
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
    var todayOrder = app.globalData.todayOrder;
    todayOrder.map(function(item){
      var statusText = util.getOrderStatus(item.status);
      item["statusText"] = statusText;
      return item;
    })
    this.setData({
      todayOrder: todayOrder
    });

  },
  contact:function(e){
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
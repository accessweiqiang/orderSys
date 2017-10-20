var util = require("../../utils/util.js");
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    incom:"--",
    list:[
      
    ]
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var orders = app.globalData.todayOrder;
    var list = orders.filter(function(item){
      var orderDetailEntitys = item.orderDetailEntitys;
      var detail = orderDetailEntitys.map(function(d){
        return d.goodsName + "x" + d.goodsNum;
      });
      detail = detail.join(",");
      item.detail = detail;
      return item;
    });
    list = list.filter((item) => { return item.status >= 5 && item.status!=6});
    this.setData({
      list
    })
  },
  onLoad:function(options){
    var incom = options.incom;
    this.setData({
      incom
    })
  }
})
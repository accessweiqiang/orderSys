var app = getApp();
var util = require("../../utils/util.js");
Page({
  data: {
    modalVisible:false,
    printItems: [
      { text: "前台", },
      { text: "后厨", }
    ], currentPrintItem: 0
  },
  selectPrint: function (e) {
    var index = e.currentTarget.dataset.index;
    this.setData({
      currentPrintItem: index
    });
  },
  ok: function () {
    this.setData(
      {

      }
    );
    this.hideModal();
  },
  showModal: function () {
    this.setData({
      modalVisible: true
    })
  },
  hideModal: function () {
    this.setData({
      modalVisible: false
    })
  },
  getData:function( id ){
    var that = this;
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: "https://www.wendin.cn/dcb/wxorder.do?findByPro&id=" + id + "&sessionId=" + app.globalData.sessionId,
      complete:function(){
        wx.hideLoading()
      },
      success:function(res){
        var data = res.data;
        console.log(res)
        if (data.success){
          var order = data.attributes.orders[0];
          var detail = order.orderDetailEntitys;
          var status = util.getOrderStatus(order.status+"");
          that.setData({
            order,
            detail,
            status
          })
        }else{
          wx.showModal({
            title: '提示',
            content: data.msg
          })
        }
      }
    })
  },
  onLoad: function (options) {
  console.log(options)
  var id = options.id;
  this.getData(id)
  }
})
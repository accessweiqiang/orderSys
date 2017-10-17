var app = getApp()
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
  add:function(){
    var order = {
      "factPrice": 20,
      "price": 20,
      "restaurantNo": "shop-1",//app.globalData.storeInfo.no,
      "orderDetailEntitys": [{ "restaurantNo": "shop-1", "price": 10, "menubarId": "2c92d59e5f0f0ec9015f23f0c9f90019", "goodsName": "酸辣粉", "goodsPictures": "/20171016/tmp_2015555412o6zAJs60NkKjtJxyJMO7AucG3eNk43d5210ebad3d577b2c6c92bd20db96d.png", "detail": "好吃的酸酸的", "standard": "碗", "factPrice": 8, "goodsId": "2c92d59e5f0f0ec9015f247d6f3f002e", "goodsNum": 2 }]
    }
    // return;
    wx.request({
      url: "https://www.wendin.cn/dcb/wxorder.do?doAdd&sessionId=" + app.globalData.sessionId,
      method: 'POST',
      header: {
        //'content-type': "application/x-www-form-urlencoded"
        'content-type': "application/json"
      },
      data: order,
      success: function (res) {
        console.log(res)
      }

    })
  },
  getList: function () {
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: "https://www.wendin.cn/dcb/wxorder.do?findByPro&sessionId=" + app.globalData.sessionId,
      method: 'POST',
      header: {
        'content-type': "application/x-www-form-urlencoded"
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

        }
      }
    })
  },
  onShow: function () {
    // 获取订单列表
    this.getList();
    

  }
})
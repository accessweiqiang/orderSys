// pages/setupApp/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  test:function(){
    var id = "-5202244932725472329";
    var data = {
      price: 100,
      factPrice: 90,
      createTime:"2017-10-19 31:31:00",
      orderDetailEntitys: [
        {
          "factPrice": 90,
          "goodsId": "3",
          "price": 100,
          "goodsNum": 2,
          "goodsName": "瓜"
        }
      ]
    }
    wx.request({
      url: "https://www.wendin.cn/dcb/wxorder.do?doAdd&sessionId=-2911577489940500799",
      method: "post",
      data: data
    })
  },
  test2:function(){

  },
  onLoad: function (options) {
    app.login();
//this.test()

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
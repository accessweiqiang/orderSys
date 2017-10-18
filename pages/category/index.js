// pages/category/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items:[
      {}, {}, {}
    ],
    currentIndex:null,
    modalShow:false
  },

  bindSave: function (e) {
    var that = this;
    var name = e.detail.value.name;
    if (name == '') {
      wx.showToast({
        title: '所填内容不完整！',
        image: "/images/icon/fail.png"
      });
      return;
    }
    console.log(e.detail.value)
    var params = e.detail.value;
    wx.request({
      url: 'https://www.wendin.cn/dcb/wxmenubar.do?doAdd&no=' + app.globalData.storeInfo.no+'&sessionId=' + app.globalData.sessionId,
      data: params,
      method: 'POST',
      header: {
        'content-type': "application/x-www-form-urlencoded"
      },
      success: function (res) {
        if (!res.data.success) {
          wx.hideLoading();
          wx.showModal({
            title: '提示',
            content: res.data.msg,
            showCancel: false
          })
        } else {
          wx.showModal({
            title: '提示',
            content: res.data.msg,
            showCancel: false,
            success: function (res) {
              console.log(res)
              if (res.confirm) {
                that.hideModal();
              }
            }
          })
        }
      }
    })
  },
  showModal:function(){
    this.setData({
      modalShow:true
    })
  },
  hideModal: function () {
    this.setData({
      modalShow: false
    })
  },
  select:function(e){
    var index = e.currentTarget.dataset.index;
    this.setData({
      currentIndex:index
    });
  
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
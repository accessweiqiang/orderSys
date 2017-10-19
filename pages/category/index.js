// pages/category/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
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
    var params = e.detail.value;
    wx.showLoading();
    wx.request({
      url: 'https://www.wendin.cn/dcb/wxmenubar.do?doAdd&'+'&sessionId=' + app.globalData.sessionId,
      data: params,
      method: 'POST',
      header: {
        'content-type': "application/x-www-form-urlencoded"
      },
      complete:function(){
        wx.hideLoading();
      },
      success: function (res) {
        if (!res.data.success) {
          wx.showModal({
            title: '提示',
            content: res.data.msg,
            showCancel: false
          });
        } else {
          wx.showModal({
            title: '提示',
            content: res.data.msg,
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                that.hideModal();
                that.getList();                          
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
  getList:function(){
    var that = this;
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: 'https://www.wendin.cn/dcb/wxmenubar.do?findByPro&sessionId=' + app.globalData.sessionId,
      method: 'POST',
      header: {
        'content-type': "application/x-www-form-urlencoded"
      },
      complete:function(){
        wx.hideLoading()
      },
      success: function (res) {
        console.log("分类列表",res);
        var data = res.data
        if(data.success){
          that.setData({
            list: data.attributes.menus
          })
        }else{
          wx.showModal({
            title: '提示',
            content: data.msg,
            showCancel:false,
            
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getList();
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
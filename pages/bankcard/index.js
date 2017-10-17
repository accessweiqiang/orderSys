// pages/bankcard/index.js
var util = require('../../utils/util.js')
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [

    ]
  },

  /**
   * 生命周期函数--监听页面显示
   */
  getList: function () {
    var that = this;
    wx.request({
      url: "https://www.wendin.cn/dcb/wxbankcard.do?getByRestaurantNo&restaurantNo=" + app.globalData.storeInfo.no + "&sessionId=" + app.globalData.sessionId,
      method: 'POST',
      header: {
        'content-type': "application/x-www-form-urlencoded"
      },
      success: function (res) {
        console.log(res)
        var data = res.data;
        if (!data.success) {
          wx.hideLoading();
          wx.showModal({
            title: '提示',
            content: data.msg,
            showCancel: false
          })
        } else {
          that.setData({
            list: data.obj
          })
        }
      }
    })
  },
  toEdit: function (e) {
    var index = e.currentTarget.dataset.index;
    var item = this.data.list[index];
    var query = util.obj2query(item);
    wx.navigateTo({
      url: '/pages/bankcard-add/index?' + query,
    })
  },
  doDelete: function (id) {
    var that = this;
    wx.showLoading({
      title: '删除中',
    })
    wx.request({
      url: "https://www.wendin.cn/dcb/wxbankcard.do?deleteByIds&sessionId=" + app.globalData.sessionId,
      method: 'POST',
      header: {
        'content-type': "application/x-www-form-urlencoded"
      },
      data: { ids:id },
      complete: function () {
        wx.hideLoading()
      },
      success: function (res) {
        var data = res.data;
        if (data.success) {
          wx.showModal({
            title: '提示',
            content: '删除成功',
          });
          that.onShow();
        } else {
          wx.showModal({
            title: '提示',
            content: data.msg,
          })
        }
      }
    })
  },
  showDelete: function (e) {
    var name = e.currentTarget.dataset.name;
    var id = e.currentTarget.dataset.id;
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确定要删除:' + name,
      success: function (res) {
        if (res.confirm) {
          that.doDelete(id);
        }
      }
    })
  },
  onShow: function () {
    this.getList()
  }


})
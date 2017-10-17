// pages/shangpin/index.js
var app = getApp();
var util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentCategory: 0,
    currentCategoryId: "",
    category: [],
    list: [],
    sessionId: ""
  },
  categorySwitch: function (e) {
    console.log(e)
    var index = e.currentTarget.dataset.index;
    var id = e.currentTarget.dataset.id;
    this.setData({
      currentCategory: index,
      currentCategoryId: id
    })

  },
  getCategory: function () {
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
      complete: function () {
        wx.hideLoading()
      },
      success: function (res) {
        var data = res.data
        if (data.success) {
          var menus = data.attributes.menus;
          menus.unshift({ name: "全部" });
          that.setData({
            category: menus
          })
        } else {
          wx.showModal({
            title: '提示',
            content: data.msg,
            showCancel: false,

          })
        }
      }
    })
  },
  getList: function () {
    var that = this;
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: 'https://www.wendin.cn/dcb/wxgoods.do?findByPro&sessionId=' + app.globalData.sessionId,
      method: 'POST',
      header: {
        'content-type': "application/x-www-form-urlencoded"
      },
      complete: function () {
        wx.hideLoading()
      },
      success: function (res) {
        var data = res.data
        if (data.success) {
          that.setData({
            list: data.attributes.goodss
          })
        } else {
          wx.showModal({
            title: '提示',
            content: data.msg,
            showCancel: false,
          })
        }
      }
    })
  },
  toEdit: function (e) {
    console.log(e)
    var index = e.currentTarget.dataset.index;
    var item = this.data.list[index];
    var query = util.obj2query(item);
    console.log(query)
    wx.navigateTo({
      url: '/pages/shangpin-add/index?' + query,
    })
  },
  showDelete: function (e) {
    var that = this;
    var name = e.currentTarget.dataset.name;
    var id = e.currentTarget.dataset.id;
    wx.showModal({
      title: '提示',
      content: '确定删除：' + name,
      success: function (res) {
        if (res.confirm) {
          that.doDelte(id);
        } else if (res.cancel) {
        }
      }
    })
  },
  doDelte: function (id) {
    var that = this;
    wx.showLoading({
      title: '删除中...',
    })
    wx.request({
      url: 'https://www.wendin.cn/dcb/wxgoods.do?doDel&sessionId=' + app.globalData.sessionId,
      method: 'POST',
      header: {
        'content-type': "application/x-www-form-urlencoded"
      },
      data: {
        id: id
      },
      complete: function () {
        setTimeout(function(){
          wx.hideLoading();
          that.onShow();          
        },2000)
      },
      success: function (res) {
        console.log(res)
        var data = res.data;
        var icon = data.success ? "success" : '/images/icon/fail.png';
        wx.showToast({
          title: data.msg,
          icon: icon,
          duration: 2000
        });
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getList();
    this.getCategory();
  },
  onLoad: function () {
    this.setData({
      sessionId: app.globalData.sessionId
    })
  }

})
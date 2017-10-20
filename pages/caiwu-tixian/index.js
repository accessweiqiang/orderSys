var app = getApp();
Page({
  data: {
  },
  getList: function () {
    wx.showLoading({
      title: '加载中',
    })
    var that = this;
    wx.request({
      url: "https://www.wendin.cn/dcb/wxbankcard.do?getByRestaurantNo&restaurantNo=" + app.globalData.storeInfo.no + "&sessionId=" + app.globalData.sessionId,
      method: 'POST',
      header: {
        'content-type': "application/x-www-form-urlencoded"
      },
      complete:function(){
        wx.hideLoading();
      },
      success: function (res) {
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
  bindPickerChange: function (e) {
    var index = e.detail.value;
    console.log(index);
    console.log(this.data.list[index]);
    this.setData({
      bankcardId: this.data.list[index].id,
      bankName: this.data.list[index].bankName      
    })
  },
  bindSave: function (e) {
    var that = this;
    var id = e.detail.value['bankcard.id'];
    if (e.detail.value['bankcard.id'] == "" || e.detail.value['applyMoney'] == ""  ){
      wx.showModal({
        title: '提示',
        content: '所填信息不完整',
      })
      return;
    }
    if (e.detail.value['applyMoney'] > this.data.amountMoney){
      wx.showModal({
        title: '提示',
        content: '超过可提现金额',
      })
      return;
    }
    var params = e.detail.value;
    params.restaurantNo = app.globalData.storeInfo.no;
    var url = 'https://www.wendin.cn/dcb/wxwithdrawRecord.do?apply'+'&sessionId=' + app.globalData.sessionId
    wx.request({
      url: url,
      data: params,
      method: 'POST',
      header: {
        'content-type': "application/x-www-form-urlencoded"
      },
      success: function (res) {
        var data = res.data;
        if (!data.success) {
          wx.hideLoading();
          wx.showModal({
            title: '提示',
            content: data.msg,
            showCancel: false
          })
        } else {
          wx.showModal({
            title: '提示',
            content: data.msg,
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                wx.redirectTo({
                  url: '/pages/caiwu/index'
                })
              }
            }
          })
        }
      }
    })
  },
  selectAll:function(){
    var amountMoney = this.data.amountMoney;
    this.setData({
      applyMoney: amountMoney
    })
  },
  onShow: function () {
    this.getList();
    var amountMoney = app.globalData.storeInfo.amountMoney;
    this.setData({
      amountMoney: amountMoney
    });
  }
})
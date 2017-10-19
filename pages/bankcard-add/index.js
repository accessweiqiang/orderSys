var app = getApp();
Page({
  data: {
    restaurantNo: "",
    bankName: "",
    cardNo: "",
    cardHolder: "",
    cardHolder: "",
    holderMobile: "",
    holderIdCard: "",
    validDate: ""
  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      validDate: e.detail.value
    })
  },
  bindSave: function (e) {
    var that = this;
    var id = e.detail.value.id;
    var bankName = e.detail.value.bankName;
    var cardNo = e.detail.value.cardNo;
    var cardHolder = e.detail.value.cardHolder;
    var bankDeposit = e.detail.value.bankDeposit;
    var holderMobile = e.detail.value.holderMobile;
    var holderIdCard = e.detail.value.holderIdCard;
    var validDate = e.detail.value.validDate;
    if (bankName == "" || cardNo == "" || cardHolder == "" || holderMobile == ""  || holderIdCard == ""  ){
      wx.showModal({
        title: '提示',
        content: '所填信息不完整',
      })
      return;
    }
    console.log(e.detail.value)
    
    var params = e.detail.value;
    params.restaurantNo = app.globalData.storeInfo.no;
    var url = 'https://www.wendin.cn/dcb/wxbankcard.do?save'+'&sessionId=' + app.globalData.sessionId
    wx.request({
      url: url,
      data: params,
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
          wx.showModal({
            title: '提示',
            content: data.msg,
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                wx.navigateBack({
                  
                })
              }
            }
          })
        }
      }
    })
  },
  onLoad: function (option) {
    console.log(option);
    if (option.id) {
      wx.setNavigationBarTitle({
        title: '编辑银行卡',
      });
      this.setData({
        ...option
      })
    }

  },
  onShow: function () {
    
  }
})
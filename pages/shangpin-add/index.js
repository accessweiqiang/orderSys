var app = getApp();
Page({
    data:{
      photo0:"https://www.wendin.cn/public/images/page/banner-shangpin.png"
    },
    uploadImage:function(){
      wx.chooseImage({
        success: function(res) {},
      })
    },
    bindSave: function (e) {
      var that = this;
      console.log(e.detail.value)
      var url = e.detail.value.url;
      var goodsName = e.detail.value.goodsName;
      var standard = e.detail.value.standard;
      var detail = e.detail.value.detail;
      var menubarId = e.detail.value.menubarId;
      var price = e.detail.value.price;
      var discount = e.detail.value.discount;
      
      if (url == '' || goodsName == "" || standard == "" || detail == "" || menubarId == "" || price == "" || discount == "") {
        wx.showToast({
          title: '所填内容不完整！',
          image: "/images/icon/fail.png"
        });
        return;
      }
      var params = e.detail.value;
      wx.request({
        url: 'https://www.wendin.cn/dcb/wxgoods.do?doAdd&no='+app.globalData.storeInfo.no+'&sessionId=' + app.globalData.sessionId,
        data: params,
        method: 'POST',
        header: {
          'content-type': "application/x-www-form-urlencoded"
        },
        success: function (res) {
          console.log(res)
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
                  wx.navigateBack({

                  })
                }
              }
            })
          }
        }
      })
    },
    onLoad:function(e){
     
    },
    onShow : function () {
      var that = this;
      
    }
})
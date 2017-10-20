//获取应用实例
var app = getApp()
Page({
  data: {
    photo:'',
    environments:""
  },
  onShow:function(){
  },
  updatePhoto: function () {
    var that = this;
    wx.showLoading();
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      complete: function () {
        wx.hideLoading();
      },
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: 'https://www.wendin.cn/dcb/wxfile.do?deal&actionType=1' + '&sessionId=' + app.globalData.sessionId,
          filePath: tempFilePaths[0],
          name: 'file',
          success: function (res) {
            console.log(res)
            var data = JSON.parse(res.data);
            if (data.success) {
              var filePath = '';
              for (var item in data.attributes) {
                filePath = data.attributes[item];
              }
              wx.showToast({ title: "上传图片成功" });
              that.setData({
                "storeInfo.environments": filePath,
                photo: 'https://www.wendin.cn/dcb/wxfile.do?showOrDownByurl&filePath=' + filePath + '&sessionId=' + app.globalData.sessionId
              })
            }
          }, fail: function (res) {
            console.log(res)
          }
        })
      }
    })
  },
  bindSave: function (e) {
    var that = this;
    var name = e.detail.value.name;
    var boss = e.detail.value.boss;
    var connectPhone = e.detail.value.connectPhone;
    var address = e.detail.value.address;
    var restaurantIntroduce = e.detail.value.restaurantIntroduce;
    var mainCategory = e.detail.value.mainCategory;
    var environments = e.detail.value.environments;
   
    if (name==''||boss==""||connectPhone==""||address==""||restaurantIntroduce==""||mainCategory==""){
     wx.showToast({
       title: '所填内容不完整！',
       image:"/images/icon/fail.png"
      });
      return false;
    }
    if (environments==""){
      wx.showToast({
        title: '请上传图片',
        image: "/images/icon/fail.png"
      });
      return false;
    }
    console.log(e.detail.value  )
    var params = e.detail.value;
    wx.request({
      url: 'https://www.wendin.cn/dcb/wxrestaurant.do?save'+'&sessionId=' + app.globalData.sessionId,
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
        }else{
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
  onLoad: function (option) {
    console.log(option);
    this.setData({
      storeInfo: option
    });
    var environments = option.environments;
    var photo = "/images/page/store-img.png";
    if (environments) {
      photo = 'https://www.wendin.cn/dcb/wxfile.do?showOrDownByurl&filePath=' + environments + '&sessionId=' + app.globalData.sessionId;

      this.setData({
        photo
      });
    }
  }
})

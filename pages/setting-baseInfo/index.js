//获取应用实例
var app = getApp()
Page({
  data: {
    photo:'',
    storeInfo:{
      
    }
  },
  updatePhoto:function(){
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        console.log(res)
        var tempFilePaths = res.tempFilePaths[0];
        wx.uploadFile({
          url: 'https://www.wendin.cn/dcb/wxfile.do?deal',
          filePath: tempFilePaths,
          name: 'file',
          formData: {
            'sessionId': app.globalData.sessionId,
            "actionType":1
          },
          success: function (res) {
            console.log(res)
            var data = res.data
          },
          fail:function(res){
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
   
    if (name==''||boss==""||connectPhone==""||address==""||restaurantIntroduce==""||mainCategory==""){
     wx.showToast({
       title: '所填内容不完整！',
       image:"/images/icon/fail.png"
      })
    }
    console.log(e.detail.value  )
    var params = e.detail.value;
    wx.request({
      url: 'https://www.wendin.cn/dcb/wxrestaurant.do?save&no='+app.globalData.storeInfo.no+'&sessionId=' + app.globalData.sessionId,
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
    })
  }
  
})

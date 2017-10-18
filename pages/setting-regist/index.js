//获取应用实例
var app = getApp()
Page({
  data: {
    photo:'',
    storeInfo:{
      name: "a",
      boss: "f",
      connectPhone: "15",
      address: "成都0000",
      restaurantIntroduce: "介绍",
      mainCategory:"小吃",
    }
  },
  onShow:function(){
    /*
    wx.login({
      success:function(res){
        console.log(res)
      }
    })*/
    
  },
  updatePhoto:function(){
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
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
       title: '所填内容不完整！fa',
       image:"/images/icon/fail.png"
      })
    }
    console.log(e.detail.value  )
    var params = e.detail.value;
    wx.request({
      url: 'https://www.wendin.cn/dcb/wxrestaurant.do?save&no=shop-1&sessionId=' + app.globalData.sessionId,
      data: params,
      method: 'POST',
      header: {
        'content-type': "application/x-www-form-urlencoded"
      },
      success: function (res) {
        if (!res.data.success) {
          // 登录错误 
          wx.hideLoading();
          wx.showModal({
            title: '失败',
            content: res.data.msg,
            showCancel: false
          })
        }
      }
    })
  },
  onLoad: function (e) {
    
  },
 
  selectCity: function () {

  }
  
})

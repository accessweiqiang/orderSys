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
    onLoad:function(e){
     
    },
    onShow : function () {
      var that = this;
      
    }
})
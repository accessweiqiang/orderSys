var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    amountMoney:'',
    allMoney:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var storeInfo = app.globalData.storeInfo;
    var amountMoney = storeInfo.amountMoney||"--";
    var allMoney = storeInfo.allMoney || "--";
    this.setData({
      amountMoney,
      allMoney
    })
  }
})
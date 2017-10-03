// pages/caidan/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    catagory:[
      { text: "回锅肉" },
      { text: "回锅肉" },
      { text: "回锅肉" },
      { text: "回锅肉" },
      { text: "回锅肉回锅肉回锅肉回锅肉回锅肉回锅肉" },
      { text: "回锅肉" },
      { text: "回锅肉" },
      {text:"小吃"}
    ],
    currentCatagory:0,
    list: [{ pic: "https://www.wendin.cn/public/images/page/shangjia.png", name: "回锅肉", price: "6" }, { pic: "https://www.wendin.cn/public/images/page/shangjia.png", name: "回锅肉", price: "6" }, { pic: "https://www.wendin.cn/public/images/page/shangjia.png", name: "回锅肉", price: "6" }, { pic: "https://www.wendin.cn/public/images/page/shangjia.png", name: "回锅肉", price: "6" }, { pic: "https://www.wendin.cn/public/images/page/shangjia.png", name: "回锅肉", price: "6" }, { pic: "https://www.wendin.cn/public/images/page/shangjia.png", name: "回锅肉", price: "6" }, { pic: "https://www.wendin.cn/public/images/page/shangjia.png", name: "回锅肉", price: "6" }, { pic: "https://www.wendin.cn/public/images/page/shangjia.png", name: "回锅肉", price: "6" }, { pic: "https://www.wendin.cn/public/images/page/shangjia.png", name: "回锅肉", price: "6" }, { pic: "https://www.wendin.cn/public/images/page/shangjia.png", name: "回锅肉", price: "6" },{ pic: "https://www.wendin.cn/public/images/page/shangjia.png", name: "回锅肉", price: "6" }, { pic: "https://www.wendin.cn/public/images/page/shangjia.png", name: "回锅肉", price: "6" }]
  },
  selectCatagory:function(e){
    console.log(e)
    var index = e.currentTarget.dataset.index;
    this.setData({
      currentCatagory:index
    })
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
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})
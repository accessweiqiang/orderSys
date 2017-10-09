// pages/setting/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    photo: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3054320777,3640847721&fm=27&gp=0.jpg',
    hangye: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3523986493,13298610&fm=27&gp=0.jpg',
    zhizhao: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1508123660&di=1b6ce4bfc1a1a5ce026c2f2ce9c5afd4&imgtype=jpg&er=1&src=http%3A%2F%2Fdocs.ebdoor.com%2FImage%2FCompanyCertificate%2F12%2F126651.jpg'

  },
  changePhoto: function () {
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        console.log(tempFilePaths)
      }
    })
  },
  viewPhoto: function (e) {
    var src = e.currentTarget.dataset.src || "/images/icon/default.png";
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: [src] // 需要预览的图片http链接列表
    })
  },
  toBaseInfo:function(){
    wx.navigateBack()
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
    console.log(99)
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
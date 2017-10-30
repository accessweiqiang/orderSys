var app = getApp();
var util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:"回锅肉",
    spec:"中",
    price:50,
    remark:"sad发送到发送到"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    if (option.id) {
      this.setData({
        id: option.id,
        goodsName: option.goodsName,
        standard: option.standard,
        price: option.price,
        discount: option.discount,
        detail: option.detail
      });
      //设置图片
      var filePath = option.goodsPictures;
      if (filePath) {
        this.setData({
          filePath: filePath,
          photo: 'https://www.wendin.cn/dcb/wxfile.do?showOrDownByurl&filePath=' + filePath + '&sessionId=' + app.globalData.sessionId
        });
      }
      //设置分类
      var menubarId = option.menubarId;
      this.setData({
        "category.id": menubarId
      });
    }
  }
})
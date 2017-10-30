var app = getApp();
Page({
  data: {
    categoryList: [],
    photo: "",
    category: {
      name: "选择分类",
      id: ""
    },
    filePath: '',
    index: ""//分类的索引
  },
  getCategory: function () {
    var that = this;
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: 'https://www.wendin.cn/dcb/wxmenubar.do?findByPro&sessionId=' + app.globalData.sessionId,
      method: 'POST',
      header: {
        'content-type': "application/x-www-form-urlencoded"
      },
      complete: function () {
        wx.hideLoading()
      },
      success: function (res) {
        var data = res.data
        if (data.success) {
          var categoryId = that.data.category.id;
          var categoryList = data.attributes.menus;
          if (categoryList.length==0){
            wx.showModal({
              title: '温馨提示',
              content: '您还没有添加商品分类，请添加！',
              showCancel:false,
              success: function (res) {
                if (res.confirm) {
                  wx.navigateTo({
                    url: 'pages/category/index'
                  })
                } else if (res.cancel) {
                  wx.navigateTo({
                    url: 'pages/category/index'
                  })
                }
              }
            })
          }
          //如果有categoryId说明是编辑，选择好picker
          if (categoryId) {
            for (var i = 0; i < categoryList.length; i++) {
              if (categoryId == categoryList[i].id) {
                console.log("有", categoryId);
                that.setData({
                  "category.name": categoryList[i].name
                });
                that.setData({
                  index: i
                })
                break;
              }
            }
          }
          that.setData({
            categoryList: categoryList
          })
        } else {
          wx.showModal({
            title: '提示',
            content: data.msg,
            showCancel: false,
          })
        }
      }
    })
  },
  bindPickerChange: function (e) {
    var index = e.detail.value;
    this.setData({
      category: this.data.categoryList[index]
    })
  },
  uploadImage: function () {
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
                filePath: filePath,
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
    var id = e.detail.value.id;
    var url = e.detail.value.url;
    var goodsName = e.detail.value.goodsName;
    var standard = e.detail.value.standard;
    var detail = e.detail.value.detail;
    var menubarId = e.detail.value.menubarId;
    var price = e.detail.value.price*100;
    var discount = e.detail.value.discount;
    console.log(e.detail.value)
    if (url == '' || goodsName == "" || standard == "" || detail == "" || menubarId == "" || price == "" || discount == "") {
      wx.showToast({
        title: '所填内容不完整！',
        image: "/images/icon/fail.png"
      });
      return;
    }
    var params = e.detail.value;
    var url = id ? 'https://www.wendin.cn/dcb/wxgoods.do?doUpdate':'https://www.wendin.cn/dcb/wxgoods.do?doAdd'
    url += '&sessionId=' + app.globalData.sessionId
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
    if (option.id) {
      wx.setNavigationBarTitle({
        title: "编辑商品"
      })
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
      if(filePath){
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

  },
  onShow: function () {
    this.getCategory();
  }
})
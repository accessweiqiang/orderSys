//index.js
//获取应用实例
var app = getApp()
var sessionId = '';
var cartTotal = [];
var cartObjData = {};
  // wx.getStorage({
  //   key: 'code',
  //   success: function (res) {
  //     sessionId = res.data;
  //   }
  // })
  sessionId = wx.getStorageSync('code');
  var shopNumber = 'shop-2';
Page({
  data: {
      num:1,
      cartNum:0,
      shopInfo:{},
      menuIndex:0,
      menu:[],
      prodList:[],
      menuIdfir:'',
      totalPrice:0
  },
  add(event) {
    var numb = event.currentTarget.dataset.num;
    var index = event.currentTarget.dataset.index;
    var price = event.currentTarget.dataset.price;
    var pname = event.currentTarget.dataset.pname;
    var pid = event.currentTarget.dataset.pid;
    numb = numb + 1;
    this.data.prodList[index].num = numb;
    this.setData({
      prodList: this.data.prodList
    })
    var aa = this.data.cartNum + 1;
    // for (var i in this.data.prodList) {
    //   aa += this.data.prodList[i].num;
    // }
    console.log(aa);
    this.setData({
      cartNum: aa
    })
    var cartArr = [];
    var shoppingcarDetailEntitys = [];
    var obj = {};
    var cartObj = {};
    var orderObj = {};
    cartObj.shoppingcarDetailEntitys = cartArr;
    orderObj.orderDetailEntitys = cartArr;
    obj.goodsName = pname;
    obj.price = price;
    obj.goodsId = pid;
    obj.goodsNum = aa;
    obj.factPrice = 2;
    cartArr.push(obj);
    cartObj.restaurantNo = 'shop-1';
    cartObj.price = price;
    cartObj.factPrice = price;
    orderObj.restaurantNo = 'shop-1';
    orderObj.price = price;
    orderObj.factPrice = price;
    var dataCart = JSON.stringify(cartObj);
    cartObjData = JSON.stringify(orderObj);
    var _this = this;
    console.log(cartObj);
    wx.request({
      header: {
        'content-type': "application/json"
      },
      data: dataCart,
      url: "https://www.wendin.cn/dcb/wxshopcar.do?doAdd&sessionId=" + sessionId,
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      success: function (resp) {
        _this.setData({
          totalPrice: resp.data.attributes.factPrice
        })
      },
      fail: function () {
        console.log("fail")
      },
      complete: function () {
      }
    })
  },
  redu: function (event) {
    var numb = event.currentTarget.dataset.num;
    var index = event.currentTarget.dataset.index
    numb = numb - 1;
    console.log(index);
    if(numb == 0 || numb < 0) {
      numb = 0;
    }
    this.data.prodList[index].num = numb;
    this.setData({
      prodList: this.data.prodList
    })
    var bb = 0;
    for (var i in this.data.prodList) {
      bb += this.data.prodList[i].num;
    }
    this.setData({
      cartNum: bb
    })
  },
  onLoad: function () {
    this.setData({
      sessionId
    })
    this.getShopInfo();
    this.getCata();
  },
  imgSrc() {
    return "https://www.wendin.cn";
  },
  /**数据部分**/
   getCata() { // 获取分类
    var reqBody = {};
    reqBody.id = '';
    reqBody.restaurantNo = 'shop-1';
    reqBody.menubarId = '';
    var page = null;
    var that = this;
    wx.request({
      header: {
        'content-type': "application/x-www-form-urlencoded"
      },
      url: "https://www.wendin.cn/dcb/wxmenubar.do?findByPro&sessionId=" + sessionId + "&no=" + shopNumber,
      data: reqBody,
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      success: function (resp) {
        console.log(resp);
        that.setData({
          menu: resp.data.attributes.menus,
          menuIdfir: resp.data.attributes.menus[0].id
        })
        that.getProdList();
      },
      fail: function () {
        console.log("fail")
      },
      complete: function () {
      }
    })
  }, 
 getShopInfo() { // 获取店铺信息
    var that = this;
    wx.request({
      header: {
        'content-type': "application/x-www-form-urlencoded"
      },
      url: "https://www.wendin.cn/dcb/wxrestaurant.do?getMyRestaurant&sessionId=" + sessionId + "&no=" + shopNumber,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      success: function (resp) {
        that.setData({
          shopInfo: resp.data.attributes,
        })
      },
      fail: function () {
        console.log("fail")
      },
      complete: function () {
      }
    })
  },
 getProdList(event){ // 根据分类id获取商品
    var that = this;
    var menuId = '';
    if (event) {
       menuId = event.currentTarget.dataset.mid;
    } else {
      menuId = this.data.menuIdfir;
    }
   // this.data.menuIndex = event.currentTarget.dataset.mid;
    wx.request({
      header: {
        'content-type': "application/x-www-form-urlencoded"
      },
      data:{
        restaurantNo: shopNumber,
        menubarId: menuId
      },
      url: "https://www.wendin.cn/dcb/wxgoods.do?findByProForCt&sessionId=" + sessionId,
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      success: function (resp) {
        for (var i in resp.data.attributes.goodss) {
          resp.data.attributes.goodss[i].num = 0; 
        }
         that.setData({
           prodList: resp.data.attributes.goodss,
         })
      },
      fail: function () {
        console.log("fail")
      },
      complete: function () {
      }
    })
  },
  addOrder() { //新增订单
    if (cartObjData) {

      wx.request({
        header: {
          'content-type': "application/json"
        },
        data: cartObjData,
        url: "https://www.wendin.cn/dcb/wxorder.do?doAdd&sessionId=" + sessionId,
        method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        success: function (resp) { 
          wx.navigateTo({ url: '/pages/confirm/confirm?orderId=' + resp.data.attributes.id}); 
        },
        fail: function () {
          console.log("fail")
        },
        complete: function () {
        }
      })
    }
  }
})

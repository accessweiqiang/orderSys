 // pages/busi/confirm/conform.js
// var appid = "";
// var secret = "";
var sessionId = '';
var cartTotal = [];
var shopId = 'shop-1';
var orderId = '';
var MD5Util = require('../../assets/md5.js');  
wx.getStorage({
  key: 'code',
  success: function (res) {
    sessionId = res.data;
  }
})
var app = getApp();
Page({
  data: {
    isPop:false,
    prodList:[],
    totalPrice:''
  },
  onLoad: function (options) {
    this.getCartData(options.orderId);
    orderId = options.orderId;
  },
  popPay:function() {
    this.setData({
      isPop:true
    })
  },
  closePop:function(){
    this.setData({
      isPop: false
    })
  },
  getCartData:function(orderId) {
    var _this = this;
    wx.request({
      header: {
        'content-type': "application/json"
      },
      url: "https://www.wendin.cn/dcb/wxorder.do?findByPro&sessionId=" + sessionId +"&orderId=" + orderId + "&restaurantNo=" + shopId ,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      success: function (resp) {
        console.log(resp.data.attributes.orders[0].factPrice);
         _this.setData({
           prodList: resp.data.attributes.orders[0].orderDetailEntitys,
           totalPrice: resp.data.attributes.orders[0].factPrice
         })
      },
      fail: function () {
        console.log("fail")
      },
      complete: function () {
      }
    })
  },
  wxPay() {
    var totalPrice = 2;
    // var orderId = '2c92d59e5f44caa4015f44e8edf40077';
    wx.request({
      header: {
        'content-type': "application/json"
      },
      url: "https://www.wendin.cn/dcb/wxpay.do?pay&sessionId=" + sessionId + "&total_fee=" + totalPrice + "&restaurantNo=" + shopId + "&orderId=" + orderId + "&body=123123123",
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      success: function (resp) {
        var appId = resp.data.attributes.appid;
        var timeStamp = (Date.parse(new Date()) / 1000).toString();
        var pkg = "prepay_id="+resp.data.attributes.prepay_id;
        var nonceStr = resp.data.attributes.nonce_str;
        var signA = "appId=" + appId + "&nonceStr=" + nonceStr + "&package=" + pkg + "&signType=MD5&timeStamp=" + timeStamp;
        var signB = signA + "&key=498b41594c5db469da5c6ca637eb5a3b"; 
        var sign = MD5Util.MD5(signB).toUpperCase();  
        console.log(sign);
        wx.requestPayment({
          'timeStamp': timeStamp,
          'nonceStr': nonceStr,
          'package': pkg,
          'signType': 'MD5',
          'paySign': sign,
          'success': function (res) {
            wx.navigateTo({ url: '/pages/orderSuccess/orderSuccess'}); 
          },
          'fail': function (res) { 
            console.log(res);
          },
        });
      },
      fail: function () {
        console.log("fail")
      },
      complete: function () {
      }
    })
  } 
})


//****************************************************//
//*******************业务逻辑处理**********************//
//****************************************************//

// var getWXdata = (function () {
//   var c = {};
//   var openid = "";
//   var that = this;
//   var appid = "wxf76e6e94b7761f9f";
//   var sec = "40df251b28fe3569548fbcd6ab135ab3";
//   var code = "";
//   c.wxPay = function () {
//     wx.login({
//       success: function (res) {
//         console.log(res);
//         code = res.code;
//         wx.getUserInfo({
//           success: function (res) {
//             var objz = {};
//             objz.avatarUrl = res.userInfo.avatarUrl;
//             objz.nickName = res.userInfo.nickName;
//             console.log(objz);
//             wx.setStorageSync('userInfo', objz);//存储userInfo  
//           }
//         });
//       }
//     })
//   }
  //  var reqHeader = { channel: 4 };
  //  var reqBody = { payType: payType, openId: common.getSessionStorage("openId"), subsIds: [subsId] };
  //  var params = { reqHeader: reqHeader, reqBody: reqBody };
  //  common.setSessionStorage("lastPaySubsId", subsId);

  //return c;
//})();
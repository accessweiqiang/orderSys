//app.js
App({
  onShow: function (options) {
    // Do something when show.
  },
  onHide: function () {
    // Do something when hide.
  },
  onError: function (msg) {
    console.log(msg)
  },
  onLaunch: function () {
    console.log("launch");
    var that = this;
    try {
      var value = wx.getStorageSync('sessionId')
      if (value) {
        that.globalData.sessionId = value;
      }
    } catch (e) {
    }
    this.login();
  },
  login: function () {
    var that = this;
    var sessionId = that.globalData.sessionId;
    if (!sessionId) {
      console.log("没有sessionId")
      wx.login({
        success: function (res) {
          wx.request({
            url: 'https://www.wendin.cn/dcb/wxauthenticate.do?onLogin&code=' + res.code,
            success: function (res) {
              console.log(res)
              if (res.data.success) {
                var sessionId = res.data.attributes.sessionId;
                try {
                  wx.setStorageSync('sessionId', sessionId);
                } catch (e) {
                
                }
              } else {
                wx.showToast({
                  icon: 'loading',
                  title: res.data.msg
                })
              }
            }
          })
        }
      })
    } else {
      console.log(sessionId)
    }

  },
  registerUser: function () {
    var that = this;
    wx.login({
      success: function (res) {
        var code = res.code; // 微信登录接口返回的 code 参数，下面注册接口需要用到
        wx.getUserInfo({
          success: function (res) {
            var iv = res.iv;
            var encryptedData = res.encryptedData;
            // 下面开始调用注册接口
            wx.request({
              url: 'https://api.it120.cc/' + that.globalData.subDomain + '/user/wxapp/register/complex',
              data: { code: code, encryptedData: encryptedData, iv: iv }, // 设置请求的 参数
              success: (res) => {
                wx.hideLoading();
                that.login();
              }
            })
          }
        })
      }
    })
  },
  globalData: {
    sessionId: null,
    storeInfo: {},
    subDomain: "mall",
    version: "1.6.1",
    shareProfile: '百款精品商品，总有一款适合您' // 首页转发的时候话术
  }
  // 根据自己需要修改下单时候的模板消息内容设置，可增加关闭订单、收货时候模板消息提醒
})

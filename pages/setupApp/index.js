// pages/setupApp/index.js
var app = getApp();
var deviceId = 'C8:09:08:AF:F3:1C';
var serviceId = ''
var characteristicId = '';
var access_token;
Page({
  /**
   * 页面的初始数据
   */
  data: {

  },
  //
  qr: function () {
    var qrurl = 'https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=rUnLIBvoQvgLyskWvCNP7flW3HPfNi0UMHhLjcMXv_s3uRBHEEpV0WNnp31ipAEX58BAwQ8YfPTjXTj7aFYAQmhn0TQoSW1kVk4tqCnymcf-8r6ddRWcV0jf9dSIXirzCXMfACAMHW';
    
    wx.request({
      url: qrurl,
      method: 'POST',
      data: {
        scene: "test999",
        width: 200
      },
      success: function (res) {
        console.log(res)
      }
    })
    return
    wx.request({
      url: 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wxf2e09e7811202654&secret=498b41594c5db469da5c6ca637eb5a3b',
      success: function (res) {
        var data = res.data;
        access_token = data.access_token;
        //
        

      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  test: function () {
    var id = "-5202244932725472329";
    var data = {
      price: 100,
      factPrice: 90,
      createTime: "2017-10-19 31:31:00",
      orderDetailEntitys: [
        {
          "factPrice": 90,
          "goodsId": "3",
          "price": 100,
          "goodsNum": 2,
          "goodsName": "瓜"
        }
      ]
    }
    wx.request({
      url: "https://www.wendin.cn/dcb/wxorder.do?doAdd&sessionId=-2911577489940500799",
      method: "post",
      data: data
    })
  },
  test2: function () {

  },
  lanya: function () {
    var that = this;
    wx.openBluetoothAdapter({
      success: function (res) {
        console.log(res)
        that.setData({
          openBluetoothAdapter: JSON.stringify(res)
        });
        wx.getBluetoothAdapterState({
          success: function (res) {
            that.setData({
              getBluetoothAdapterState: JSON.stringify(res)
            });
          }
        })
        wx.startBluetoothDevicesDiscovery({
          success: function (res) {
            that.setData({
              startBluetoothDevicesDiscovery: JSON.stringify(res)
            });
          }
        })
        wx.onBluetoothDeviceFound(function (res) {
          that.setData({ onBluetoothDeviceFound: JSON.stringify(res) })
          console.dir(res)
        })
      }
    })
  },
  //获取蓝牙设备所有 service（服务）
  getBLEDeviceServices: function () {
    var that = this;
    wx.getBLEDeviceServices({
      // 这里的 deviceId 需要在上面的 getBluetoothDevices 或 onBluetoothDeviceFound 接口中获取
      deviceId: deviceId,
      fail: function (res) {
        console.log("fail")
        console.log(res)

      },
      success: function (res) {
        console.log(res)
        that.setData({
          getBLEDeviceServices: JSON.stringify(res)
        })
        return;
        serviceId = res.services[0].uuid;
        wx.getBLEDeviceCharacteristics({
          // 这里的 deviceId 需要在上面的 getBluetoothDevices 或 onBluetoothDeviceFound 接口中获取
          deviceId: deviceId,
          // 这里的 serviceId 需要在上面的 getBLEDeviceServices 接口中获取
          serviceId: serviceId,
          success: function (res) {
            console.log(res)
            characteristicId = res.characteristics[0];
            that.setData({ res: JSON.stringify({ deviceId, serviceId, characteristicId }) });
            wx.onBLECharacteristicValueChange(function (characteristic) {
              console.log('characteristic value changed:', characteristic)
            })
            // 向蓝牙设备发送一个0x00的16进制数据
            let buffer = new ArrayBuffer(1)
            let dataView = new DataView(buffer)
            dataView.setUint8(0, 0)

            wx.writeBLECharacteristicValue({
              // 这里的 deviceId 需要在上面的 getBluetoothDevices 或 onBluetoothDeviceFound 接口中获取
              deviceId: deviceId,
              // 这里的 serviceId 需要在上面的 getBLEDeviceServices 接口中获取
              serviceId: serviceId,
              // 这里的 characteristicId 需要在上面的 getBLEDeviceCharacteristics 接口中获取
              characteristicId: characteristicId,
              // 这里的value是ArrayBuffer类型
              value: buffer,
              success: function (res) {
                console.log(res)
                wx.showModal({
                  title: '1',
                  content: '0',
                })
              }
            })
          }
        })
      }
    })
  },
  getBluetoothDevices: function () {
    var that = this;
    wx.getBluetoothDevices({
      success: function (res) {
        console.log(res)
        that.setData({
          getBluetoothDevices: JSON.stringify(res)
        })
      }
    })
  },
  onLoad: function (options) {
    app.login();
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
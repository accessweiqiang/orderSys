var app = getApp();
Page({
  data: {
    modalVisible:false,
    printItems: [
      { text: "前台", },
      { text: "后厨", }
    ], currentPrintItem: 0
  },
  selectPrint: function (e) {
    var index = e.currentTarget.dataset.index;
    this.setData({
      currentPrintItem: index
    });
  },
  ok: function () {
    this.setData(
      {

      }
    );
    this.hideModal();
  },
  showModal: function () {
    this.setData({
      modalVisible: true
    })
  },
  hideModal: function () {
    this.setData({
      modalVisible: false
    })
  },
  onLoad: function (e) {

  },
  onShow: function () {
    var that = this;

  }
})
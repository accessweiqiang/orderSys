function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
function formatDate(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  return [year, month, day].map(formatNumber).join('-') 
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function obj2query(obj) {
  var query = '';
  for(var item in obj ){
    query+=item+"="+obj[item]+"&";
  }
  return query.slice(0, -1);
}
function getOrderStatus(status){
  /*
  首先下单（未处理），   1
  支付时（支付中），3
  支付 完（支付成功，待处理），5
  支付失败（支付失败），6
  商家看到订单（处理中），7
  商品上桌，（处理完成），8
  1 ，3 ，5 ，6 的状态系统自动维护，前台
  要维护的状态为7 ，8
  */
  var s = {
    "1": "未处理",
    "3": "支付中",
    "5": "已支付",
    "6": "支付失败",
    "7": "处理中",
    "8":"已完成",
  }
  return s[status];
}



function getBankcardIcon ( name ){
  var bankCardIocons = {
    "中国银行": "bank1.png",
    "农业银行": "bank2.png",
    "工商银行": "bank3.png",
    "建设银行": "bank4.png",
    "交通银行": "bank5.png",
    "招商银行": "bank6.png",
    "贵阳银行": "bank7.png"
  }
  var basePath = "https://www.wendin.cn/public/images/icon/";
  var icon = bankCardIocons[name];
  console.log(icon)
  if(!icon){
    icon="bank.png"
  }
  return basePath+icon
};

module.exports = {
  formatTime: formatTime,
  obj2query: obj2query,
  formatDate,
  getOrderStatus,
  getBankcardIcon
}

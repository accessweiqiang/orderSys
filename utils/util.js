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
    "7": "支付失败",
    "8":"已处理",
  }
  return s[status];
}

module.exports = {
  formatTime: formatTime,
  obj2query: obj2query,
  formatDate,
  getOrderStatus
}

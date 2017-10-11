function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
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


module.exports = {
  formatTime: formatTime,
  obj2query: obj2query
}

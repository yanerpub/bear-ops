export function host(url) {
  const host = url.replace(/^https?:\/\//, '').replace(/\/.*$/, '')
  const parts = host.split('.').slice(-3)
  if (parts[0] === 'www') parts.shift()
  return parts.join('.')
}

export function dateFormat(time) {
  var dateStr = "";
  var date = new Date();
  date.setTime(time);
  dateStr += date.getFullYear();  //年
  let temp = date.getMonth() + 1; //getMonth()得到的月份是0-11
  if (temp < 10) {
    temp = "0" + temp;
  }
  dateStr += "-" + temp; //月
  temp = date.getDate();
  if (temp < 10) {
    temp = "0" + temp;
  }
  dateStr += "-" + temp;  //日
  return dateStr;
}


export function timeAgo(time) {
  const between = Date.now() / 1000 - Number(time / 1000)
  if (between < 3600) {
    return pluralize(~~(between / 60), ' 分钟')
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' 小时')
  } else {
    return dateFormat(time)
  }
}

function pluralize(time, label) {
  if (time === 1) {
    return time + label
  }
  return time + label + '前'
}

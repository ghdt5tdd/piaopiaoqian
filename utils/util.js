const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
 *获取当前时间
 *state=1精确到分
*/
function getFormatDate(state, dateStr) {
  var now = new Date();
  if (dateStr) {
    now = new Date(dateStr)
  }
  var year = now.getFullYear(); //得到年份
  var month = now.getMonth();//得到月份
  var date = now.getDate();//得到日期
  var day = now.getDay();//得到周几
  var hour = now.getHours();//得到小时
  var minu = now.getMinutes();//得到分钟
  var sec = now.getSeconds();//得到秒
  month = month + 1;
  if (month < 10) month = "0" + month;
  if (date < 10) date = "0" + date;
  if (hour < 10) hour = "0" + hour;
  if (minu < 10) minu = "0" + minu;
  if (sec < 10) sec = "0" + sec;
  var time = "";
  //精确到天
  if (state) {
    time = year + "-" + month + "-" + date + " " + hour + ":" + minu + ":" + sec;
  } else {
    time = year + "-" + month + "-" + date;
    
  }
  return time;
}

function handleImgUrl (obj, imgKey) {
  if(obj instanceof Array) {
    obj.forEach(v => {
      if (v[imgKey] !== undefined) {
        v[imgKey] = 'https://sping-cloud-fall.oss-cn-shanghai.aliyuncs.com/wlhn/' + v[imgKey]
      }
    })
  }else if (obj instanceof Object) {
    if (obj[imgKey] !== undefined) {
      obj[imgKey] = 'https://sping-cloud-fall.oss-cn-shanghai.aliyuncs.com/wlhn/' + v[imgKey]
    }
  }else {
    
  }
}

function RandomUUID() {
  var s = [];
  var hexDigits = "0123456789abcdef";
  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = "-";

  var uuid = s.join("");
  return uuid;
}

function ImgPathToBase64(imgPath, callback) {
  console.log(imgPath)
  wx.request({
    url: imgPath,
    method: 'GET',
    responseType: 'arraybuffer',
    success: function (res) {
      let base64 = wx.arrayBufferToBase64(res.data);
      callback(base64)
    },
    fail: function(err) {
      console.log(err)
    }
  })
}

module.exports = {
  formatTime,
  handleImgUrl,
  RandomUUID,
  ImgPathToBase64,
  getFormatDate,
}

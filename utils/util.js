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

module.exports = {
  formatTime: formatTime,
  handleImgUrl
}

const util = require('util.js')
const _config = {
  serverUrl: 'https://fall.wlhn.com/fallapp-main-wlhn/'
  // serverUrl: 'https://fall.wlhn.com/fallapp-child-dlxapp-userlla/'
}

function getApi(apiName, params, cb, isOwnAddress) {
  request({
    url: isOwnAddress ? apiName : _config.serverUrl + apiName,
    data: params,
    method: 'GET',
    header: {
      'content-type': 'application/x-www-form-urlencoded;charset=UTF-8', // 默认值
      'Accept-Language': 'zh-CN,zh;q=0.8' // 默认值
    },
    success: function (res) {
      typeof cb == "function" && cb(null, res.data)
    },
    fail: function (err) {
      typeof cb == "function" && cb(err)
    }
  }) 
}

function postApi(apiName, params, cb, isOwnAddress) {
  request({
    url: isOwnAddress ? apiName : _config.serverUrl + apiName,
    data: params,
    method: 'POST',
    header: {
      'content-type': 'application/x-www-form-urlencoded;charset=UTF-8', // 默认值
      'Accept-Language': 'zh-CN,zh;q=0.8' // 默认值
    },
    success: function (res) {
      typeof cb == "function" && cb(null, res.data)
    },
    fail: function (err) {
      typeof cb == "function" && cb(err)
    }
  })
}
function request(requestSetting) {
  let JSSESSIONID = wx.getStorageSync('JSSESSIONID')
  if (JSSESSIONID === '') {
    JSSESSIONID = util.RandomUUID()
    wx.setStorageSync('JSSESSIONID', JSSESSIONID)
  }
  requestSetting.header['cookie'] = 'JSESSIONID=' + JSSESSIONID
  wx.request(requestSetting)
}


module.exports = {
  getApi: getApi,
  postApi: postApi 
}
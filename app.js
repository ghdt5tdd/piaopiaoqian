//app.js
const ajax = require('utils/ajax.js')
App({
  onLaunch: function (e) {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    const openId = wx.getStorageSync('openId') || ''
    const sessionKey = wx.getStorageSync('sessionKey') || ''

    if(openId === '') {
      // 登录
      const app_area = this.globalData.appArea
      const secret = this.globalData.appSecret
      wx.login({
        success: res => {
          ajax.getApi('mini/program/code2Session', {
            app_area: app_area,
            js_code: res.code,
            key: '1'
          }, (err, rest) => { 
            if (rest && rest.success) {
              const result = rest.data
              this.globalData.openId = result.openid
              this.globalData.sessionKey = result.session_key
              wx.setStorageSync('openId', result.openid)
              wx.setStorageSync('sessionKey', result.session_key)
            }
          })
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
        }
      })
    } else {
      this.globalData.openId = openId
      this.globalData.sessionKey = sessionKey
    }
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              console.log(res.userInfo)
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    appArea: 'wlhn',
    openId: '',
    sessionKey: '',
    unionId: '',
    memberInfo: null,
    userInfo: null
  }
})
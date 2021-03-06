//app.js
const ajax = require('utils/ajax.js')
const util = require('utils/util.js')
const appData = require('utils/app-data.js')
App({
  onLaunch: function (e) {
    this.checkUpdate()
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    const openId = wx.getStorageSync('openId' + this.globalData.appId) || ''
    const unionId = wx.getStorageSync('unionId' + this.globalData.appId) || ''
    const sessionKey = wx.getStorageSync('sessionKey' + this.globalData.appId) || ''

    if(openId === '') {
      // 登录
      const app_area = appData.APP_BELONG_AREA
      wx.login({
        success: res => {
          ajax.getApi('mini/program/code2Session', {
            app_area: app_area,
            js_code: res.code,
            app_id: this.globalData.appId
          }, (err, rest) => { 
            if (rest && rest.success) {
              const result = rest.data
              this.globalData.openId = result.openid
              this.globalData.unionId = result.unionid
              this.globalData.sessionKey = result.session_key
              wx.setStorageSync('openId' + this.globalData.appId, result.openid)
              wx.setStorageSync('unionId' + this.globalData.appId, result.unionid)
              wx.setStorageSync('sessionKey' + this.globalData.appId, result.session_key)
            }
          })
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
        }
      })
    } else {
      this.globalData.openId = openId
      this.globalData.unionId = unionId
      this.globalData.sessionKey = sessionKey
    }
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            lang: 'zh_CN',
            success: res => {
              console.log(res)
              // 可以将 res 发送给后台解码出 unionId 
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回.
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

  checkUpdate() {
    const updateManager = wx.getUpdateManager()

    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      // console.log(res.hasUpdate)
    })

    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success: function (res) {
          if (res.confirm) {
            wx.clearStorage()
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })

    })

    updateManager.onUpdateFailed(function () {
      // 新的版本下载失败
    })
  },

  globalData: {
    platformAppArea: 'wlhn',
    piaopiaoQianAppArea: 'def2dbc9fddf415e8b96dc167ccea5dc',
    piaopiaoQianMemberId: 'ba154b8a17d94b298e3fb6feb3593a39',
    qqMapKey: appData.QQ_Map_KEY,
    appId: appData.APP_ID,
    openId: '',
    sessionKey: '',
    unionId: '',
    memberInfo: null,
    userInfo: null,
    jsSessionId: null,
  }
})
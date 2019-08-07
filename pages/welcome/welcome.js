// pages/welcome/welcome.js
//获取应用实例
const app = getApp()
const ajax = require('../../utils/ajax.js')
const util = require('../../utils/util.js')
const appData = require('../../utils/app-data.js')
Page({
  data: {
    motto: '开启快运之旅',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  onLoad: function (options) {
    if (appData.APP_IS_PRIVATE) {
      wx.setNavigationBarTitle({
        title: appData.APP_NAME//页面标题为路由参数
      })
    }
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })

    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })

      }

    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        lang: 'zh_CN',
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })

        }
      })

    }
  },

  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    if (e.detail.userInfo == undefined) {
      wx.showToast({
        title: '登录账号获取更优服务',
        icon: 'none',
        duration: 3000,
        mask: true
      })
    } else {
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
    }

  },

  toBind: function(e) {
    if (this.data.hasUserInfo == true) {
      const area = wx.getStorageSync('lastArea') || ''
      //第一次使用
      if (area === '' && !appData.APP_IS_PRIVATE) {
        wx.redirectTo({
          url: '../enterpriseDomain/enterpriseDomain',
        })
      } else {
        wx.redirectTo({
          url: '../bind/bind',
        })
      }
      ajax.getApi('mini/program/createMember', {
        ...app.globalData.userInfo,
        openId: app.globalData.openId,
        unionId: app.globalData.unionId,
        app_area: app.globalData.platformAppArea,
        referrer_member_id: app.globalData.piaopiaoQianMemberId
      }, (err, rest) => {
        if (!rest.success) {
          wx.showToast({
            title: '创建用户失败',
            mask: true
          })
        }
      })
      //第一次微信账号登录跳转到绑定德力西账号页面，
      // wx.redirectTo({
      //   url: '../bind/bind',
      // })
      //之后微信账号登录就直接  
      // wx.switchTab({
      //   url: '../home/home',
      // })    
      //到票票签首页,不知道怎么写留给你 
    } else {
      wx.showToast({
        title: '请先点击账号登录',
        icon: 'none',
        duration: 2000,
        mask: true
      })
    }

  },


})
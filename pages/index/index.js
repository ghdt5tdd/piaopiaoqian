//index.js
//获取应用实例
const app = getApp()
const ajax = require('../../utils/ajax.js')
Page({
  data: {
    userInfo: {},
    memberInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    curCode: null,
    orderStatus: [],

    selectStatus: 0,
    ul: "ul-2",

    toTabs: [{
      num: "21",
      name: "已发货"
    }, {
      num: "165",
      name: "在途中"
    }, {
      num: "8",
      name: "待签收"
    }, {
      num: "64",
      name: "已签收"
    }],

    fromTabs: [{
      num: "64",
      name: "已发货"
    }, {
      num: "45",
      name: "在途中"
    }, {
      num: "32",
      name: "待签收"
    }, {
      num: "86",
      name: "已签收"
    }],

    myList: [{
      bar: [{
        img: "../../images/my1.png",
        label: "子账户管理",
        to: "",
      }, {
        img: "../../images/my2.png",
        label: "账户日记",
        to: "toDiary",
      }, ]
     }, {
      bar: [{
        img: "../../images/my3.png",
        label: "个人资料",
        to: "toPersonal",
      }, {
        img: "../../images/my4.png",
        label: "我的设置",
        to: "",
      }, {
        img: "../../images/my5.png",
        label: "手机硬件码",
        to: "toCode",
      }, {
        img: "../../images/my6.png",
        label: "建议反馈",
        to: "toSuggest",
      }, ]
    }]
  },


  //选择状态
  selectStatus: function(e) {
    var curCode = e.target.dataset.code;
    this.setData({
      curCode
    })
  },

  //跳转到个人资料页面
  toPersonal: function(e) {
    wx.navigateTo({
      url: '../personal/personal'
    })
  },


  //跳转到账户日记页面
  toDiary: function(e) {
    wx.navigateTo({
      url: '../diary/diary'
    })
  },


  //跳转到手机硬件码页面
  toCode: function(e) {
    wx.navigateTo({
      url: '../code/code'
    })
  },

  //跳转到建议反馈页面
  toSuggest: function(e) {
    wx.navigateTo({
      url: '../suggest/suggest'
    })
  },


  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function() {
    this.initUserInfo()
    this.getMemberInfo()
    this.getNavByRole(this.getNavDataByRole)
  },

  getMemberInfo: function() {
    const memberInfo = app.globalData.memberInfo
    this.setData({
      memberInfo
    })
  },

  getNavByRole:function(callback) {
    const orderStatus = wx.getStorageSync('orderStatus' + app.globalData.memberInfo.id)
    if (orderStatus === '') {
      ajax.getApi('app/member/getNavByRole', {
        
      }, (err, res) => {
        if (res && res.success) {
          wx.setStorageSync('orderStatus' + app.globalData.memberInfo.id, res.data)
          if(res.data instanceof Array && res.data.length > 0) {
            this.setData({
              orderStatus: res.data,
              curCode: res.data[0].code
            })
            callback(res.data)
          }
        }
      })	
    } else {
      callback(orderStatus)
      this.setData({
        orderStatus,
        curCode: orderStatus[0].code
      })
    }
  },



  getNavDataByRole: function(navs) {
    navs.forEach((v,i) => {
      const code = v.code
      ajax.getApi('app/member/getNavDataByRole', {
        code
      }, (err, res) => {
        if (res && res.success) {
          console.log(res.data)
          const orderStatus = this.data.orderStatus
          orderStatus.forEach(value => {
            if (value.code === code){
              value.tabs = res.data
            }
          })

          this.setData({
            orderStatus
          })
        }
      })
    })
  },

  initUserInfo: function() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true,
          })
        }
      })
    }
  },

  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true,

    })
  }
})
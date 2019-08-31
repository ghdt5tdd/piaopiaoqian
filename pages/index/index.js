//index.js
//获取应用实例
const app = getApp()
const storage = require('../../utils/storage.js')
const ajax = require('../../utils/ajax.js')
Page({
  data: {
    myBanner: '../../images/bg.jpg',
    userInfo: {},
    memberInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    curCode: null,
    orderStatus: [],
    img:'',

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

  off: function() {
    wx.showLoading({
      title: '正在退出...',
      mask: true
    })
    ajax.postApi('app/member/clearSession', {

    }, (err, res) => {
      wx.hideLoading()
      if (res && res.success) {
        wx.reLaunch({
          url: '../bind/bind'
        })
      } else {
        wx.showToast({
          title: res.text,
          duration: 1000
        })
      }
    })	
  },


  //选择状态
  selectStatus: function(e) {
    var curCode = e.target.dataset.code;
    this.setData({
      curCode
    })
  },

  //手写板
  toHandwrite: function(e) {
    wx.navigateTo({
      url: '../handwriting/handwriting?callbackField=img'
    })
  },

  //跳转到个人资料页面
  toPersonal: function(e) {
    wx.navigateTo({
      url: '../personal/personal'
    })
  },

  //跳转到服务中心页面
  toService: function (e) {
    wx.navigateTo({
      url: '../custom/custom'
    })
  },

  //跳转到子账户页面
  toAccount: function(e) {
    wx.navigateTo({
      url: '../account/account'
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

  setBackgroundImg() {
    const myBanner = storage.get('appBackgroundIndexImg' + app.globalData.memberInfo.platform_app_area)
    if (!myBanner) {
      ajax.getApi('app/work/getBanner', {
        banner_type: 2
      }, (err, res) => {
        if (res && res.success) {
          const img = res.data.banner_img
          if (img) {
            storage.put('appBackgroundIndexImg' + app.globalData.memberInfo.platform_app_area, img, 12 * 60 * 60)
            this.setData({
              myBanner: img,
            })
          }
        }
      })
    } else {
      this.setData({
        myBanner,
      })
    }
  },

  onLoad: function() {
    this.initUserInfo()
    this.getMemberInfo()
    this.setBackgroundImg()
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
          if(res.data instanceof Array && res.data.length > 0) {
            wx.setStorageSync('orderStatus' + app.globalData.memberInfo.id, res.data)
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
      })
      if (orderStatus.length > 0) {
        this.setData({
          curCode: orderStatus[0].code
        }) 
      }
    }
  },



  getNavDataByRole: function(navs) {
    navs.forEach((v,i) => {
      const code = v.code
      ajax.getApi('app/member/getNavDataByRole', {
        code
      }, (err, res) => {
        if (res && res.success) {
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
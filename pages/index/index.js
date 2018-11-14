//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    nickId: "13648372638", //虚拟数据
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),

    orderStatus: [{
      name: "货运单发出",
    }, {
      name: "货运单接收",
    }, ],

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
        to: "",
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
        to: "",
      }, {
        img: "../../images/my6.png",
        label: "建议反馈",
        to: "",
      }, ]
    }]
  },


  //选择状态
  selectStatus: function(e) {
    var index = e.target.dataset.index;
    this.setData({
      selectStatus: index
    })
  },

  //跳转到个人资料页面
  toPersonal: function(e) {
    wx.navigateTo({
      url: '../personal/personal'
    })
  },






  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function() {
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
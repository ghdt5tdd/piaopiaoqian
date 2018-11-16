// pages/home/home.js
const ajax = require('../../utils/ajax.js')
const util = require('../../utils/util.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    vipAvatar: "../../images/avatar-sy.png",
    vipLevel: "../../images/Vip2.png",
    vipName: "长安物流",
    vipSpec: "LV1",
    optScan: "../../images/scan-m.png",
    optFunc: "../../images/add.png",
    hideList: true,
    listItems: [{
      image: "../../images/abnormal.png",
      name: "异常上报",
      to: 'toAbnormal'
    }, {
      image: "../../images/abnormal.png",
      name: "预约下单",
      to: 'toAppoint'
    }],
    memberInfo: null,
    banner: "../../images/banner.jpg",
    newsUrls: [{
        index: 0,
        info: [{
          style: "通知",
          name: "APP将于10月25日9：00至11：00进行更新",
          to: "toNews"
        }, {
          style: "新闻",
          name: "德力西电气全新官网，服务品质再度升级",
          to: "toNews"
        }]
      }, {
        index: 1,
        info: [{
          style: "新闻",
          name: "人事自助服务终端‘德家小AI惊艳面世’",
          to: "toNews"
        }, {
          style: "公告",
          name: "vivo手机GPS持续上传设置方法",
          to: "toNews"
        }]
      }, {
        index: 2,
        info: [{
          style: "新闻",
          name: "德力西电气再添新功能，下单寄送一体化",
        }, {
          style: "公告",
          name: "小米手机GPS持续上传设置方法",
        }]
      }

    ],
    indicatorDots: false,
    vertical: true, //纵向滑动
    circular: true, //衔接动画
    autoplay: true,
    interval: 4000,
    duration: 1000,


    moduleItems: [{
      image: "../../images/model1.png",
      name: "订单查询",
      to: 'toOrder'
    }, {
      image: "../../images/model8.png",
      name: "预约下单",
      to: 'toAppoint'
    }, {
      image: "../../images/model3.png",
      name: "货运单交接",
      to: 'toHandover'
    }, {
      image: "../../images/model3.png",
      name: "货运单签收",
      to: 'toSign'
    }, {
      image: "../../images/model4.png",
      name: "异常上报",
      to: 'toAbnormal'
    }, {
      image: "../../images/model2.png",
      name: "物流跟踪",
      to: 'toTransport'
    }, {
      image: "../../images/model5.png",
      name: "统计报表",
      to: 'toForm'
    }, {
      image: "../../images/model9.png",
      name: "预警提示",
      to: 'toWarn'
    }, ],



  },

  //打开收起下拉菜单
  showList: function(e) {
    var param = e.currentTarget.dataset.param;
    this.setData({
      hideList: param == 1 ? (!this.data.hideList) : false,
    });
  },

  //跳转到新闻列表页面
  toNewslist: function(e) {
    wx.navigateTo({
      url: '../newslist/newslist'
    })
  },

  //跳转到新闻详情页面
  toNews: function(e) {
    wx.navigateTo({
      url: '../news/news'
    })
  },

  //跳转到订单查询页面
  toOrder: function(e) {
    wx.navigateTo({
      url: '../order/order'
    })
  },

  //跳转到预约下单页面
  toAppoint: function(e) {
    wx.navigateTo({
      url: '../appoint/appoint'
    })
  },

  //跳转到货运单交接页面
  toHandover: function(e) {
    wx.navigateTo({
      url: '../handover/handover'
    })
  },

  //跳转到货运单签收页面
  toSign: function(e) {
    wx.navigateTo({
      url: '../sign/sign'
    })
  },

  //跳转到异常上报页面
  toAbnormal: function(e) {
    wx.navigateTo({
      url: '../abnormal/abnormal'
    })
  },

  //跳转到物流跟踪页面
  toTransport: function(e) {
    wx.navigateTo({
      url: '../transport/transport'
    })
  },


  //跳转到预警提示页面
  toWarn: function(e) {
    wx.navigateTo({
      url: '../warn/warn'
    })
  },



  //跳转到统计报表页面
  toForm: function(e) {
    wx.navigateTo({
      url: '../form/form'
    })
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getMemberInfo()
    this.getNewsList()
  },

  getNewsList () {
    ajax.getApi('app/member/getShopNewsList', {
      page: 0,
      pageSize: 10
    }, (err, res) => {
      console.log(res)
      if (res && res.success) {
        
      }
    })	
  },

  getMemberInfo () {
    if (app.globalData.memberInfo === null) {
      wx.showToast({
        title: '用户信息缺失，请重新登录',
        icon: 'loading',
        duration: 1000,
        mask: true
      })
      setTimeout(function () {
        wx.redirectTo({
          url: '../bind/bind'
        })
      }, 1000);
    } else {
      this.setData({
        memberInfo: app.globalData.memberInfo
      })
      console.log(app.globalData.memberInfo)
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})
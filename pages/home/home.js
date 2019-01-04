// pages/home/home.js
const ajax = require('../../utils/ajax.js')
const util = require('../../utils/util.js') 
const app = getApp()
const moduleItemImgs = new Map()
moduleItemImgs.set('0', { img: '../../images/model1.png', to: 'toOrder' })//订单查询
moduleItemImgs.set('1', { img: '../../images/model8.png', to: 'toAppoint' })//预约下单
moduleItemImgs.set('2', { img: '../../images/model3.png', to: 'toHandover' })//货运单交接
moduleItemImgs.set('3', { img: '../../images/model2.png', to: 'toTransport' })//物流跟踪
moduleItemImgs.set('4', { img: '../../images/model4.png', to: 'toAbnormal' })//异常上报
moduleItemImgs.set('5', { img: '../../images/model9.png', to: 'toWarn' })//预警提示
moduleItemImgs.set('6', { img: '../../images/model5.png', to: 'toForm' })//统计报表
moduleItemImgs.set('9', { img: '../../images/model3.png', to: 'toSign' })//货运单签收

//这两个暂时还没有
moduleItemImgs.set('7', { img: '../../images/model3.png', to: '' })//预约订单
moduleItemImgs.set('8', { img: '../../images/model3.png', to: 'toReceive' })//货运单接受

//新加的，还没确定
moduleItemImgs.set('10', { img: '../../images/model10.png', to: 'toOut' })//外出报告
moduleItemImgs.set('11', { img: '../../images/model11.png', to: 'toDaily' })//工作报告
moduleItemImgs.set('12', { img: '../../images/model12.png', to: 'toVisitor' })//访客邀约
moduleItemImgs.set('13', { img: '../../images/model13.png', to: 'toRegister' })//访客登记

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
    newsList: [],
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


    moduleItemImg:{

    },
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

  //跳转到外出报告页面
  toOut: function (e) {
    wx.navigateTo({
      url: '../out/out'
    })
  },

  //跳转到工作报告页面
  toDaily: function (e) {
    wx.navigateTo({
      url: '../daily/daily'
    })
  },

  //跳转到访客邀约页面
  toVisitor: function (e) {
    wx.navigateTo({
      url: '../visitor/visitor'
    })
  },

  //跳转到访客登记页面
  toRegister: function (e) {
    wx.navigateTo({
      url: '../visitorRegister/visitorRegister'
    })
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
      url: '../news/news?id=' + e.target.dataset.newsId
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

  //跳转到货运单接收页面
  toReceive: function(e) {
    wx.navigateTo({
      url: '../receive/receive'
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
    this.getModulesByRole()
  },

  getModulesByRole () {
    const moduleItems = wx.getStorageSync('moduleItems' + app.globalData.memberInfo.id)
    if (moduleItems === '') {
      ajax.getApi('app/member/getModulesByRole', {

      }, (err, res) => {
        if (res && res.success) {
          wx.setStorageSync('moduleItems' + app.globalData.memberInfo.id, res.data)
          this.setData({
            moduleItems: res.data
          }, () => {
            this.getModulesInfo()
          })
        }
      })
    } else {
      this.setData({
        moduleItems
      }, () => {
        this.getModulesInfo()
      })
    }
  },

  getModulesInfo() {
    const moduleItems = this.data.moduleItems
    moduleItems.forEach(v => {
      const itemKey = v.itemKey
      const moduleInfo = moduleItemImgs.get(itemKey)
      v.img = moduleInfo.img
      v.to = moduleInfo.to
    })

    this.setData({
      moduleItems
    })
  },

  getNewsList () {
    const now = util.getFormatDate()
    const newsInfo = wx.getStorageSync('newsInfo')
    if (newsInfo && newsInfo.expire === now) {
      this.setData({
        newsList: newsInfo.data
      })
    }else {
      ajax.getApi('app/member/getShopNewsList', {
        page: 0,
        pageSize: 10
      }, (err, res) => {
        if (res && res.success) {
          this.setData({
            newsList: res.data
          })
          wx.setStorageSync('newsInfo', {
            data: res.data,
            expire: now
          })
        }
      })	
    }
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
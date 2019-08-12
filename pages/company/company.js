//pages/company/company.js
const app = getApp()
const ajax = require('../../utils/ajax.js')
const util = require('../../utils/util.js')
// 引入SDK核心类
var QQMapWX = require('../qqmap/qqmap-wx-jssdk.js')
var demo = new QQMapWX({
  key: app.globalData.qqMapKey // 必填 换成自己申请到的
})

Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 0, 
    pageSize : 10,
    begin: "城市",
    companyItems: []
  },

  lower: function (e) {
    console.log(e)
  },

  /*城市选择事件 */
  BeginCity: function() {
    wx.navigateTo({
      url: '../city/city?cityType=begin',
    })
  },

  //拨打电话
  bookTel: function(e) {
    var tel = e.currentTarget.dataset.tel
    
    wx.makePhoneCall({
      phoneNumber: tel
    })
  },

  //导航
  navigation: function(e) {
    console.log(e)
    //地址解析(地址转坐标)     
    demo.geocoder({
      address: e.currentTarget.dataset.location,

      success: function(res) {
        console.log(res)
        var latitude = res.result.location.lat
        var longitude = res.result.location.lng
        var addressOn = e.currentTarget.dataset.location
        // 取到坐标并打开地图
        wx.openLocation({
          latitude: latitude,
          longitude: longitude,
          address: addressOn,
          scale: 28
        })
      },
      fail: function(res) {
        console.log(res);
      },
      complete: function(res) {
        console.log(res);
      }
    });
  },

  //选择企业
  toBind: function(e) {
    var logo = e.currentTarget.dataset.logo
    var title = e.currentTarget.dataset.name
    var area = e.currentTarget.dataset.area
    wx.navigateBack({ //返回
      delta: 1
    })
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2]; //上一个页面
    //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
    prevPage.setData({
      logo: logo,
      title: title,
      area: area,
      loginUsername: '',
      loginPassword: '',
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    ajax.getApi('app/common/getShopListByGrant', { 
      page: this.data.page,
      pageSize: this.data.pageSize,
      app_area: app.globalData.piaopiaoQianAppArea
    }, (err, res) => {
      if (res && res.success) {
        util.handleImgUrl(res.data, 'logo_img')
        this.setData({
          companyItems: res.data
        })
      }
    })
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
    if (app.globalData.trainBeginCity == undefined) {
      this.setData({
        begin: "城市",
      })
    } else {
      this.setData({
        begin: app.globalData.trainBeginCity,
      })
    }
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
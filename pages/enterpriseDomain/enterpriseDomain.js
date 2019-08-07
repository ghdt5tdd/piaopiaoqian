// pages/enterpriseDomain/enterpriseDomain.js
const ajax = require('../../utils/ajax.js')
const util = require('../../utils/util.js')
const storage = require('../../utils/storage.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    company: ''
  },

  switch: function (e) {
    wx.redirectTo({
      url: '../enterprise/enterprise'
    })
  },

  scan(e) {
    const _this = this
    wx.scanCode({
      success(res) {
        _this.setData({
          company: res.result
        }, () => {
          _this.searchCompany()
        })
      }
    })
  },

  searchCompany(e) {
    wx.showLoading({
      title: '查找中...',
    })
    ajax.getApi('app/common/getGrantShopByKeyword', {
      keyword: this.data.company,
      app_area: app.globalData.piaopiaoQianAppArea
    }, (err, res) => {
      wx.hideLoading()
      if (res && res.success) {
        util.handleImgUrl(res.data, 'logo_img')
        const logo = res.data.logo_img
        const title = res.data.company
        const area = res.data.shop_area
        var pages = getCurrentPages();
        if (pages.some(v => v.route === 'pages/bind/bind')) {
          var prevPage = pages[pages.length - 2]; //上一个页面
          //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
          prevPage.setData({
            logo: logo,
            title: title,
            area: area,
            loginUsername: '',
            loginPassword: '',
          })
          wx.navigateBack({
            delta: 1
          })
        } else {
          wx.redirectTo({
            url: '../bind/bind?area=' + area + '&title=' + title + '&logo=' + logo,
          })
        }
      } else {
        wx.showToast({
          title: '查不到此企业',
        })
      }
    })
  },

  //输入筛选条件
  bindinput: function (e) {
    this.setData({
      company: e.detail.value
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2]; //上一个页面
    console.log(pages)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
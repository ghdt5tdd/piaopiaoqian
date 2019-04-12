// pages/noticeOrder/noticeOrder.js
const ajax = require('../../utils/ajax.js')
const util = require('../../utils/util.js')
const storage = require('../../utils/storage.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    pageSize: 10,
    loadCompleted: false,
    noticeItem: [{
      title: "长内容",
      time: "2018-01-15 10:08",
      info: "近日，凭借持续不断的品牌创新和专业高效的服务质量，德力西电气顺利通过了国家标准的五星品牌和五星售后服务体系认证监督年审。此次认证也是德力西电气连续第8年获得五星服务认证、连续第4年获得五星品牌认证，达成了连续4年的“双五星”资质认证",
      read: false, //消息未读
    }, {
      title: "德力西电气消息",
      time: "2018-01-09 15:32",
      info: "“产品中心”细化为七大分类，让您能够在多达579个的德家产品中，快速查询到所需要的内容。",
      read: true,
    }, {
      title: "长内容",
      time: "2018-01-08 10:08",
      info: " 据“客户满意度调研报告”显示，凭借完善的售后服务体系，德力西电气不论品牌还是服务的满意度都处于行业领先水平",
      read: false, //消息未读
    }, ]
  },


  //去消息详情
  toInfo: function (e) {
    const id = e.currentTarget.dataset.id
    const index = e.currentTarget.dataset.index
    wx.navigateTo({
      url: '../noticeInfo/noticeInfo?id=' + id + '&index=' + index
    })
  },
  
  getMyMessageList: function (callback) {
    const page = this.data.page
    const pageSize = this.data.pageSize
    const message_type_id = this.data.typeId
    ajax.getApi('app/member/getMyMessageList', {
      page,
      pageSize,
      message_type_id
    }, (err, res) => {
      if (res && res.success) {
        if (res.data.length > 0) {
          const noticeItem = this.data.noticeItem
          Array.prototype.push.apply(noticeItem, res.data);
          this.setData({
            noticeItem
          })
        } else {
          wx.hideLoading(() => {
            wx.showToast({
              title: '数据已全部加载完毕',
              duration: 1000
            })
          })
          this.setData({
            loadCompleted: true
          })
        }
      }
      if (callback) {
        callback()
      }
    })
  },

  lower: function (e) {
    let page = this.data.page
    const pageSize = this.data.pageSize
    const loadCompleted = this.data.loadCompleted
    if (!loadCompleted) {
      wx.showLoading({
        title: '更多数据加载中...',
      })
      page++
      this.setData({
        page
      }, () => {
        this.getMyMessageList(() => {
          wx.hideLoading()
        })
      })
    } else {
      wx.showToast({
        title: '数据已全部加载完毕',
        duration: 1000
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const typeId = options.typeId
    const typeImg = options.typeImg

    this.setData({
      typeId,
      typeImg,
      page: 1,
      noticeItem: [],
      loadCompleted: false
    }, () => {
      this.getMyMessageList()
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
    // this.setData({
    //   page: 1,
    //   noticeItem: [],
    //   loadCompleted: false
    // }, () => {
    //   this.getMyMessageList()
    // })
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
// pages/notice/notice.js
const ajax = require('../../utils/ajax.js')
const app = getApp()
var order = ['red', 'yellow', 'blue', 'green', 'red']
Page({

  /**
   * 页面的初始数据
   */
  data: {
    exceptionMessageCount: 0,
    noticeCount: 0,
    sellerOrderMessageCount: 0,
    shopOrderMessageCount: 0
  },

//运单消息
  toTransport: function(e) {
    wx.navigateTo({
      url: '../noticeTransport/noticeTransport'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getUnreadMessageCount()
  },

  getUnreadMessageCount() {
    ajax.getApi('app/member/getUnreadMessageCount', {

    }, (err, res) => {
      if (res && res.success) {
        const exceptionMessageCount = res.data.exceptionMessageCount
        const noticeCount = res.data.noticeCount
        const sellerOrderMessageCount = res.data.sellerOrderMessageCount
        const shopOrderMessageCount = res.data.shopOrderMessageCount
        this.setData({
          exceptionMessageCount,
          noticeCount,
          sellerOrderMessageCount,
          shopOrderMessageCount
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
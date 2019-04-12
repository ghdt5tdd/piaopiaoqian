// pages/noticeInfo/noticeInfo.js
const ajax = require('../../utils/ajax.js')
const util = require('../../utils/util.js')
const storage = require('../../utils/storage.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    messageInfo: {}
  },

  getMessageInfo(id, index) {
    wx.showLoading({
      title: '读取中...',
    })

    ajax.getApi('app/member/getMessageInfo', {
      id
    }, (err, res) => {
      wx.hideLoading()
      if (res && res.success) {
        this.setData({
          messageInfo: res.data
        })
        const pages = getCurrentPages();
        const prevPage = pages[pages.length - 2]; //上一个页面
        const noticeItem = prevPage.data.noticeItem
        noticeItem[index].is_read = 1
        prevPage.setData({
          noticeItem
        })
          // is_read
      } else {
        if (res.text) {
          wx.showToast({
            title: res.text,
            duration: 1000
          })
        }
      }
    })	
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const id = options.id
    const index = options.index
    this.getMessageInfo(id, index)
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
// pages/enterInfo/enterInfo.js
const ajax = require('../../utils/ajax.js')
const util = require('../../utils/util.js')
const storage = require('../../utils/storage.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectOrder:undefined,
  },

  preview(e) {
    const index = e.currentTarget.dataset.index
    const currentImg = this.data.selectOrder.return_receipt_img[index]

    wx.previewImage({
      urls: this.data.selectOrder.return_receipt_img,
      current: currentImg
    })
  },

  getOrder(shopOrderId) {
    wx.showLoading({
      title: '查询中..',
    })

    ajax.getApi('app/order/getShopOrderDetail', {
      shopOrderId
    }, (err, res) => {
      wx.hideLoading()
      if (res && res.success) {
        this.setData({
          selectOrder: res.data
        })
      } else {
        wx.showToast({
          title: '运单获取失败',
        })
      }
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getOrder(options.id)
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
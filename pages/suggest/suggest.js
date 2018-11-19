// pages/suggest/suggest.js
const ajax = require('../../utils/ajax.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    suggest: "" 
  },

  suggest: function(e) {
    this.setData({
      suggest: e.detail.value
    })
  },

  commit: function() {
    const feedback_content = this.data.suggest
    wx.showLoading({
      title: '提交中...',
    })

    ajax.postApi('app/member/feedback', {
      feedback_content
    }, (err, res) => {
      wx.hideLoading()
      if (res && res.success) {
        wx.showToast({
          title: '提交成功',
          duration: 1000
        })

        wx.navigateBack({
          delta: 1
        })
      }
    })	

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
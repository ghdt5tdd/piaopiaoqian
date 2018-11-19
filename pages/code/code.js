// pages/code/code.js
const ajax = require('../../utils/ajax.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    systemInfo: {

    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let systemInfo = wx.getStorageSync('systemInfo')
    console.log(systemInfo)
    if(systemInfo === '') {
      wx.getSystemInfo({
        success: res => {
            console.log(res)
            this.setData({
              systemInfo: {
                brand: res.brand,
                model: res.model,
                system: res.system,
                platform: res.platform,
                screenWidth: res.screenWidth,
                screenHeight: res.screenHeight
              }
            })
        }
      })
    }else {
      this.setData({
        systemInfo
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
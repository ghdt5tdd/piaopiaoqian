// pages/formSheetdaily/formSheetdaily.js
const ajax = require('../../utils/ajax.js')
const util = require('../../utils/util.js')
const storage = require('../../utils/storage.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    daily: [{
      date: "2019-06-12 21:25",
      name: "delixi",
      info: "月对账单对账确认"
    }, {
      date: "2019-06-12 21:16",
      name: "delixi",
      info: "月对账单重新计费确认"
    }, {
      date: "2019-06-12 21:12",
      name: "delixi",
      info: "月对账单更新数据"
    }, {
      date: "2019-06-12 20:06",
      name: "delixi",
      info: "月对账单对账异议退回"
    }, {
      date: "2019-06-12 19:24",
      name: "delixi",
      info: "生成月对账单"
    }, ],
    dailyData: [],
    page: 1,
    pageSize: 20,
    loadCompleted: false,
  },

  lower: function (e) {
    let page = this.data.page
    const pageSize = this.data.pageSize
    const loadCompleted = this.data.loadCompleted
    if (!loadCompleted) {
      wx.showLoading({
        title: '加载中...',
      })
      page++
      this.setData({
        page
      }, () => {
        this.getListData()
      })
    } else {
      wx.showToast({
        title: '数据加载完毕',
        duration: 1000
      })
    }
  },

  getListData() {
    wx.showLoading({
      title: '加载数据中...',
    })
    ajax.getApi('app/payable/listMonthSettleLogs', {
      month_id: this.data.month_id,
      currentPage: this.data.page,
      pageSize: this.data.pageSize,
    }, (err, res) => {
      wx.hideLoading()
      if (res && res.success) {
        if (res.data.length > 0) {
          const dailyData = this.data.dailyData
          Array.prototype.push.apply(dailyData, res.data);
          this.setData({
            dailyData
          })
        } else {
          wx.hideLoading(() => {
            wx.showToast({
              title: '已全部加载',
              duration: 1000
            })
          })
          this.setData({
            loadCompleted: true
          })
        }
      }
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const month_id = options.id

    this.setData({
      month_id
    }, () => {
      this.getListData()
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
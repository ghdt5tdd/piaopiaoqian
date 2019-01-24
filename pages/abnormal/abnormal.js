// pages/abnormal/abnormal.js
const ajax = require('../../utils/ajax.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectStatus: 1,
    page: 1, 
    pageSize: 10,
    ul: "ul-2",
    abnormalItems: [],
    loadCompleted: false
  },


  //选择状态
  selectStatus: function(e) {
    var index = e.target.dataset.index;
    this.setData({
      page: 1,
      pageSize: 10,
      abnormalItems: [],
      selectStatus: index,
      loadCompleted: false
    }, () => {
      wx.showLoading({
        title: '数据加载中...',
      })
      this.getExceptionList(() => {
        wx.hideLoading()
      })
    })
  },


  //跳转到上报异常页面
  toReport: function(e) {
    wx.navigateTo({
      url: '../report/report'
    })
  },

  
  //跳转到异常详情页面
  toInfo: function(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../abnormalinfo/abnormalinfo?id=' + id
    })
  },




  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({
      title: '数据加载中...',
    })
    this.getExceptionList(() => {
      wx.hideLoading()
    })
  },

  getExceptionList: function (callback) {
    const type = this.data.selectStatus
    const page = this.data.page
    const pageSize = this.data.pageSize
    ajax.getApi('app/order/getExceptionList', {
      type,
      page,
      pageSize
    }, (err, res) => {
      if (res && res.success) {
        if (res.data.length > 0) {
          const abnormalItems = this.data.abnormalItems
          Array.prototype.push.apply(abnormalItems, res.data);
          this.setData({
            abnormalItems
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
        this.getExceptionList(() => {
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
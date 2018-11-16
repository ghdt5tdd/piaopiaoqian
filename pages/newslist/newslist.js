// pages/newslist/newslist.js
const ajax = require('../../utils/ajax.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    pageSize: 10,
    loadCompleted: false,
    newsList:[],
  },



  //跳转到新闻详情页面
  toDetail: function(e) {
    wx.navigateTo({
      url: '../news/news?id=' + e.target.dataset.newsId
    })
  },

  lower:function(e) {
    let page = this.data.page
    const pageSize = this.data.pageSize
    const loadCompleted = this.data.loadCompleted
    console.log(page, pageSize)
    if (!loadCompleted) {
      wx.showLoading({
        title: '更多新闻加载中...',
      })
      page++
      this.setData({
        page
      }, () => {
        this.getNewsList(() => {
          wx.hideLoading()
        })
      })
    } else {
      wx.showToast({
        title: '新闻已全部加载完毕',
        duration: 1000
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getNewsList()
  },

  getNewsList: function (callback) {
    ajax.getApi('app/member/getShopNewsList', {
      page: this.data.page,
      pageSize: this.data.pageSize
    }, (err, res) => {
      console.log(res)
      if (res && res.success) {
        if(res.data.length > 0) {
          const newsList = this.data.newsList
          Array.prototype.push.apply(newsList, res.data);
          this.setData({
            newsList
          })
        }else {
          wx.hideLoading(() => {
            wx.showToast({
              title: '新闻已全部加载完毕',
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
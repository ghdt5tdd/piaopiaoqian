// pages/newslist/newslist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newsItems: [{
      avatar: "../../images/logo-s.png",
      style: "通知",
      name: "关于2018-02至2018-02-25期间停止所有物流商品配送说明 ",
      time: "2018-01-12",
      pic: "../../images/news-s.png",
      collect: "500",
      comment: "24",
      to: "toNews"

    }, {
      avatar: "../../images/logo-s.png",
      style: "通知",
      name: "APP将于10月25日9：00至11：00进行更新",
      time: "2018-01-12",
      pic: "../../images/news-s.png",
      collect: "500",
      comment: "24",
      to: "toNews"
    }, {
      avatar: "../../images/logo-s.png",
      style: "新闻",
      name: "德力西电气全新官网，服务品质再度升级",
      time: "2018-01-12",
      pic: "../../images/news-s.png",
      collect: "500",
      comment: "24",
      to: "toNews"
    }, {
      avatar: "../../images/logo-s.png",
      style: "新闻",
      name: "人事自助服务终端‘德家小AI惊艳面世’",
      time: "2018-01-12",
      pic: "../../images/news-s.png",
      collect: "500",
      comment: "24",
      to: "toNews"
    }, {
      avatar: "../../images/logo-s.png",
      style: "公告",
      name: "小米手机GPS持续上传设置方法",
      time: "2018-01-12",
      pic: "../../images/news-s.png",
      collect: "500",
      comment: "24",
      to: "toNews"
    }, ],



  },



  //跳转到新闻详情页面
  toNews: function(e) {
    wx.navigateTo({
      url: '../news/news'
    })
  },




  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
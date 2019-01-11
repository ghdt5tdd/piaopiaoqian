// pages/notice/notice.js
var order = ['red', 'yellow', 'blue', 'green', 'red']
Page({

  /**
   * 页面的初始数据
   */
  data: {
    noticeBar: [{
      img: "../../images/notice1.png",
      name: "通知公告",
      num: '',
      to: ""
    }, {
      img: "../../images/notice2.png",
      name: "运单消息",
      num: '',
      to: "toTransport"
    }, {
      img: "../../images/notice3.png",
      name: "订单消息",
      num: '3',
      to: ""
    }, {
      img: "../../images/notice4.png",
      name: "异常消息",
      num: '',
      to: ""
    },]

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
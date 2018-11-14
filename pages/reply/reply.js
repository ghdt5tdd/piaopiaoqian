// pages/reply/reply.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    newsReply: [{
      avatar: "../../images/friend3.png",
      name: "小熊饼干",
      time: "2018-01-25  15:32",
      info: "天啦噜，快递这么早就停运了啊，我还有很多东西想买呢，抓紧时间买买买。",
    }, {
      avatar: "../../images/friend2.png",
      name: "尖叫的土拨鼠",
      time: "2018-01-25  15:32",
      info: "天啦噜，快递这么早就停运了啊，我还有很多东西想买呢，抓紧时间买买买。",
    }, {
      avatar: "../../images/friend1.png",
      name: "云朵朵",
      time: "2018-01-25  15:32",
      info: "天啦噜，快递这么早就停运了啊，我还有很多东西想买呢，抓紧时间买买买。",
    }],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      Avatar: options.avatar,
      Name: options.name,
      Time: options.time,
      Info: options.info,
      Sum: options.sum,
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
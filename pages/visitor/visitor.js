// pages/visitor/visitor.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderStatus: [{
      name: "待登记",
    }, {
      name: "使用中",
    }, {
      name: "已过期",
    }, ],
    selectStatus: 0,
    ul: "ul-3",

    visitorRecord: [{
      name: "李思",
      time: "2018-09-11",
      status: "待登记",

    }, {
      name: "徐明明",
      time: "2018-09-11",
      status: "使用中",
      card: "422*************11",
      tel: "13526351527",
      num:"2",
    }, {
      name: "周鹏",
      time: "2018-09-11",
      status: "已过期",
      card: "422*************63",
      tel: "13665340901",
      num:"3"
    }]

  },

  //选择状态
  selectStatus: function(e) {
    var index = e.target.dataset.index;
    this.setData({
      selectStatus: index
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
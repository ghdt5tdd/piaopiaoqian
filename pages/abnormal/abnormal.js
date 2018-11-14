// pages/abnormal/abnormal.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderStatus: [{
      name: "我上报的",
    }, {
      name: "通知我的",
    }, ],
    selectStatus: 0,
    ul: "ul-2",

    abnormalItems: [{
      name: "张三",
      time: "2018-01-08",
      status: "等待处理",
      row: [{
        label: "异常类型",
        name: "货损",
      }, {
        label: "发生环节",
        name: "取货",
      }, {
        label: "联系人",
        name: "张三",
      }],
    }, {
      name: "张三",
      time: "2018-01-08",
      status: "等待处理",
      row: [{
        label: "异常类型",
        name: "货损",
      }, {
        label: "发生环节",
        name: "取货",
      }, {
        label: "联系人",
        name: "张三",
      }],
    }],
  },


  //选择状态
  selectStatus: function(e) {
    var index = e.target.dataset.index;
    this.setData({
      selectStatus: index
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
    wx.navigateTo({
      url: '../abnormalinfo/abnormalinfo'
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
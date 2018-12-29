// pages/workList/workList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderStatus: [{
      name: "待受理",
    }, {
      name: "待确认",
    }, {
      name: "待评价",
    }, {
      name: "已完成",
    }, ],
    selectStatus: 0,
    ul: "ul-4",

    abnormalItems: [{
      id: "1353426896419",
      time: "2018-01-08",
      status: "待评价",
      name: "服务器远程受影响",
      info: "服务器远程进去就让我们修复，修复其他选项点了都没用，只有系统还原没有点，这个怎么处理，急急急。点了系统还原之后C盘或者D盘是不是就格式化了",
      import: "重要",
      btn: "去评价",
      open: "toComment",
    }, {
      id: "1353426896419",
      time: "2018-01-08",
      status: "待确认",
      name: "业务咨询受影响",
      info: "点击业务咨询按钮不跳转或者咨询对话框卡死",
      import: "一般",
      btn: "确认",
      open: "sure",
    }],
  },


  //选择状态
  selectStatus: function(e) {
    var index = e.target.dataset.index;
    this.setData({
      selectStatus: index
    })
  },


  //评价工单
  toComment: function(e) {
    wx.navigateTo({
      url: '../workComment/workComment'
    })
  },

  //确认工单
  sure: function(e) {

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
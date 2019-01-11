// pages/goodsdetail/goodsdetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    levelTotal: "1081",
    levelNum: "level4",
    levelPic: "../../images/b_blue_4.gif",
    levelRate: "28%",
    tableTh: [{
      title: ""
    }, {
      title: "好评"
    }, {
      title: "中评"
    }, {
      title: "差评"
    }, {
      title: "总计"
    }, {
      title: "服务率"
    }, ],

    tableTr: [{
      td: [{
        name: "最近一周"
      }, {
        name: "0"
      }, {
        name: "1"
      }, {
        name: "1"
      }, {
        name: "2"
      }, {
        name: "-50%"
      }, ]
    }, {
      td: [{
        name: "最近1个月"
      }, {
        name: "6"
      }, {
        name: "10"
      }, {
        name: "7"
      }, {
        name: "23"
      }, {
        name: "-4%"
      }, ]
    }, {
      td: [{
        name: "最近3个月"
      }, {
        name: "18"
      }, {
        name: "10"
      }, {
        name: "8"
      }, {
        name: "36"
      }, {
        name: "28%"
      }, ]
    }, {
      td: [{
        name: "最近6个月"
      }, {
        name: "18"
      }, {
        name: "10"
      }, {
        name: "8"
      }, {
        name: "36"
      }, {
        name: "28%"
      }, ]
    }, {
      td: [{
        name: "6个月前"
      }, {
        name: "0"
      }, {
        name: "0"
      }, {
        name: "0"
      }, {
        name: "0"
      }, {
        name: "0%"
      }, ]
    }, {
      td: [{
        name: "总计"
      }, {
        name: "1600"
      }, {
        name: "10"
      }, {
        name: "8"
      }, {
        name: "36"
      }, {
        name: "28%"
      }, ]
    }, ]





  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    
    //计算宽度
    var query = wx.createSelectorQuery();
    var that = this;
    query.select('.table').boundingClientRect(function(rect) {
      console.log(rect.width)
      that.setData({
        goodsWidth: rect.width + 'px'
      })
    }).exec();
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
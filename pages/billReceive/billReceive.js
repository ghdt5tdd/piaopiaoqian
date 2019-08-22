// pages/enter/enter.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderStatus: [{
      name: "未接收",
    }, {
      name: "已接收",
    }, ],
    selectStatus: 0,
    

    order: [{
      id: "18352790283072",
      time: "2018-01-10",
      start: "始发站一",
      end: "到达站二",
      bar: [{
        label: "车次",
        info: "车次03",
      }, {
        label: "车号",
        info: "浙C11A6X",
      }, {
        label: "司机",
        info: "张三 13622551425",
      }, {
        label: "货物件数",
        info: "16件",
      }, {
        label: "发车时间",
        info: "2018-01-11 12:53",
      }, {
        label: "预计到达时间",
        info: "2018-01-15 18:00",
      }, {
        label: "实际到达时间",
        info: "2018-01-15 16:27",
      }, {
        label: "备注",
        info: "货物为易碎品，轻拿轻放",
      }],
      status: "待接收",
      opt: [{
        name: "查看详情",
        open: "toInfo",
        line: true
      }, {
        name: "接收",
        open: "toReport"
      }]
    }, ],



  },



  //选择我的订单状态
  selectStatus: function(e) {
    var index = e.target.dataset.index;
    this.setData({
      selectStatus: index
    })
  },

  //运单详情
  toInfo: function(e) {
    wx.navigateTo({
      url: '../enterInfo/enterInfo'
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
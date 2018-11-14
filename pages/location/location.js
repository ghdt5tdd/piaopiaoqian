// pages/location/location.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    map: "../../images/map.jpg",
    popup: false,
    status: "在途中",
    locationInfo: [{
      label: "承运商",
      name: "浙江乐清物流",
    }, {
      label: "预计到达时间",
      name: "剩余5小时",
    }, {
      label: "司机",
      name: "安振龙",
    }, {
      label: "联系方式",
      name: "13628353926",
    }],

    billId: "2018362902037",
    billTime: "2018-01-10",
    routeStart: "浙江乐清",
    routeEnd: "浙江杭州",
    receive: "杭州腾策机电设备有限公司",
    num: "120",
  },


  spread: function(e) {
    this.setData({
      popup: true,
    });
  },

  retract: function(e) {
    this.setData({
      popup: false,
    });
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
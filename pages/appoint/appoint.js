// pages/appoint/appoint.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    orderStatus: [{
      name: "全部",
    }, {
      name: "未接单",
    }, {
      name: "已接单",
    }, {
      name: "已派车",
    }, ],

    selectStatus: 0,

    ul: "ul-4",

    orderTable: [{
      id: "18352790283072",
      time: "2018-01-10",
      start: "浙江温州",
      end: "湖北武汉",
      receive: "武汉恒望科技有限公司",
      num: "210",
      opt: [{
        name: "拒绝",
        to: "refuse",
        style: 1,
      }, {
        name: "查看",
        to: "toDetail",
        style: 2,
      }, {
        name: "接单",
        to: "consent",
        style: 3,
      }],
    }, {
      id: "18352790280265",
      time: "2018-01-02",
      start: "浙江温州",
      end: "北京市",
      receive: "北京海淀雷蒙赛博机电技术有限公司",
      num: "150",
      opt: [{
        name: "查看",
        to: "toDetail",
        style: 2,
      }, {
        name: "派车",
        to: "toDispatch",
        style: 3,
      }],
    }, {
      id: "18352790283072",
      time: "2018-01-01",
      start: "浙江温州",
      end: "湖北武汉",
      receive: "武汉恒望科技有限公司",
      num: "210",
      opt: [{
        name: "查看",
        to: "toDetail",
        style: 2,
      }, {
        name: "派车",
        to: "toDispatch",
        style: 3,
      }],
    }, ],


  },


  //选择我的订单状态
  selectStatus: function(e) {
    var index = e.target.dataset.index;
    this.setData({
      selectStatus: index
    })
  },

  //下单
  toSend: function(e) {
    wx.navigateTo({
      url: '../place/place'
    })
  },

  //跳转到货运单详情页面
  toInfo: function (e) {
    wx.navigateTo({
      url: '../transportdetail/transportdetail'
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
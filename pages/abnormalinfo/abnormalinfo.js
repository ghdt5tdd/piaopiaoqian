// pages/abnormalinfo/abnormalinfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    abnormalItems: [{
      name: "张三",
      status: "等待处理",
      row: [{
        label: "异常类型",
        name: "货损",
      }, {
        label: "发生环节",
        name: "取货",
      }, {
        label: "异常内容",
        name: "武汉市洪山区交接时发现货物破损",
      }, {
        label: "发生地点",
        name: "湖北省武汉市洪山区关谷世贸中心",
      }, ],
    }, ],

    abnormalImgs: [{
      pic: "../../images/scene1.jpg"
    }, {
      pic: "../../images/scene2.jpg"
    }, {
      pic: "../../images/scene3.jpg"
    }, {
      pic: "../../images/scene2.jpg"
    }, ],

    bookName: "张三",
    bookTel: "15822937463",

    abnormalRecord: [{
      name: "温州物流",
      info: "查看异常上报",
      time: "2018-01-12",
    }, {
      name: "张三",
      info: "发起异常上报",
      time: "2018-01-08",
    }]
  },







  //拨打电话
  bookTel: function(e) {
    wx.makePhoneCall({
      phoneNumber: this.data.bookTel
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
// pages/outInfo/outInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    outid: "20181210124646",
    outstatus: "待确认",
    outcard: "1001",
    outname: "张三",
    outsole: "橡胶底3",
    outsoledrug: "894AH",
    outvamp: "棉布",
    outvampdrug: "894AH",
    outperson: "李思",
    outTel: "13522937463",

    outRecord: [{
      name: "客服A",
      info: "受理外出报告单",
      time: "2018-12-10 18:32",
    }, {
      name: "张三",
      info: "提交外出报告单",
      time: "2018-12-10 12:46",
    }]
    
  },



  //拨打电话
  bookTel: function(e) {
    wx.makePhoneCall({
      phoneNumber: this.data.outTel
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
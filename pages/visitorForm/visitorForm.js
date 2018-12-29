// pages/visitorForm/visitorForm.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    visitorname: "请填写您的姓名",
    visitorType: ['男', '女'],
    indexType: 0,
    visitortel: "请填写您的手机号",
    visitorcard: "请填写您的身份证号，将做加密处理",
    visitorcompany: "请填写您所属公司",
    visitordept: "请填写您所属部门",
  },


  //性别
  bindTypeChange: function(e) {
    this.setData({
      indexType: e.detail.value
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
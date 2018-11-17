// pages/changePassword/changePassword.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: "请输入账号",
    passwordold: "请输入原密码",
    password: "请输入新密码",
    password2: "请再次输入新密码",
  },

  formSubmit: function(e) {
    var warn = "";
    var flag = false;
    var passwordold = e.detail.value.passwordold
    var password = e.detail.value.password
    if (e.detail.value.name == "") {
      warn = "请输入账号！"; //
    } else if (e.detail.value.passwordold == "") {
      warn = "请输入原密码！"; //判断原密码是否正确没写
    } else if (e.detail.value.password == "") {
      warn = "请输入新密码！";
    } else if (e.detail.value.password == passwordold) {
      warn = "新密码不能与原密码相同！";
    } else if (e.detail.value.password2 == "") {
      warn = "请再次输入新密码！";
    } else if (e.detail.value.password2 != password) {
      warn = "两次密码不一致！";
    } else {
      flag = true;
      timer = setTimeout(function() {
        wx.navigateBack({
          delta: 1
        })
      }, 3000);

    }
    if (flag == false) {
      wx.showModal({
        title: '提示',
        content: warn
      })
    }

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
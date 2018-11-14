// pages/bind/bind.js
var timer; // 计时器
Page({

  /**
   * 页面的初始数据
   */
  data: {
    logo: "../../images/logo.jpg",
    title: "德力西电气物流信息系统",
    name: "请输入账号",
    password: "请输入登录密码",
  },

  toCompany: function(e) {
    wx.navigateTo({
      url: '../company/company',
    })
  },

  toPassword: function(e) {
    wx.navigateTo({
      url: '../password/password',
    })
  },

  toRegister: function(e) {
    wx.navigateTo({
      url: '../register/register',
    })
  },


  formSubmit: function(e) {
    var warn = "";
    var flag = false;
    if (e.detail.value.name == "") {
      warn = "请填写您的账号！";
    } else if (e.detail.value.password == "") {
      warn = "请填写您的密码！";
    } else {
      flag = true;
      wx.showToast({
        title: '绑定成功',
        icon: 'success',
        duration: 2000,
        mask: true
      })

      timer = setTimeout(function() {
        wx.switchTab({
          url: '../home/home',
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
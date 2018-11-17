// pages/accountAdd/accountAdd.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:"请输入账号",
    nickname: "请输入昵称",
    contacts: "请输入姓名",
    tel: "请输入联系方式",
    password: "请输入密码",
    password2: "请再次输入密码", 
    remark:"可不填"   
  },


  //确认
  formSubmit: function(e) {
    var warn = "";
    var flag = false;
    var myreg = /^(14[0-9]|13[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$$/;
    var password = e.detail.value.password
    if (e.detail.value.name == "") {
      warn = "请输入账号！";
    } else if (e.detail.value.contacts == "") {
      warn = "请输入姓名！";
    } else if (e.detail.value.tel == "") {
      warn = "请输入联系方式！";
    } else if (!myreg.test(e.detail.value.tel)) {
      warn = "请输入正确的联系方式！";
    }else if (e.detail.value.password == "") {
      warn = "请输入密码！";
    } else if (e.detail.value.password2 == "") {
      warn = "请再次输入新密码！";
    } else if (e.detail.value.password2 != password) {
      warn = "两次密码不一致！";
    } else {
      flag = true;
      wx.navigateBack({
        delta: 1
      })

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
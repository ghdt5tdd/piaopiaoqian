// pages/register/register.js
var timer; // 计时器
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tel: "请输入手机号",
    code: "请输入验证码",
    codename: "获取验证码",
    password: "请输入新密码",
  },
  //获取input输入框的值  
  getPhoneValue: function(e) {
    this.setData({
      tel: e.detail.value
    })
  },
  getCodeValue: function(e) {
    this.setData({
      code: e.detail.value
    })
  },

  password: function(e) {
    this.setData({
      password: e.detail.value
    })
  },


  //获取验证码  
  getVerificationCode(e) {
    var _this = this;
    var myreg = /^(14[0-9]|13[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$$/;
    if (this.data.tel == "请输入手机号") {
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none',
        duration: 1000
      })
      return false;
    } else if (!myreg.test(this.data.tel)) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none',
        duration: 1000
      })
      return false;
    } else {
      var num = 60
      var timer = setInterval(function () {
        num--;
        if (num <= 0) {
          clearInterval(timer);
          _this.setData({
            codename: '重新发送',
            disabled: false,
            codetype: false
          })
        } else {
          _this.setData({
            codename: num + "s",
            codetype: true
          })
        }
      }, 1000)

    }

      _this.setData({
        disabled: true
      })


  },

  formSubmit: function(e) {
    var warn = "";
    var flag = false;
    if (e.detail.value.tel == "") {
      warn = "请输入手机号！";
    } else if (e.detail.value.code == "") {
      warn = "请输入验证码！"; //判断验证码是否输入正确的没写
    } else if (e.detail.value.password == "") {
      warn = "请输入新密码！";
    } else {
      flag = true;
      wx.showToast({
        title: '注册成功',
        icon: 'success',
        duration: 2000,
        mask: true
      })

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
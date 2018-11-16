// pages/password/password.js
var timer; // 计时器
const ajax = require('../../utils/ajax.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    username: "请输入账号",
    code: "请输入验证码",
    codename: "获取验证码",
    password: "请输入新密码",
    password2: "请再次输入新密码",
    area: ''
  },

  //获取input输入框的值  
  getUserValue: function(e) {
    this.setData({
      username: e.detail.value
    })
  },
  getCodeValue: function(e) {
    this.setData({
      code: e.detail.value
    })
  },

  //获取用户输入的密码
  password: function(e) {
    this.setData({
      password: e.detail.value
    })
  },

  password2: function(e) {
    this.setData({
      password2: e.detail.value
    })
  },
  //获取验证码  
  getVerificationCode(e) {
    if (this.data.username == "请输入账号") {
      wx.showToast({
        title: '账号不能为空',
        icon: 'none',
        duration: 1000
      })
      return false;
    } else {
      var num = 60
      var timer = setInterval(() => {
        num--;
        if (num <= 0) {
          clearInterval(timer);
          this.setData({
            codename: '重新发送',
            disabled: false,
            codetype: false
          })
        } else {
          this.setData({
            codename: num + "s",
            codetype: true
          })
        }
      }, 1000)

      ajax.getApi('app/member/sendForgetPwd', {
        state: '0',
        account: this.data.username,
        app_area: this.data.area
      }, (err, res) => {
        console.log(res)
        if (res && res.success) {
          wx.showToast({
            title: '发送成功',
            icon: 'success',
            duration: 1000
          })
        }else {
          wx.showToast({
            title: res.text,
            icon: 'none',
            duration: 1000
          })
        }
      })	
    }


    this.setData({
      disabled: true
    })
  },


  formSubmit: function(e) {
    var warn = "";
    var flag = false;
    const username = e.detail.value.username
    const code = e.detail.value.code
    const password = e.detail.value.password
    const password2 = e.detail.value.password2
    const area = this.data.area

    if (username == "") {
      warn = "请输入账号！";
    } else if (code == "") {
      warn = "请输入验证码！"; //判断验证码是否输入正确的没写
    } else if (password == "") {
      warn = "请输入新密码！";
    } else if (password2 == "") {
      warn = "请再次输入新密码！";
    } else if (password2 !== password) {
      warn = "两次密码不一致！";
    } else {
      flag = true;
      ajax.postApi('app/member/forgetPassword', {
        state: '0',
        code,
        password,
        account: username,
        app_area: area
      }, (err, res) => {0
        if (res && res.success) {
          wx.showToast({
            title: '密码已重置',
            icon: 'success',
            duration: 2000,
            mask: true
          })

          timer = setTimeout(function () {
            wx.navigateBack({
              delta: 1
            })
          }, 3000);
        }
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
    this.setData({
      area: options.area
    })
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
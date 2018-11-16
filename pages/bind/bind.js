// pages/bind/bind.js
var timer; // 计时器
const ajax = require('../../utils/ajax.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    logo: "../../images/logo.jpg",
    title: "德力西电气物流信息系统",
    area: "delixiarea",
    name: "请输入账号",
    password: "请输入登录密码",
    loginUsername:'',
    loginPassword:'',
  },

  toCompany: function(e) {
    wx.navigateTo({
      url: '../company/company',
    })
  },

  toPassword: function(e) {
    wx.navigateTo({
      url: '../password/password?area=' + this.data.area,
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

    const loginUsername = this.data.loginUsername
    const loginPassword = this.data.loginPassword
    const area = this.data.area

    if (loginUsername === '') {
      warn = "请填写您的账号！";
    } else if (loginPassword == '') {
      warn = "请填写您的密码！";
    } else {
      flag = true;
      wx.showLoading({
        title: '登录中...',
      })
      ajax.postApi('app/member/appLogin', {
        account: loginUsername,
        password: loginPassword,
        app_area: area
      }, (err, res) => {
        if (res && res.success) {
          wx.hideLoading()
          wx.setStorageSync(area + 'LoginUsername', loginUsername)
          wx.setStorageSync(area + 'LoginPassword', loginPassword)
          app.globalData.memberInfo = res.data
          
          wx.showToast({
            title: '登陆成功',
            icon: 'success',
            duration: 1000,
            mask: true
          })

          timer = setTimeout(function () {
            wx.switchTab({
              url: '../home/home',
            })
          }, 1000);
        }else {
          wx.showToast({
            title: '登陆失败',
            icon: 'fail',
            duration: 2000,
            mask: true
          })
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

  setLoginUsername: function(e) {
    const val = e.detail.value;
    this.setData({
      loginUsername: val
    });
  },
  setLoginPassword: function(e) {
    const val = e.detail.value;
    this.setData({
      loginPassword: val
    });
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const loginUsername = wx.getStorageSync(this.data.area + 'LoginUsername') || ''
    const loginPassword = wx.getStorageSync(this.data.area + 'LoginPassword') || ''

    console.log(loginUsername)
    console.log(loginPassword)

    this.setData({
      loginUsername,
      loginPassword
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
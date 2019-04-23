// pages/accountAdd/accountEdit.js
const ajax = require('../../utils/ajax.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    full_name:"",
    user_account: "",
    user_nickname: "", 
    phone: "",
    remark:"",
    id:undefined
  },

  account: function(e) {
    this.setData({
      user_account: e.detail.value
    })
  },
  nickname: function(e) {
    this.setData({
      user_nickname: e.detail.value
    })
  },
  fullname: function(e) {
    this.setData({
      full_name: e.detail.value
    })
  },
  phone: function(e) {
    this.setData({
      phone: e.detail.value
    })
  },
  remark: function(e) {
    this.setData({
      remark: e.detail.value
    })
  },


  //确认
  formSubmit: function(e) {
    var warn = "";
    var flag = false;
    var myreg = /^(14[0-9]|13[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$$/;

    const full_name = this.data.full_name
    const user_account = this.data.user_account
    const user_nickname = this.data.user_nickname
    const phone = this.data.phone
    const remark = this.data.remark

    if (user_account === "") {
      warn = "请输入账号！";
    } else if (full_name == "") {
      warn = "请输入姓名！";
    } else if (phone == "") {
      warn = "请输入联系方式！";
    } else if (!myreg.test(phone)) {
      warn = "请输入正确的联系方式！";
    } else { 
      flag = true;
      wx.showLoading({
        title: '提交中...',
        mask: true
      })
      ajax.postApi('app/member/modifySubAccount', {
        ...this.data
      }, (err, res) => {
        wx.hideLoading()
        if (res && res.success) {
          wx.showToast({
            title: '提交成功!',
          })
          wx.navigateBack({
            delta: 1
          })
        }
      })	
    }
    if (!flag) {
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
    const id = options.id
    if(id) {
      wx.showLoading({
        title: '获取中...',
        mask: true
      })
      ajax.postApi('app/member/getSubAccount', {
        id
      }, (err, res) => {
        wx.hideLoading()
        if (res && res.success) {
          const data = res.data
          this.setData({
            id: data.id,
            user_nickname: data.user_nickname,
            user_account: data.user_account,
            full_name: data.full_name,
            phone: data.phone,
            remark: data.remark,
          })
        } else {
          wx.showToast({
            title: '无法获取子账户详情',
            duration: 1000
          })
        }
      })
    }
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
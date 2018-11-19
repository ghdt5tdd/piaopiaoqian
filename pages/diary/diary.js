// pages/diary/diary.js
const ajax = require('../../utils/ajax.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    pageSize: 10,
    diaryBar: [{
      time: "2018-01-15",
      name: "登录账号",
    }, { 
      time: "2018-01-12",
      name: "停用子账户二",
    }, {
      time: "2018-01-08",
      name: "新建子账号三",
      }, {
        time: "2018-01-15",
        name: "登录账号",
      }, {
        time: "2018-01-12",
        name: "停用子账户二",
      }, {
        time: "2018-01-08",
        name: "新建子账号三",
      }, {
        time: "2018-01-15",
        name: "登录账号",
      }, {
        time: "2018-01-12",
        name: "停用子账户二",
      }, {
        time: "2018-01-08",
        name: "新建子账号三",
      }, {
        time: "2018-01-15",
        name: "登录账号",
      }, {
        time: "2018-01-12",
        name: "停用子账户二",
      }, {
        time: "2018-01-08",
        name: "新建子账号三",
      }]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getAccountLog()
  },

  getAccountLog: function() {
    let page = this.data.page
    const pageSize = this.data.pageSize
    ajax.getApi('app/member/getAccountLog', {
      page,
      pageSize
    }, (err, res) => {
      console.log(res)
      if (res && res.success) {

      }
    })
  },

  lower:function(e) {
    console.log(e)
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
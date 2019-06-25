// pages/formSheet/formSheet.js
const ajax = require('../../utils/ajax.js')
const util = require('../../utils/util.js')
const storage = require('../../utils/storage.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    curIndex: 0,
    hideShadow: true,
    hideTip: true,

    conditionStatus: false,
    dateStatus: false,
    date: '请选择月份',
    orderStatus: [{
      name: "已计费",
    }, {
      name: "待计费",
    }, ],
    selectStatus: 0,
    ul: "ul-2",

    analysisData: [],
    page: 1,
    pageSize: 20,
    loadCompleted: false,
    selectId:undefined
  },

  //选择类型
  selectType: function(e) {
    this.setData({
      curIndex: e.currentTarget.dataset.index
    })
  },


  //详情页
  toList: function(e) {
    const id = e.currentTarget.dataset.id
    const code = e.currentTarget.dataset.code
    const month = e.currentTarget.dataset.month
    wx.navigateTo({
      url: '../formSheetlist/formSheetlist?id=' + id + '&month=' + month + '&code=' + code
    })
  },

  //操作日志
  toDaily: function(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../formSheetdaily/formSheetdaily?id=' + id
    })
  },


  //对账确认
  toSure: function(e) {
    const index = e.currentTarget.dataset.index
    this.setData({
      selectData: this.data.analysisData[index],
      hideShadow: false,
      hideTip: false
    })
  },

  checkConfirm(e) {
    wx.showLoading({
      title: '稍等...',
    })
    const selectData = this.data.selectData

    ajax.postApi('app/payable/accountCheckConfirm', {
      month_id: selectData.id,
      partner_code: selectData.partner_code,
      create_user: app.globalData.memberInfo.user_account,
    }, (err, res) => {
      wx.hideLoading()
      if (res && res.success) {
        wx.showToast({
          title: '已对账',
        })
      } else {
        wx.showToast({
          title: res.text,
          duration: 1000
        })
      }
    })	

  },


  //关闭弹窗
  hide: function(e) {
    this.setData({
      hideShadow: true,
      hideTip: true
    })
  },




  //输入筛选条件
  bindInput: function(e) {
    this.setData({
      conditionStatus: true,
      val: e.detail.value
    })
  },


  //清除输入条件
  conditionClear: function(e) {
    this.setData({
      conditionStatus: false,
      val: ''
    })
  },

  //选择日历
  bindDateChange: function(e) {
    this.setData({
      dateStatus: true,
      date: e.detail.value
    })
  },

  //清除日历条件
  dateClear: function(e) {
    this.setData({
      dateStatus: false,
      date: '请选择月份'
    })
  },

  //选择我的订单状态
  selectStatus: function(e) {
    var index = e.target.dataset.index;
    this.setData({
      selectStatus: index
    })
  },

  lower: function (e) {
    let page = this.data.page
    const pageSize = this.data.pageSize
    const loadCompleted = this.data.loadCompleted
    if (!loadCompleted) {
      wx.showLoading({
        title: '加载中...',
      })
      page++
      this.setData({
        page
      }, () => {
        this.listMonthTotalSettlement()
      })
    } else {
      wx.showToast({
        title: '数据加载完毕',
        duration: 1000
      })
    }
  },

  listMonthTotalSettlement() {
    wx.showLoading({
      title: '加载数据中...',
    })
    ajax.getApi('app/payable/listMonthTotalSettlement', {
      app_area: app.globalData.memberInfo.platform_app_area,
      currentPage: this.data.page,
      pageSize: this.data.pageSize,
      type: 2, //这里默认应付统计
      partner_code: app.globalData.memberInfo.user_account,
    }, (err, res) => {
      wx.hideLoading()
      if (res && res.success) {
        if (res.data.length > 0) {
          const analysisData = this.data.analysisData
          Array.prototype.push.apply(analysisData, res.data);
          this.setData({
            analysisData
          })
        } else {
          wx.hideLoading(() => {
            wx.showToast({
              title: '已全部加载',
              duration: 1000
            })
          })
          this.setData({
            loadCompleted: true
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.listMonthTotalSettlement()
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
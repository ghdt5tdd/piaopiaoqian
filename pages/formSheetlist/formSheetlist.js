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
    analysisTh: ["序号", "月份", "客户卡号", "客户姓名", "出发站", "目的站", "票数", "件数", "重量（KG）", "立方", "运费（元）", "趟数", "送货费", "结算金额（元）", "账单状态"],
    analysisData: [],
    page: 1,
    pageSize: 200,
    loadCompleted: false,
  },



  //详情页
  toInfo: function (e) {
    const index = e.currentTarget.dataset.index
    const data = this.data.analysisData[index]
    const partner_code = data.partner_code
    const balance_month = data.balance_month
    const state = data.state
    const from_order_type = data.from_order_type
    const consignee_client_account = data.consignee_client_account
    const consignment_station = data.consignment_station
    const receiving_station = data.receiving_station
    const month_id = this.data.id
    wx.navigateTo({
      url: '../formSheetinfo/formSheetinfo?partner_code=' + partner_code + '&balance_month=' + balance_month + '&state=' + state + '&from_order_type=' + from_order_type + '&consignee_client_account=' + consignee_client_account + '&consignment_station=' + consignment_station + '&receiving_station=' + receiving_station + '&month_id=' + month_id
    })
  },

  setWidth() {
    //计算宽度
    var query = wx.createSelectorQuery();
    var that = this;
    query.select('.table').boundingClientRect(function (rect) {
      console.log(rect.width)
      that.setData({
        goodsWidth: rect.width + 'px'
      })
    }).exec();
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
        this.getAnalysis()
      })
    } else {
      wx.showToast({
        title: '数据加载完毕',
        duration: 1000
      })
    }
  },

  getAnalysis() {
    wx.showLoading({
      title: '加载数据中...',
    })
    ajax.getApi('app/payable/listMonthSettlement', {
      app_area: app.globalData.memberInfo.platform_app_area,
      currentPage: this.data.page,
      pageSize: this.data.pageSize,
      type: 2, //这里默认应付统计
      partner_code: this.data.partner_code,  
      balance_month: this.data.balance_month,  
      month_id: this.data.id,
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
    this.setWidth()
    const id = options.id
    const month = options.month
    const code = options.code
    this.setData({
      id,
      partner_code: code,
      balance_month: month
    }, () => {
      this.getAnalysis()
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
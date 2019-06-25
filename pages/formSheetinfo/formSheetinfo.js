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
    analysisTh: ["序号", "货运单创建时间", "货运单号", "结算单创建时间", "结算单号", "货物名称", "客户卡号", "客户姓名", "出发站", "目的站", "票数", "件数", "重量（KG）", "立方", "计费金额", "趟数", "送货费", "结算金额（元）", "结算方式", "支付方式", "账单状态"],
    analysisData: [],
    page: 1,
    pageSize: 200,
    loadCompleted: false,
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
    ajax.getApi('app/payable/listSettlement', {
      app_area: app.globalData.memberInfo.platform_app_area,
      currentPage: this.data.page,
      pageSize: this.data.pageSize,
      type: 2, //这里默认应付统计
      partner_code: this.data.paramData.partner_code,
      balance_month: this.data.paramData.balance_month,
      state: this.data.paramData.state,
      from_order_type: this.data.paramData.from_order_type,
      consignee_client_account: this.data.paramData.consignee_client_account,
      consignment_station: this.data.paramData.consignment_station,
      receiving_station: this.data.paramData.receiving_station,
      month_id: this.data.paramData.month_id,
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
    const balance_month = options.balance_month
    const partner_code = options.partner_code
    const state = options.state
    const from_order_type = options.from_order_type
    const consignee_client_account = options.consignee_client_account
    const consignment_station = options.consignment_station
    const receiving_station = options.receiving_station
    const month_id = options.month_id

    this.setData({
      paramData:{
        balance_month,
        partner_code,
        state,
        from_order_type,
        consignee_client_account,
        consignment_station,
        receiving_station,
        month_id,
      }
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
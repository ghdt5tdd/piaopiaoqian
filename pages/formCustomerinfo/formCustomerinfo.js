// pages/formCustomerinfo/formCustomerinfo.js
const ajax = require('../../utils/ajax.js')
const util = require('../../utils/util.js')
const storage = require('../../utils/storage.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    customerSendTh: ["序号", "承运商名称", "发货单位", "收货单位", "货运单号", "发车时间", "预计到达时间", "到货时间", "发货站", "终点站", "运输方式", "运输及时性", "备注"],
    customerReturnTh: ["序号", "承运商名称", "发货单位", "收货单位", "货运单号", "发车时间", "预计到达时间", "到货时间", "发货站", "终点站", "运输方式", "运输及时性", "备注"],
    areaSendTh: ["序号", "承运商名称", "物流仓名称", "发货单位", "收货单位", "货运单号", "发车时间", "预计到达时间", "到货时间", "发货站", "终点站", "运输方式", "运输及时性", "备注"],
    areaReturnTh: ["序号", "承运商名称", "物流仓名称", "发货单位", "收货单位", "货运单号", "发车时间", "预计到达时间", "到货时间", "发货站", "终点站", "运输方式", "运输及时性", "备注"],
    forwarderTh: ["序号", "承运商名称", "发货单位", "收货单位" , "货运单号", "发车时间", "预计到达时间", "到货时间", "发货站", "终点站", "运输方式", "运输及时性", "备注"],
    analysisTh: [],
    analysisData: [],
    page: 1,
    pageSize: 200,
    loadCompleted: false,
    type: undefined,
    month: undefined,
    consignment_station_name: undefined,
    receiving_station_name: undefined,
    carrier_name: undefined
  },

  setWidth() {
    //计算宽度
    var query = wx.createSelectorQuery();
    var that = this;
    query.select('.table').boundingClientRect(function (rect) {
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
        this.getAnalysisDetail()
      })
    } else {
      wx.showToast({
        title: '数据加载完毕',
        duration: 1000
      })
    }
  },

  getAnalysisDetail() {
    const type = this.data.type
    const api = this.getApi(type)
    if (api) {
      wx.showLoading({
        title: '加载数据中...',
      })
      ajax.getApi(api, {
        page: this.data.page,
        pageSize: this.data.pageSize,
        month: this.data.month,
        consignmentStationName: this.data.consignment_station_name,
        receivingStationName: this.data.receiving_station_name,
        carrierName: this.data.carrier_name
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
    }
  },

  getApi(type) {
    this.setData({
      type
    })
    switch (type) {
      case 'forwarder':
        this.setData({
          analysisTh: this.data.forwarderTh
        })
        return 'app/order/getCarrierPunctualityAnalysisDetail'
      case 'areaSend':
        this.setData({
          analysisTh: this.data.areaSendTh
        })
        return 'app/order/getBranchPunctualityAnalysisDetail'
      case 'areaReturn':
        this.setData({
          analysisTh: this.data.areaReturnTh
        })
        return 'app/order/getFinalBranchPunctualityAnalysisDetail'
      case 'customerSend':
        this.setData({
          analysisTh: this.data.customerSendTh
        })
        return 'app/order/getConsigneePunctualityAnalysisDetail'
      case 'customerReturn':
        this.setData({
          analysisTh: this.data.customerReturnTh
        })
        return 'app/order/getConsignerPunctualityAnalysisDetail'
      default:
        wx.showToast({
          title: '不支持的角色',
        })
        return;
    }
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setWidth()
    this.setData({
      type: options.type,
      month: options.month,
      consignment_station_name: options.consignment_station_name,
      receiving_station_name: options.receiving_station_name,
      carrier_name: options.carrier_name
    }, () => {
      this.getAnalysisDetail()
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
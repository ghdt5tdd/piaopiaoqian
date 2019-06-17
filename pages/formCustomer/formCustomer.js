// pages/formCustomer/formCustomer.js
const ajax = require('../../utils/ajax.js')
const util = require('../../utils/util.js')
const storage = require('../../utils/storage.js')
const app = getApp()
Page({
  data: {
    customerSendTh: ["序号", "月份", "承运商名称", "收货单位", "发货站", "终点站", "及时数", "不及时数", "总数", "及时率"],
    customerReturnTh: ["序号", "月份", "承运商名称", "收货单位", "发货站", "终点站", "及时数", "不及时数", "总数", "及时率"],
    areaSendTh: ["序号", "月份", "物流仓名称", "承运商名称", "发货站", "终点站", "及时数", "不及时数", "总数", "及时率"],
    areaReturnTh: ["序号", "月份", "物流仓名称", "承运商名称", "发货站", "终点站", "及时数", "不及时数", "总数", "及时率"],
    forwarderTh: ["序号", "月份", "承运商名称", "发货站", "终点站", "及时数", "不及时数", "总数", "及时率"],
    analysisTh:[],
    analysisData: [],
    page: 1,
    pageSize: 200,
    loadCompleted: false,
    type: undefined,
  },

  //详情页
  toInfo: function(e) {
    const index = e.currentTarget.dataset.index
    const type = this.data.type
    const data = this.data.analysisData[index]
    const month = data.month
    const consignment_station_name = data.consignment_station_name
    const receiving_station_name = data.receiving_station_name
    const carrier_name = data.carrier_name
    console.log(data)
    wx.navigateTo({
      url: '../formCustomerinfo/formCustomerinfo?type=' + type + '&month=' + month + "&consignment_station_name=" + consignment_station_name + "&receiving_station_name=" + receiving_station_name + "&carrier_name=" + carrier_name
    })
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
        this.getAnalysis(this.data.type)
      })
    } else {
      wx.showToast({
        title: '数据加载完毕',
        duration: 1000
      })
    }
  },

  getAnalysis(type) {
    console.log(type)
    const api = this.getApi(type)
    if(api) {
      wx.showLoading({
        title: '加载数据中...',
      })
      ajax.getApi(api, {
        page: this.data.page,
        pageSize: this.data.pageSize
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
    switch(type) {
      case 'forwarder':
        this.setData({
          analysisTh: this.data.forwarderTh
        })
        wx.setNavigationBarTitle({
          title: '承运商及时率'
        })
        return 'app/order/getCarrierPunctualityAnalysis'
      case 'areaSend':
        this.setData({
          analysisTh: this.data.areaSendTh
        })
        wx.setNavigationBarTitle({
          title: '承运商及时率(区域仓发货)'
        })
        return 'app/order/getStartBranchPunctualityAnalysis'
      case 'areaReturn':
        this.setData({
          analysisTh: this.data.areaReturnTh
        })
        wx.setNavigationBarTitle({
          title: '承运商及时率(区域仓退货)'
        })
        return 'app/order/getFinalBranchPunctualityAnalysis'
      case 'customerSend':
        this.setData({
          analysisTh: this.data.customerSendTh
        })
        wx.setNavigationBarTitle({
          title: '承运商及时率(客户发货)'
        })
        return 'app/order/getConsigneePunctualityAnalysis'
      case 'customerReturn':
        this.setData({
          analysisTh: this.data.customerReturnTh
        })
        wx.setNavigationBarTitle({
          title: '承运商及时率(客户发退货)'
        })
        return 'app/order/getConsignerPunctualityAnalysis'
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
    this.getAnalysis(options.type)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

 
})
// pages/location/location.js
const ajax = require('../../utils/ajax.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderDetails:null,
    locationDetails:null,
    popup: true,
  },

  regionchange(e) {
    console.log(e.type)
  },
  markertap(e) {
    console.log(e.markerId)
  },
  controltap(e) {
    console.log(e.controlId)
  },


  spread: function(e) {
    this.setData({
      popup: true,
    });
  },

  retract: function(e) {
    this.setData({
      popup: false,
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const shopOrderId = options.shop_order_id
    const shopOrderDetailId = options.shop_order_detail_id
    console.log(shopOrderId)
    console.log(shopOrderDetailId)
    wx.showLoading({
      title: '信息加载中',
    })

    if (shopOrderId) {
      this.getOrderGPSByOrderId(shopOrderId)
    } else if (shopOrderDetailId) {
      this.getOrderGPSByOrderDetailId(shopOrderDetailId)
    }else {
      wx.showToast({
        title: '缺少运单ID或运单详情ID',
      })
    }
    
  },
  
  getOrderGPSByOrderId: function (shopOrderId){
    ajax.getApi('app/order/getGPSByShopOrderId', {
      shopOrderId,
      pageSize: 1
    }, (err, res) => {
      this.getOrderDetailByOrderId(shopOrderId)
      if (res && res.success) {
        this.setData({
          locationDetails: res.data
        })
      } else {
        wx.showToast({
          title: res.text,
          duration: 1000
        })
      }
    }) 
  },
  
  getOrderGPSByOrderDetailId: function (shopOrderDetailId){
    ajax.getApi('app/order/getGPSByShopOrderDetailId', {
      shopOrderDetailId
    }, (err, res) => {
      this.getOrderDetailByOrderDetailId(shopOrderDetailId)
      if (res && res.success) {
        this.setData({
          locationDetails: res.data
        })
      } else {
        wx.showToast({
          title: res.text,
          duration: 1000
        })
      }
    }) 
  },

  getOrderDetailByOrderId: function (shopOrderId) {
    ajax.getApi('app/order/getShopOrderRealTimeTrackingByShopOrderId', {
      shopOrderId,
    }, (err, res) => {
      wx.hideLoading()
      if (res && res.success) {
        const orderDetails = res.data
        let carrier_name = orderDetails.carrier_name
        if (carrier_name.length > 6) {
          carrier_name = carrier_name.substring(0, 6) + '...'
          orderDetails.carrier_name = carrier_name
        }
        this.setData({
          orderDetails
        })
      } else {
        wx.showToast({
          title: res.text,
          duration: 1000
        })
      }
    }) 
  },

  getOrderDetailByOrderDetailId: function (orderDetailId) {
    ajax.getApi('app/order/getShopOrderRealTimeTracking', {
      orderDetailId,
    }, (err, res) => {
      wx.hideLoading()
      if (res && res.success) {
        const orderDetails = res.data
        let carrier_name = orderDetails.carrier_name
        if (carrier_name.length > 6) {
          carrier_name = carrier_name.substring(0, 6) + '...'
          orderDetails.carrier_name = carrier_name
        }
        this.setData({
          orderDetails
        })
      } else {
        wx.showToast({
          title: res.text,
          duration: 1000
        })
      }
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
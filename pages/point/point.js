// pages/point/point.js
const ajax = require('../../utils/ajax.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    map: "../../images/map.jpg",
    popup: true,
    status: "在途中",

    billId: "2018362902037",
    billTime: "2018-01-10",
    routeStart: "浙江乐清",
    routeEnd: "浙江杭州",
    receive: "杭州腾策机电设备有限公司",
    pieces: "120",
    num: "120",
    forwarder: "乐清市精英物流有限公司",
    orderNodes:null,
    shopOrderId:'',
    shoporderDetail:undefined,
    logistics: [],


  },

//查看实时定位
  toLoaction: function (e) {
    wx.navigateTo({
      url: '../location/location?shop_order_id=' + this.data.shopOrderId
    })
  },

  spread: function (e) {
    this.setData({
      popup: true,
    });
  },

  retract: function (e) {
    this.setData({
      popup: false,
    });
  },

  getShopOrderDetail: function (shopOrderId) {
    wx.showLoading({
      title: '详情加载中...',
    })

    ajax.getApi('app/order/getShopOrderDetail', {
      shopOrderId
    }, (err, res) => {
      console.log(res)
      wx.hideLoading()
      if (res && res.success) {
        const shoporderDetail = res.data
        shoporderDetail.start_departing_date_short = shoporderDetail.start_departing_date.substring(0, 10)
        shoporderDetail.estimated_arriver_date_short = shoporderDetail.estimated_arriver_date.substring(0, 10)
        this.setData({
          shoporderDetail
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const shopOrderId = options.id
    this.getShopOrderDetail(shopOrderId)
    this.setData({
      shopOrderId
    })
    wx.showLoading({
      title: '节点加载中',
    })

    ajax.getApi('app/order/getNodeDataByShopOrder', {
      shopOrderId
    }, (err, res) => {
      wx.hideLoading()
      if (res && res.success) {
        if(res.data.length > 0) {
          const orderNodes = res.data
          orderNodes.forEach(v => {
            v.createDate = v.create_date.substring(0, 10)
            v.createTime = v.create_date.substring(11)
          })
        this.setData({
          orderNodes
        })
        }
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
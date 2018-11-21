// pages/goodsdetail/goodsdetail.js
const ajax = require('../../utils/ajax.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderDetails:null,
    tableTh: [{
      title: "行号"
    }, {
      title: "商品编码"
    }, {
      title: "商品名称"
    }, {
      title: "数量"
    }, ],

    tableTr: [{
      td: [{
        name: "10"
      }, {
        name: "EWHTCK0283"
      }, {
        name: "SC32*50S带磁气缸"
      }, {
        name: "66"
      }, ]
    }, {
      td: [{
        name: "20"
      }, {
        name: "DHCHTS0201"
      }, {
        name: "8寸5合1多功能尖嘴钳"
      }, {
        name: "20"
      }, ]
    }, {
      td: [{
        name: "30"
      }, {
        name: "EWHTCK0283"
      }, {
        name: "SC32*50S带磁气缸"
      }, {
        name: "48"
      }, ]
    }, ]







  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getDetail(options)
    this.fixedWidth()
  },

  getDetail:function(options) {
    const shopOrderId = options.id
    wx.showLoading({
      title: '明细加载中',
    })

    ajax.getApi('app/order/listShopOrderProducts', {
      shopOrderId
    }, (err, res) => {
      wx.hideLoading()
      if (res && res.success) {
        this.setData({
          orderDetails: res.data
        })
      }
    })
  },

  fixedWidth:function() {
    const query = wx.createSelectorQuery();
    query.select('.table').boundingClientRect(rect => {
      this.setData({
        goodsWidth: rect.width + 'px'
      })
    }).exec();
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
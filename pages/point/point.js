// pages/point/point.js
const ajax = require('../../utils/ajax.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderNodes:null,
    shopOrderId:'',
    logistics: [{
      'status': '在途中',
      'detail': [{
        'loginfo': '预计到达时间：剩余5小时',
        'logdate': '2018-08-21',
        'logtime': '18:37',
      }, {
        'loginfo': '由[浙江乐清]发往[浙江杭州]',
        'logdate': '2018-08-18',
        'logtime': '06:05',
      }, {
        'loginfo': '货物已由[浙江乐清物流公司]装车',
        'logdate': '2018-08-18',
        'logtime': '01:32',
      }],
    }, {
      'status': '已发货',
      'detail': [{
        'loginfo': '您的货物已出库',
        'logdate': '2018-08-17',
        'logtime': '20:26',
      }, ],
    }, ],


  },

//查看实时定位
  toLoaction: function (e) {
    wx.navigateTo({
      url: '../location/location?shop_order_id=' + this.data.shopOrderId
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const shopOrderId = options.id
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
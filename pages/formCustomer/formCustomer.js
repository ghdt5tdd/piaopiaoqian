// pages/formCustomer/formCustomer.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tableTh: [{
      title: "序号"
    }, {
      title: "月份"
    }, {
      title: "承运商名称"
    }, {
      title: "收货单位"
    }, {
      title: "发货站"
    }, {
      title: "终点站"
    }, {
      title: "及时数"
    }, {
      title: "不及时数"
    }, {
      title: "总数"
    }, {
      title: "及时率"
    }],

    tableTr: [{
      td: [{
        name: "1"
      }, {
        name: "2018-02"
      }, {
        name: "河南路港综合运输有限公司"
      }, {
        name: "客户卡号（客户名）"
      }, {
        name: "郑州"
      }, {
        name: "长垣县"
      }, {
        name: "11"
      }, {
        name: "2"
      }, {
        name: "13"
      }, {
        name: "84.62%"
      }, ]
    }, {
      td: [{
        name: "2"
      }, {
        name: "2018-02"
      }, {
        name: "山东ABC有限公司"
      }, {
        name: "客户卡号（客户名）"
      }, {
        name: "郑州"
      }, {
        name: "洛阳"
      }, {
        name: "5"
      }, {
        name: "1"
      }, {
        name: "6"
      }, {
        name: "83.33%"
      }, ]
    }, {
      td: [{
        name: "汇总"
      }, {
        name: ""
      }, {
        name: ""
      }, {
        name: ""
      }, {
        name: ""
      }, {
        name: ""
      }, {
        name: "16"
      }, {
        name: "3"
      }, {
        name: "19"
      }, {
        name: "84.21%"
      }, ]
    }, ],
  },

  //详情页
  toInfo: function(e) {
    wx.navigateTo({
      url: '../formCustomerinfo/formCustomerinfo'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //计算宽度
    var query = wx.createSelectorQuery();
    var that = this;
    query.select('.table').boundingClientRect(function(rect) {
      console.log(rect.width)
      that.setData({
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
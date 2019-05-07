// pages/formCustomerinfo/formCustomerinfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tableTh: [{
      title: "序号"
    }, {
      title: "承运商名称"
    }, {
      title: "发货单位"
    }, {
      title: "收货单位"
    }, {
      title: "货运单号"
    }, {
      title: "发车时间"
    }, {
      title: "预计到达时间"
    }, {
      title: "到货时间"
    }, {
      title: "发货站"
    }, {
      title: "终点站"
    }, {
      title: "运输方式"
    }, {
      title: "运输及时性"
    }, {
      title: "备注"
    }, ],

    tableTr: [{
      td: [{
        name: "1"
      }, {
        name: "河南路港综合运输有限公司"
      }, {
        name: "河南物流"
      }, {
        name: "客户卡号（客户名）"
      }, {
        name: "HY201802270232"
      }, {
        name: "2018-02-27 17:07:31"
      }, {
        name: "2018-02-28 12:00:00"
      }, {
        name: "2018-03-01 09:30:00"
      }, {
        name: "郑州"
      }, {
        name: "长垣县"
      }, {
        name: "货车"
      }, {
        name: "不及时"
      }, {
        name: "下雪导致"
      }, ]
    }, ],
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
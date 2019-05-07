// pages/formSheet/formSheet.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sheetCompany:"德力西电气有限公司",
    sheetName: "乐清市骆驼物流有限公司",
    tableTh: [{
      title: "月份"
    }, {
      title: "客户卡号"
    }, {
      title: "客户姓名"
    }, {
      title: "线路"
    }, {
      title: "票数"
    }, {
      title: "件数"
    }, {
      title: "重量（KG）"
    }, {
      title: "立方"
    }, {
      title: "单价"
    }, {
      title: "金额（元）"
    }, {
      title: "趟数"
    }, {
      title: "送货费1"
    }, {
      title: "趟数"
    }, {
      title: "送货费2"
    }, {
      title: "结算金额（元）"
    }, {
      title: "备注"
    }, ],

    tableTr: [{
      td: [{
        name: "2017-12"
      }, {
        name: "8013080"
      }, {
        name: "池威"
      }, {
        name: "柳市-晋江"
      }, {
        name: "20"
      }, {
        name: "383"
      }, {
        name: "7060"
      }, {
        name: ""
      }, {
        name: "0.35"
      }, {
        name: "2471"
      }, {
        name: "19"
      }, {
        name: "150"
      }, {
        name: "1"
      }, {
        name: "100"
      }, {
        name: "5421"
      }, {
        name: ""
      }, ]
    }, {
      td: [{
        name: "2018-01"
      }, {
        name: "8013053"
      }, {
        name: "余贤丹"
      }, {
        name: "柳市-福州"
      }, {
        name: "11"
      }, {
        name: "111"
      }, {
        name: "1111"
      }, {
        name: ""
      }, {
        name: "0.5"
      }, {
        name: "555.5"
      }, {
        name: ""
      }, {
        name: ""
      }, {
        name: ""
      }, {
        name: ""
      }, {
        name: "555.5"
      }, {
        name: ""
      }, ]
    }, {
      td: [{
        name: "合计："
      }, {
        name: ""
      }, {
        name: ""
      }, {
        name: ""
      }, {
        name: "31"
      }, {
        name: "494"
      }, {
        name: "8171"
      }, {
        name: "0"
      }, {
        name: "0.85"
      }, {
        name: "3026.5"
      }, {
        name: "19"
      }, {
        name: "150"
      }, {
        name: "1"
      }, {
        name: "100"
      }, {
        name: "5976.5"
      }, {
        name: ""
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
// pages/contractInfo/contractInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    id: "18352790283072",
    time: "2018-01-10",
    info: [{
      label: "类型",
      name: "新购",
    }, {
      label: "状态",
      name: "草稿",
    }, {
      label: "商品总额",
      name: "12800",
    }, {
      label: "续费总额",
      name: "1500",
    }, {
      label: "客户代码",
      name: "MGsy2637",
    }, {
      label: "客户卡号",
      name: "6228848372635464731",
    }, {
      label: "客户名称",
      name: "温州鑫煌物流有限公司有限公司有限公司有限公司",
      one: true
    }, {
      label: "联系人",
      name: "林元准",
    }, {
      label: "联系方式",
      name: "13858778218",
    }, {
      label: "合同备注",
      name: "浙江全线,后续每增加一个网点，商品金额增加500",
      one: true
    }, ],


    tableTh: [{
      title: "序号"
    }, {
      title: "商品编码"
    }, {
      title: "商品名称"
    }, {
      title: "是否续费项"
    }, {
      title: "续费金额"
    }, {
      title: "商品金额"
    }, {
      title: "合同交付时间"
    }, {
      title: "到期时间"
    }, {
      title: "剩余天数"
    }, {
      title: "备注"
    }],

    tableTr: [{
      td: [{
        name: "10"
      }, {
        name: "EWHTCK0283"
      }, {
        name: "SC32*50S带磁气缸"
      }, {
        name: "是"
      }, {
        name: "500"
      }, {
        name: "8000"
      }, {
        name: "2019-04-01 00:00"
      }, {
        name: "2020-04-01 00:00"
      }, {
        name: "365"
      }, {
        name: ""
      }, ]
    }, {
      td: [{
        name: "20"
      }, {
        name: "DHCHTS0201"
      }, {
        name: "8寸5合1多功能尖嘴钳"
      }, {
        name: "是"
      }, {
        name: "500"
      }, {
        name: "1300"
      }, {
        name: "2019-04-01 00:00"
      }, {
        name: "2020-04-01 00:00"
      }, {
        name: "365"
      }, {
        name: ""
      }, ]
    }, {
      td: [{
        name: "10"
      }, {
        name: "EWHTCK0283"
      }, {
        name: "SC32*50S带磁气缸"
      }, {
        name: "是"
      }, {
        name: "500"
      }, {
        name: "1800"
      }, {
        name: "2019-04-01 00:00"
      }, {
        name: "2019-06-01 00:00"
      }, {
        name: "61"
      }, {
        name: ""
      }, ]
    }, {
      td: [{
        name: "20"
      }, {
        name: "DHCHTS0201"
      }, {
        name: "8寸5合1多功能尖嘴钳"
      }, {
        name: "否"
      }, {
        name: "0"
      }, {
        name: "1700"
      }, {
        name: "2019-04-01 00:00"
      }, {
        name: ""
      }, {
        name: ""
      }, {
        name: ""
      }, ]
    }, ]


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
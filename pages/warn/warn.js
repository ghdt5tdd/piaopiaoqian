// pages/warn/warn.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderStatus: [{
      name: "预警运单",
    }, {
      name: "预警订单",
    }, ],

    selectStatus: 0,
    ul: "ul-2",

    orderTable: [{
      id: "18352790283072",
      time: "2018-01-10",
      start: "浙江温州",
      end: "湖北武汉",
      receive: "武汉恒望科技有限公司",
      num: "210",
      date: "10",
      code: "../../images/code-big.jpg",
    }, {
      id: "18352790280265",
      time: "2018-01-02",
      start: "浙江温州",
      end: "北京市",
      receive: "北京海淀雷蒙赛博机电技术有限公司",
      num: "150",
      date: "5",
      code: "../../images/code-big.jpg",
    }, ],


    orderTablebar: [{
      id: "18352790283072",
      time: "2018-01-10",
      date: "8",
      bar: [{
        info: [{
          label: "",
          name: "10",
        }, {
          label: "商品编码",
          name: "EWHTCK0283",
        }, {
          label: "商品名称",
          name: "SC32*50S带磁气缸",
        }, {
          label: "订单数量",
          name: "500",
        }, {
          label: "属性状态",
          name: "库存 待发货",
        }, {
          label: "备注",
          name: "破损包换，若发货数量有误，3日内补发",
        }, ]
      }, {
        info: [{
          label: "",
          name: "20",
        }, {
          label: "商品编码",
          name: "DHCHTS0201",
        }, {
          label: "商品名称",
          name: "8寸5合1多功能尖嘴钳",
        }, {
          label: "订单数量",
          name: "120",
        }, {
          label: "属性状态",
          name: "库存 缺货",
        }, {
          label: "备注",
          name: "",
        }, ]
      }]
    }, {
      id: "18352790280265",
      time: "2018-01-02",
      date: "3",
      bar: [{
        info: [{
          label: "",
          name: "10",
        }, {
          label: "商品编码",
          name: "EWHTCK0283",
        }, {
          label: "商品名称",
          name: "SC32*50S带磁气缸",
        }, {
          label: "订单数量",
          name: "500",
        }, {
          label: "属性状态",
          name: "定制 待发货",
        }, {
          label: "备注",
          name: "破损包换，若发货数量有误，3日内补发",
        }, ]
      }, ]
    }, ]



  },



  //选择我的订单状态
  selectStatus: function(e) {
    var index = e.target.dataset.index;
    this.setData({
      selectStatus: index
    })
  },


  //跳转到货运单详情页面
  toInfo: function(e) {
    wx.navigateTo({
      url: '../transportdetail/transportdetail'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
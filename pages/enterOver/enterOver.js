// pages/enter/enter.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderStatus: [{
      name: "待交付货运单",
    }, {
      name: "已交付货运单",
    }, ],
    selectStatus: 0,

    order: [{
      id: "18352790283072",
      time: "2018-01-10",
      start: "浙江温州",
      end: "湖北武汉",
      code: "../../images/code-big.jpg",
      bar: [{
        label: "发货单位",
        info: "温州物流",
      }, {
        label: "联系人",
        info: "李英才 18609931847",
      }, {
        label: "收货单位",
        info: "武汉恒望科技有限公司",
      }, {
        label: "联系人",
        info: "张三 13622551425",
      }, {
        label: "货物件数",
        info: "16件",
      }, ],
      status: "待交付",
    }, {
      id: "18352790283072",
      time: "2018-01-10",
      start: "浙江温州",
      end: "湖北武汉",
      code: "../../images/code-big.jpg",
      bar: [{
        label: "发货单位",
        info: "温州物流",
      }, {
        label: "联系人",
        info: "李英才 18609931847",
      }, {
        label: "收货单位",
        info: "武汉恒望科技有限公司",
      }, {
        label: "联系人",
        info: "张三 13622551425",
      }, {
        label: "货物件数",
        info: "16件",
      }, {
        label: "交付时间",
        info: "2018-01-11 12:53",
      }, ],
      status: "已交付",
    }],

    hide: true,
    hideCode: true,
    handoverTip: "货运单二维码可点击放大",
  },



  //选择我的订单状态
  selectStatus: function(e) {
    var index = e.target.dataset.index;
    this.setData({
      selectStatus: index
    })
  },


  //打开二维码弹窗
  showCode: function(e) {
    var codeId = e.currentTarget.dataset.id
    var codePic = e.currentTarget.dataset.code
    this.setData({
      hide: false,
      hideCode: false,
      codeId: codeId,
      codePic: codePic
    })
  },


  //关闭弹窗
  hide: function(e) {
    this.setData({
      hide: true,
      hideCode: true,
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
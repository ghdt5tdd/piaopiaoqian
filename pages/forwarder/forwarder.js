// pages/forwarder/forwarder.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    forwarderList: [{
      logo: "../../images/company3.jpg",
      name: "邮政EMS",
      spec: "快速取件，精准送达，扫码支付",
      tel: "0577-61778888",
      by: "浙江、湖北、北京、上海配送",
      location: "浙江省杭州市东宁路60号A座",
    }, {
      logo: "../../images/company1.jpg",
      name: "德力西物流",
      spec: "快速预约寄件，平均一小时上门收件",
      tel: "0577-61778888",
      by: "浙江、江苏、上海配送",
      location: "浙江省乐清市柳市镇德力西高科技工业园",
    }, {
      logo: "../../images/company2.jpg",
      name: "万隆化工物流",
      spec: "卓越服务，我们就在您身边",
      tel: "0577-65092470",
      by: "浙江、江苏、上海配送",
      location: "浙江省温州市瑞安市锦湖街道万隆化工",
    }, {
      logo: "../../images/company1.jpg",
      name: "德力西物流",
      spec: "快速预约寄件，平均一小时上门收件",
      tel: "0577-61778888",
      by: "浙江、江苏、上海配送",
      location: "浙江省乐清市柳市镇德力西高科技工业园",
    }, ]
  },

  //选中承运商
  toSend: function(e) {
    wx.navigateBack({ //返回
      delta: 1
    })
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2]; //上一个页面
    //直接调用上一个页面的setData()方法，把数据存到上一个页面中去

    var forwarderList = this.data.forwarderList
    var index = e.currentTarget.dataset.index
    var name = forwarderList[index].name

    prevPage.setData({
      sendForwarder: name,
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
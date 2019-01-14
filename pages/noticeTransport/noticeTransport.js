// pages/noticeTransport/noticeTransport.js
const ajax = require('../../utils/ajax.js')
const util = require('../../utils/util.js')
const storage = require('../../utils/storage.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ul: 'ul-2',
    orderStatus: [{
      name: "未读",
      value: 0
    }, {
      name: "已读",
      value: 1
    }],
    selectStatus: 0,

    noticeItem: [{
      img: "../../images/truck.png",
      title: "物流通知",
      time: "2018-01-15 10:08",
      info: "您的货物已到达目的地，请注意接收"
    }, {
      img: "../../images/truck.png",
      title: "物流通知",
      time: "2018-01-09 15:32",
        info: "您的货物因天气原因暂时无法运送，请见谅。后续消息一旦变更，将会第一时间通知您"
    }]

  },



  //选择状态
  selectStatus: function(e) {
    var index = e.target.dataset.index;
    this.setData({
      selectStatus: index
    })
  },


  getMyShopOrderMessageList() {
    wx.showLoading({
      title: '获取消息中...'
    })
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getMyShopOrderMessageList()
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
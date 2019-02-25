// pages/notice/notice.js
const ajax = require('../../utils/ajax.js')
const app = getApp()
var order = ['red', 'yellow', 'blue', 'green', 'red']
Page({

  /**
   * 页面的初始数据
   */
  data: {
    exceptionMessageCount: 0,
    noticeCount: 0,
    sellerOrderMessageCount: 0,
    shopOrderMessageCount: 0,
    messageList: []
  },


  toMessage(e) {
    const typeId = e.currentTarget.dataset.typeId
    const typeImg = e.currentTarget.dataset.typeImg
    wx.navigateTo({
      url: '../noticeOrder/noticeOrder?typeId=' + typeId + '&typeImg=' + typeImg
    })
  },
  
  //运单消息
  // toTransport: function(e) {
  //   wx.navigateTo({
  //     url: '../noticeTransport/noticeTransport'
  //   })
  // },

  // //订单消息
  // toOrder: function (e) {
  //   wx.navigateTo({
  //     url: '../noticeOrder/noticeOrder'
  //   })
  // },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
 
  },

  getUnreadMessageCount() {
    ajax.getApi('app/member/getMessageTypeByRole', {

    }, (err, res) => {
      if (res && res.success) {
        const messageList = res.data
        let unReadNum = 0
        messageList.forEach(v => {
          unReadNum += v.unread_message_count
        })
        if (unReadNum > 0) {
          wx.setTabBarBadge({//未读消息
            index: 2,
            text: unReadNum + '',
          });
        }
        this.setData({
          messageList
        })
        // const exceptionMessageCount = res.data.exceptionMessageCount
        // const noticeCount = res.data.noticeCount
        // const sellerOrderMessageCount = res.data.sellerOrderMessageCount
        // const shopOrderMessageCount = res.data.shopOrderMessageCount
        // const unReadNum = res.data.exceptionMessageCount +
        //   res.data.noticeCount +
        //   res.data.sellerOrderMessageCount +
        //   res.data.shopOrderMessageCount
        // if (unReadNum > 0) {
        //   wx.setTabBarBadge({//未读消息
        //     index: 2,
        //     text: unReadNum + '',
        //   });
        // }
        // this.setData({
        //   exceptionMessageCount,
        //   noticeCount,
        //   sellerOrderMessageCount,
        //   shopOrderMessageCount
        // })
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
    this.getUnreadMessageCount()
    
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
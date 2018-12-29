// pages/workInfo/workInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    abnormalid: "1353426896419",
    abnormaltime: "2018-01-08",
    abnormalstatus: "待评价",
    abnormalname: "服务器远程受影响",
    abnormalinfo: "服务器远程进去就让我们修复，修复其他选项点了都没用，只有系统还原没有点，这个怎么处理，急急急。点了系统还原之后C盘或者D盘是不是就格式化了",
    abnormalimport: "重要",

    abnormalImgs: [{
      pic: "../../images/scene1.jpg"
    }, {
      pic: "../../images/scene2.jpg"
    }, ],

    bookName: "张三",
    bookTel: "15822937463",

    abnormalRecord: [{
      name: "张三",
      info: "确认工单",
      time: "2018-01-08",
    }, {
      name: "客服A",
      info: "已经解决了这个BUG，您可以重新试试。成功解决请确认，失败请反馈我们。",
      time: "2018-01-12",
    }, {
      name: "客服A",
      info: "你好，我们已收到您提交的问题，正在为您查看。",
      time: "2018-01-12",
    }, {
      name: "张三",
      info: "提交工单",
      time: "2018-01-08",
    }],
    
  },



  //拨打电话
  bookTel: function(e) {
    wx.makePhoneCall({
      phoneNumber: this.data.bookTel
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
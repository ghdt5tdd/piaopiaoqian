// pages/abnormalinfo/abnormalinfo.js
const ajax = require('../../utils/ajax.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    exceptionId:'',
    exceptionInfo: {},
    abnormalItems: [{
      name: "张三",
      status: "等待处理",
      row: [{
        label: "异常类型",
        name: "货损",
      }, {
        label: "发生环节",
        name: "取货",
      }, {
        label: "异常内容",
        name: "武汉市洪山区交接时发现货物破损",
      }, {
        label: "发生地点",
        name: "湖北省武汉市洪山区关谷世贸中心",
      }, ],
    }, ],

    abnormalImgs: [{
      pic: "../../images/scene1.jpg"
    }, {
      pic: "../../images/scene2.jpg"
    }, {
      pic: "../../images/scene3.jpg"
    }, {
      pic: "../../images/scene2.jpg"
    }, ],

    bookName: "张三",
    bookTel: "15822937463",

    abnormalRecord: [{
      name: "温州物流",
      info: "查看异常上报",
      time: "2018-01-12",
    }, {
      name: "张三",
      info: "发起异常上报",
      time: "2018-01-08",
    }]
  },




  preview:function(e) {
    const index = e.currentTarget.dataset.index
    const currentImg = this.data.exceptionInfo.pictures[index]
    
    wx.previewImage({
      urls: this.data.exceptionInfo.pictures,
      current: currentImg
    })

  },


  //拨打电话
  bookTel: function(e) {
    wx.makePhoneCall({
      phoneNumber: this.data.exceptionInfo.contact_way
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const exceptionId = options.id
    this.setData({
      exceptionId
    })
    wx.showLoading({
      title: '详情加载中',
    })

    ajax.getApi('app/order/getExceptionDetail', {
      exceptionId
    }, (err, res) => {
      if (res && res.success) {
        wx.hideLoading()
        console.log(res.data)
        this.setData({
          exceptionInfo: res.data
        })
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
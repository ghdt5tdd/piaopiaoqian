// pages/service/service.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showCollect: false, //为true的时候可以填写代收货款
    array: ['无需回单', '原单返回'],
    index: 0,
    bill: '无需回单'
  },

  //选择回单
  bindBill: function(e) {
    var index = e.detail.value
    var bill = this.data.array[index]
    this.setData({
      index: e.detail.value,
      bill: bill
    })
  },


  //保存
  formSubmit: function(e) {
    wx.navigateBack({ //返回
      delta: 1
    })
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2]; //上一个页面
    //直接调用上一个页面的setData()方法，把数据存到上一个页面中去



    if (e.detail.value.support != '') { //保价
      prevPage.setData({
        support: '保价' + e.detail.value.support + '元',
      })
    }

    if (e.detail.value.collect != '' && e.detail.value.collect != undefined) { //代收
      prevPage.setData({
        collect: '代收' + e.detail.value.collect + '元',
      })
    }

    prevPage.setData({ //货物名称、件数、包装等信息
      WService: false,
      bill: this.data.bill,
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
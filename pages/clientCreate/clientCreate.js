// pages/addCreate/addCreate.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: "",
    tel: "",

  },





  //保存
  formSubmit: function(e) {

    if (e.detail.value.company == "") {
      wx.showToast({
        title: '请输入客户名称！',
        icon: 'none',
        duration: 3000,
      })

    } else if (e.detail.value.code == "") {
      wx.showToast({
        title: '请输入客户代码！',
        icon: 'none',
        duration: 3000,
      })
    } else if (e.detail.value.card == "") {
      wx.showToast({
        title: '请输入客户卡号！',
        icon: 'none',
        duration: 3000,
      })
    } else if (e.detail.value.name == "") {
      wx.showToast({
        title: '请输入联系人姓名！',
        icon: 'none',
        duration: 3000,
      })
    } else if (e.detail.value.tel == "") {
      wx.showToast({
        title: '请输入联系人手机号！',
        icon: 'none',
        duration: 3000,
      })
    } else if (!(/^1(3|4|5|7|8)\d{9}$/.test(e.detail.value.tel))) {
      wx.showToast({
        title: '手机号格式不正确！',
        icon: 'none',
        duration: 3000,
      })
    } else {

      wx.navigateBack({ //返回
        delta: 1
      })
      var pages = getCurrentPages();
      var prevPage = pages[pages.length - 2]; //上一个页面
      //直接调用上一个页面的setData()方法，把数据存到上一个页面中去

      var addressList = prevPage.data.addressList

      addressList.push({
        "company": e.detail.value.company,
        "code": e.detail.value.code,
        "card": e.detail.value.card,
        "name": e.detail.value.name,
        "tel": e.detail.value.tel,
      })

      prevPage.setData({
        addressList: addressList
      })

    }

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
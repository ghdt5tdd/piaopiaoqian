// pages/addEdit/addEdit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {},





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
    } else if (e.detail.value.door == "") {
      wx.showToast({
        title: '请输入联系人详细地址！',
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
      var index = this.data.index

      addressList[index].company = e.detail.value.company
      addressList[index].code = e.detail.value.code
      addressList[index].card = e.detail.value.card
      addressList[index].name = e.detail.value.name
      addressList[index].tel = e.detail.value.tel


      prevPage.setData({
        addressList: addressList
      })

    }

  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      company: options.company,
      code: options.code,
      card: options.card,
      name: options.name,
      tel: options.tel,
      index: options.index,
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
    //接收从定位页面或者搜索定位页面传递的参数
    var that = this
    let pages = getCurrentPages();
    let currPage = pages[pages.length - 1];
    var sign = currPage.data.sign
    if (sign == '1') {
      that.setData({ //将携带的参数赋值
        region: [currPage.data.province, currPage.data.city, currPage.data.district],
        location: currPage.data.province + currPage.data.city + currPage.data.district,
        door: currPage.data.door,
      });
    } else {
      //如果是从选择地址页面跳转则不传参

    }

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
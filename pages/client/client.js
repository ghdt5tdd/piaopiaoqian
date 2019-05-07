// pages/client/client.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchClear: true,
    searchVal: '',
    addressList: [{
      company: "温州鑫煌物流有限公司有限公司",
      code: "MGsy2637",
      card: "6228848372635464731",
      name: "林元准",
      tel: "13858778218",
    }, {
      company: "温州红太阳企业管理咨询公司",
      code: "redsunjy",
      card: "6226042635464731",
      name: "陈庆武",
      tel: "13353338777",
    }, {
      company: "温州骏华物流有限公司",
      code: "junhua",
      card: "9558800200135073266",
      name: "胡海滨",
      tel: "15867770555",
    }, ],
  },

  bindSarchInput: function(e) {
    this.setData({
      searchVal: e.detail.value,
      searchClear: false
    })
  },

  //清除搜索
  searchClear: function(e) {
    this.setData({
      searchClear: true,
      searchVal: ''
    })
  },

  //选中地址
  toSend: function(e) {
    wx.navigateBack({ //返回
      delta: 1
    })
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2]; //上一个页面
    //直接调用上一个页面的setData()方法，把数据存到上一个页面中去

    var addressList = this.data.addressList
    var index = e.currentTarget.dataset.index

    prevPage.setData({
      company: addressList[index].company,
      code: addressList[index].code,
      card: addressList[index].card,
      contacts: addressList[index].name,
      tel: addressList[index].tel
    })
  },


  //新增客户
  toCreate: function(e) {
    wx.navigateTo({
      url: '../clientCreate/clientCreate'
    })
  },

  //编辑客户
  toEdit: function(e) {
    wx.navigateTo({
      url: '../clientEdit/clientEdit?company=' + e.currentTarget.dataset.company + "&code=" + e.currentTarget.dataset.code + "&card=" + e.currentTarget.dataset.card + "&name=" + e.currentTarget.dataset.name + "&tel=" + e.currentTarget.dataset.tel + "&index=" + e.currentTarget.dataset.index
    })
  },


  //删除客户
  delete: function(e) {
    var addressList = this.data.addressList
    var index = e.currentTarget.dataset.index
    addressList.splice(index, 1);
    this.setData({
      addressList: addressList
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
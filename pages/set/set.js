// pages/set/set.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myList: [{
      img: "../../images/icon9.png",
      label: "密码修改",
      to: "changePassword",
    }, {
      img: "../../images/icon10.png",
      label: "手机号更改",
      to: "changeTel",
    }, {
      img: "../../images/icon11.png",
      label: "用户指南",
      to: "guide",
    }],
    gps: false,
    fence: false,
    hide: true,
    hideFence: true,
    popupFence: "电子围栏自动签收授权内容取自后台，由后台统一维护。电子围栏自动签收授权内容取自后台，由后台统一维护。"
  },
  

  //密码修改
  changePassword: function(e) {
    wx.navigateTo({
      url: '../changePassword/changePassword'
    })
  },

  //手机号更改
  changeTel: function(e) {
    wx.navigateTo({
      url: '../changeTel/changeTel'
    })
  },

  //用户指南
  guide: function(e) {
    wx.navigateTo({
      url: '../guide/guide'
    })
  },

  //GPS权限
  GPS: function(e) {
    var param = e.currentTarget.dataset.param;
    this.setData({
      gps: param == 1 ? (!this.data.gps) : false,
    });
  },

  //电子围栏
  Fence: function(e) {
    if (this.data.fence == false) {
      this.setData({
        hide: false,
        hideFence: false,
      });
    } else {
      this.setData({
        fence: false,
      });
    }
  },

  //开启电子围栏
  sure: function(e) {
    this.setData({
      fence: true,
      hide: true,
      hideFence: true,
    });

  },

  //关闭弹窗
  hide: function(e) {
    this.setData({
      hide: true,
      hideFence: true,
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
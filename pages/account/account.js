// pages/account/account.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    account: [{
      name: "子账户一",
      contacts: "张三",
      nickname: "001",
      permit: "",
      start: false
    }, {
      name: "子账户二",
      contacts: "李思",
      nickname: "002",
      permit: "普通操作员",
      start: true
    }],
    hide: true,
    hidePermit: true,
    permitRole: [{
      name: "老板",
      icon: ''
    }, {
      name: "管理员",
      icon: ''
    }, {
      name: "普通操作者",
      icon: 'success_no_circle'
    }]
  },



  //手指触摸动作开始 记录起点X坐标
  touchstart: function(e) {
    //开始触摸时 重置所有删除
    this.data.account.forEach(function(v, i) {
      if (v.isTouchMove) //只操作为true的
        v.isTouchMove = false;
    })
    this.setData({
      startX: e.changedTouches[0].clientX,
      startY: e.changedTouches[0].clientY,
      account: this.data.account
    })
  },

  //滑动事件处理
  touchmove: function(e) {
    var that = this,
      index = e.currentTarget.dataset.index, //当前索引
      startX = that.data.startX, //开始X坐标
      startY = that.data.startY, //开始Y坐标
      touchMoveX = e.changedTouches[0].clientX, //滑动变化坐标
      touchMoveY = e.changedTouches[0].clientY, //滑动变化坐标
      //获取滑动角度
      angle = that.angle({
        X: startX,
        Y: startY
      }, {
        X: touchMoveX,
        Y: touchMoveY
      });
    that.data.account.forEach(function(v, i) {
      v.isTouchMove = false
      //滑动超过30度角 return
      if (Math.abs(angle) > 30) return;
      if (i == index) {
        if (touchMoveX > startX) //右滑
          v.isTouchMove = false
        else //左滑
          v.isTouchMove = true
      }
    })
    //更新数据
    that.setData({
      account: that.data.account
    })
  },
  /**
   * 计算滑动角度
   * @param {Object} start 起点坐标
   * @param {Object} end 终点坐标
   */
  angle: function(start, end) {
    var _X = end.X - start.X,
      _Y = end.Y - start.Y
    //返回角度 /Math.atan()返回数字的反正切值
    return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
  },

  //右滑删除事件
  del: function(e) {
    this.data.account.splice(e.currentTarget.dataset.index, 1)
    this.setData({
      account: this.data.account
    })
  },

  //启用账号
  set: function(e) {
    var index = e.currentTarget.dataset.index
    var account = this.data.account
    var start = account[index].start;
    account[index].start = !start;

    this.setData({
      account: account
    })
  },

  //账号授权
  permit: function(e) {
    wx.setStorageSync('permitindex', e.currentTarget.dataset.index)
    this.setData({
      hide: false,
      hidePermit: false,
    })
  },

  //角色选择
  choose: function(e) {
    var index = e.currentTarget.dataset.index
    var permitRole = this.data.permitRole
    for (var i = 0; i < permitRole.length; i++) {
      permitRole[i].icon = ''
    }
    permitRole[index].icon = 'success_no_circle'
    var role = permitRole[index].name
    wx.setStorageSync('permitrole', role)
    this.setData({
      permitRole: permitRole,
    })

  },

  //角色授权
  sure: function(e) {
    var index = wx.getStorageSync('permitindex')
    var name = wx.getStorageSync('permitrole')
    var account = this.data.account
    account[index].permit = name
    this.setData({
      account: account,
      hide: true,
      hidePermit: true,
    })
  },

  //关闭弹窗
  hide: function(e) {
    this.setData({
      hide: true,
      hidePermit: true,
    })
  },

  //新增
  toAdd: function(e) {
    wx.navigateTo({
      url: '../accountAdd/accountAdd'
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
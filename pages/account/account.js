// pages/account/account.js
const ajax = require('../../utils/ajax.js')
Page({

  /**
   * 页面的初始数据
   */
  data: { 
    searchVal: '',
    searchClear: true,
    page: 1,
    pageSize: 50,
    account: [],
    filterAccount:[],
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
    }],
    longClickIndex: -1,
    //长按事件弹窗
    hideLongtap: true
  },

  lower:function(e) {
    console.log(e) 
  },

  /// 长按事件
  longTap: function (e) {
    console.log("长按事件")
    var index = e.currentTarget.dataset.index
    this.setData({
      hide: false,
      hideLongtap: false,
      longClickIndex: index,
    })
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

  bindNetwork () {
    this.setData({
      hide: true,
      hideLongtap: true,
    })

    {
      wx.showLoading({
        title: '目前不支持此功能...',
      })
      return ;
    }

    const id = this.data.account[this.data.longClickIndex].id
    const user_account = this.data.account[this.data.longClickIndex].user_account
    wx.showLoading({
      title: '绑定网点中...',
      mask: true
    })
    ajax.postApi('app/member/subAccountBindBranch', {
      subAccountId: id,
      branchId : null
    }, (err, res) => {
      wx.hideLoading()
      if (res && res.success) {
        wx.showModal({
          title: '绑定成功!',
          content: '子账户' + user_account + '已绑定网点：',
        })
      }
    })	
  },

  bindVehicle() {
    this.setData({
      hide: true,
      hideLongtap: true,
    })

    {
      wx.showLoading({
        title: '目前不支持此功能...',
      })
      return;
    }

    const id = this.data.account[this.data.longClickIndex].id
    const user_account = this.data.account[this.data.longClickIndex].user_account
    wx.showLoading({
      title: '绑定车辆中...',
      mask: true
    })
    ajax.postApi('app/member/subAccountBindVehicle', {
      subAccountId: id,
      vehicleId: null
    }, (err, res) => {
      wx.hideLoading()
      if (res && res.success) {
        wx.showModal({
          title: '绑定成功!',
          content: '子账户' + user_account + '已绑定车辆：',
        })
      }
    })	
  },

  resetPass:function(e){
    this.setData({
      hide: true,
      hideLongtap: true,
    })
    const id = this.data.account[this.data.longClickIndex].id
    const user_account = this.data.account[this.data.longClickIndex].user_account
    wx.showLoading({
      title: '重置中...',
      mask: true
    })
    ajax.postApi('app/member/resetSubAccountPassword', {
      id
    }, (err, res) => {
      wx.hideLoading()
      if (res && res.success) {
        wx.showModal({
          title: '重置成功!',
          content: '子账户' + user_account + '的密码为888888',
        })
      }
    })	
  },

  edit:function(e){
    const id = this.data.account[this.data.longClickIndex].id
    wx.navigateTo({
      url: '../accountEdit/accountEdit?id=' + id
    })
  },

  //右滑删除事件
  del: function(e) {
    this.setData({
      hide: true,
      hideLongtap: true,
    })
    const index = e.currentTarget.dataset.index
    const id = this.data.account[this.data.longClickIndex].id
    wx.showLoading({
      title: '删除中...',
      mask: true
    })
    ajax.postApi('app/member/deleteSubAccount', {
      id
    }, (err, res) => {
      wx.hideLoading()
      if (res && res.success) {
        let delIndex
        const account = this.data.account
        account.forEach((item, index) => {
          if (item.id === id) {
            delIndex = index
          }
        })
        account.splice(delIndex, 1)

        const filterAccount = account.filter(item => {
          return item.phone.indexOf(this.data.searchVal) !== -1
        })


        this.setData({
          account,
          filterAccount
        })
      }
    })	

  },


  //关键字搜索
  bindSarchInput: function (e) {
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 0
    })

    var inputVal = e.detail.value;
    const filterAccount = this.data.account.filter(item => {
      return item.phone.indexOf(inputVal) !== -1
    })
    this.setData({
      filterAccount,
      searchClear: false,
      searchVal: inputVal
    })
  },

  //清除搜索
  searchClear: function (e) {
    this.setData({
      filterAccount: this.data.account,
      searchClear: true,
      searchVal: ''
    })
  },

  //启用账号
  set: function(e) {
    const id = e.currentTarget.dataset.id
    const index = e.currentTarget.dataset.index
    let state = this.data.filterAccount[index].state

    if(state === '1') {
      state = '0'
    }else {
      state = '1'
    }

    wx.showLoading({
      title: '修改状态中...',
      mask: true
    })

    ajax.postApi('app/member/setSubAccountState', {
      id,
      state,
    }, (err, res) => {
      wx.hideLoading()
      if (res && res.success) {
        this.data.filterAccount[index].state = state
        this.setData({
          filterAccount: this.data.filterAccount
        })
      }
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
      hideLongtap: true,
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
    wx.showLoading({
      title: '数据加载中',
    })
    const page = this.data.page
    const pageSize = this.data.pageSize

    ajax.getApi('app/member/findSubAccount', {
      page,
      pageSize
    }, (err, res) => {
      if (res && res.success) {
        wx.hideLoading()
        console.log(res.data)
        this.setData({
          account: res.data,
          filterAccount: res.data
        })
      }
    })	
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
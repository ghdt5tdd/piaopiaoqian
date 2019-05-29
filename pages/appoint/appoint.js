// pages/appoint/appoint.js
const ajax = require('../../utils/ajax.js')
const util = require('../../utils/util.js')
const storage = require('../../utils/storage.js')
const app = getApp()
const roleMap = new Map() 
roleMap.set('ownLogistCenter', 1)
roleMap.set('ownLogistArea', 2)
roleMap.set('bigCustomer', 3)
roleMap.set('franchiser', 4)
roleMap.set('carrier', 5)
roleMap.set('networkAgent', 5)
roleMap.set('cartDriver', 6)

const orderInterface = new Map()
orderInterface.set('ownLogistCenter', 'app/order/listBookingOrder')
orderInterface.set('ownLogistArea', 'app/order/listBookingOrder')
orderInterface.set('bigCustomer', 'app/order/listBookingOrder')
orderInterface.set('franchiser', 'app/order/listBookingOrder')
orderInterface.set('carrier', 'app/order/listCarrierBookingOrder')
orderInterface.set('networkAgent', 'app/order/listCarrierBookingOrder')
orderInterface.set('cartDriver', 'app/order/listDriverBookingOrder')

const customerStatus = [{
  name: '待发布',
  value: 1
}, {
  name: '待接单',
  value: 2
}, {
  name: '待取货',
  value: 3
}, {
  name: '待收货',
  value: 4
}, {
  name: '待评价',
  value: 5
}, {
  name: '全部',
  value: 0
}]
const carrierStatus = [ {
  name: '待接单',
  value: 1
}, {
  name: '待指派',
  value: 2
}, {
  name: '待取货',
  value: 3
}, {
  name: '待收货',
  value: 4
}, {
  name: '已完成',
  value: 5
}, {  
  name: '全部',
  value: 0
}]
const driverStatus = [{
  name: '待接听',
  value: 1
}, {
  name: '待取货',
  value: 2
}, {
  name: '待收货',
  value: 3
}, {
  name: '待回单',
  value: 4
}, {
  name: '已完成',
  value: 5
}, {
  name: '全部',
  value: 0
}]
const roleStatus = new Map()
roleStatus.set('ownLogistCenter', customerStatus)
roleStatus.set('ownLogistArea', customerStatus)
roleStatus.set('bigCustomer', customerStatus)
roleStatus.set('franchiser', customerStatus)
roleStatus.set('carrier', carrierStatus)
roleStatus.set('networkAgent', carrierStatus)
roleStatus.set('cartDriver', driverStatus)


Page({

  /**
   * 页面的初始数据
   */
  data: {
    roleType: undefined,
    status: [],
    selectStatus: 1,
    page: 1,
    pageSize: 10,
    count: 0,
    loadCompleted: false,
    select: 1,
    bookingOrders: [],
    selectOrder: undefined,
    hideShadow: true,
    hidePickup: true,
    hideOrdering: true,
    hide: true,
    hideCode: true,
  },

  bindinput: function (e) {
    const key = e.currentTarget.dataset.key
    this.setData({
      [key]: e.detail.value
    })
  },
  
  handCommand(e){
    const id = e.currentTarget.dataset.id
    const index = e.currentTarget.dataset.index
    const code = e.currentTarget.dataset.code
    const command = e.currentTarget.dataset.command
    const commandText = e.currentTarget.dataset.commandText
    const _this = this

    if (command === 'assign') {
      //指派司机
      wx.navigateTo({
        url: '../dispatch/dispatch?id=' + id
      })
      return;
    } else if (command === 'order') {
      this.order(index)
      return;
    } else if (command === 'pickup') { 
      this.pickup(index)
      return;
    } else {
      wx.showModal({
        title: '操作确认',
        content: '您确定要对此订单进行' + commandText + '吗?(订单号:' + code +')',
        success(res) {
          if (res.confirm) {
            _this.postCommand(id, command)
          }
        },
      })
    }
  },

  postCommand(id, command) {
    wx.showLoading({
      title: '操作中...',
      mask: true
    })
    ajax.postApi('app/order/bookingOrderCommand', {
      id,
      command
    }, (err, res) => {
      wx.hideLoading()
      if (res && res.success) {
        wx.showToast({
          title: '操作成功',
        })
        this.setData({
          page: 1,
          bookingOrders: [],
          loadCompleted: false
        }, () => {
          this.getListBookingOrder()
        })
      } else {
        if (res.text) {
          wx.showToast({
            title: res.text,
            duration: 1000
          })
        }
      }
    })
  },


  //弹出取货窗口
  pickup(index) {
    const selectOrder = this.data.bookingOrders[index]
    this.setData({
      hideShadow: false,
      hidePickup: false,
      selectOrder,
    })
  },

  //弹出订单信息窗口
  order(index) {
    const selectOrder = this.data.bookingOrders[index]
    this.setData({
      hideShadow: false,
      hideOrdering: false,
      selectOrder,
    })
  },

  surePick() {
    const id = this.data.selectOrder.id
    this.setData({
      hideShadow: true,
      hidePickup: true,
    })
    this.postCommand(id, 'pickup')
  },

  sureOrder() {
    const id = this.data.selectOrder.id
    this.setData({
      hideShadow: true,
      hideOrdering: true,
    })
    this.postCommand(id, 'order')
  },

  //打开二维码弹窗
  showCode: function (e) {
    var codeId = e.currentTarget.dataset.id
    var codePic = e.currentTarget.dataset.code
    this.setData({
      hide: false,
      hideCode: false,
      codeId: codeId,
      codePic: codePic
    })
  },

  hide: function (e) {
    this.setData({
      hideShadow: true,
      hidePickup: true,
      hideOrdering: true,
    })
  },

  //更多按钮
  optmore: function (e) {
    const index = e.currentTarget.dataset.index
    const bookingOrders = this.data.bookingOrders
    const order = bookingOrders[index]

    if (order.showMore) {
      order.showMore = !order.showMore 
    } else {
      order.showMore = true
    }

    this.setData({
      bookingOrders,
    });
  },

  //选择状态
  selectStatus: function (e) {
    var index = parseInt(e.currentTarget.dataset.index)
    this.setData({
      select: index,
      page: 1,
      bookingOrders: [],
      loadCompleted: false
    }, () => {
      this.getListBookingOrder()
    })
  },

  //下单
  toSend: function(e) {
    wx.navigateTo({
      url: '../send/send'
    })
  },

  //跳转到货运单详情页面
  toInfo: function (e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../appointInfo/appointInfo?id=' + id
    })
  },

  //去节点状态
  toNode: function (e) {
    wx.navigateTo({ //随便写的URL
      url: '../node/node'
    })
  }, 


  //选择订单状态
  select: function (e) {
    var index = e.currentTarget.dataset.index
    var index = e.currentTarget.dataset.index
    this.setData({
      select: index,
    })
  },

  getListBookingOrder() {
    const page = this.data.page
    const pageSize = this.data.pageSize
    const state = this.data.select
    wx.showLoading({
      title: '查询中',
    })
    const partnerTypeCode = app.globalData.memberInfo.partnerTypeCode

    let api = orderInterface.get(partnerTypeCode)
    //暂时加一层判断，根据个人角色来决定是司机还是承运商身份
    console.log(app.globalData.memberInfo.talent_type_code)
    if (app.globalData.memberInfo.talent_type_code === 'driver' || app.globalData.memberInfo.talent_type_code === 'bigDriver') {
      api = 'app/order/listDriverBookingOrder'
    }
    ajax.getApi(api, {
      page,
      pageSize,
      state
    }, (err, res) => {
      wx.hideLoading()
      if (res && res.success) {
        if (res.data.length > 0) {
          const bookingOrders = this.data.bookingOrders
          const newBookingOrders = res.data

          newBookingOrders.forEach(v => {
            const command_list = v.command_list
            if (command_list instanceof Array && command_list.length > 0) {
              let hide_command_list, show_command_list
              if (command_list.length > 3) {
                show_command_list = command_list.slice(0, 3)
                hide_command_list = command_list.slice(3)
              } else {
                show_command_list = command_list
                hide_command_list = []
              }
              v.hide_command_list = hide_command_list
              v.show_command_list = show_command_list
            }
          })

          Array.prototype.push.apply(bookingOrders, newBookingOrders)
          this.setData({
            bookingOrders
          })
        } else {
          this.setData({
            loadCompleted: true
          })
          wx.showToast({
            title: '数据已全部加载完毕',
            duration: 1000
          })
        }

      } else {
        if (res.text) {
          wx.showToast({
            title: res.text,
            duration: 1000
          })
        }
      }
    })
  },

  lower: function (e) {
    let page = this.data.page
    const pageSize = this.data.pageSize
    const loadCompleted = this.data.loadCompleted
    if (!loadCompleted) {
      wx.showLoading({
        title: '更多数据加载中...',
      })
      page++
      this.setData({
        page
      }, () => {
        this.getListBookingOrder(() => {
          wx.hideLoading()
        })
      })
    } else {
      wx.showToast({
        title: '数据已全部加载完毕',
        duration: 1000
      })
    }
  },

  setRole(){
    const partnerTypeCode = app.globalData.memberInfo.partnerTypeCode
    const talent_type_code = app.globalData.memberInfo.talent_type_code
    const roleType = roleMap.get(partnerTypeCode)
    let status = roleStatus.get(partnerTypeCode)
    if (partnerTypeCode === 'carrier' && (talent_type_code === 'driver' || talent_type_code === 'bigDriver')) {
      status = roleStatus.get('cartDriver')
    }

    if (partnerTypeCode === 'networkAgent' && (talent_type_code === 'driver' || talent_type_code === 'bigDriver')) {
      status = roleStatus.get('cartDriver')
    }
    
    console.log(roleType)
    this.setData({
      roleType,
      talent_type_code,
      status
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setRole()
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    //计算宽度
    var query = wx.createSelectorQuery();
    var that = this;
    query.selectAll('.order-status-items').boundingClientRect(function (rect) {
      var widthAll = 0
      for (let i = 0; i < that.data.status.length; i++) {
        widthAll += rect[i].width + 21
      }
      that.setData({
        statusWidth: widthAll + 'px'
      })
    }).exec();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.setData({
      page: 1,
      bookingOrders: [],
      loadCompleted: false
    }, () => {
      this.getListBookingOrder()
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
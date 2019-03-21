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
roleMap.set('cartDriver', 6)

const orderInterface = new Map()
orderInterface.set('ownLogistCenter', 'app/order/listBookingOrder')
orderInterface.set('ownLogistArea', 'app/order/listBookingOrder')
orderInterface.set('bigCustomer', 'app/order/listBookingOrder')
orderInterface.set('franchiser', 'app/order/listBookingOrder')
orderInterface.set('carrier', 'app/order/listCarrierBookingOrder')
orderInterface.set('cartDriver', 'app/order/listDriverBookingOrder')

const customerStatus = [{
  name: '全部',
  value: 0
}, {
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
}]
const carrierStatus = [{
  name: '全部',
  value: 0
}, {
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
}]
const driverStatus = [{
  name: '全部',
  value: 0
}, {
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
}]
const roleStatus = new Map()
roleStatus.set('ownLogistCenter', customerStatus)
roleStatus.set('ownLogistArea', customerStatus)
roleStatus.set('bigCustomer', customerStatus)
roleStatus.set('franchiser', customerStatus)
roleStatus.set('carrier', carrierStatus)
roleStatus.set('cartDriver', driverStatus)


Page({

  /**
   * 页面的初始数据
   */
  data: {
    roleType: undefined,
    status: [{
      name: '全部',
      value: 0
    }, {
      name: '待发布',
      value: 1
    }, {
      name: '待接单',
      value: 2
    }, {
      name: '待指派',
      value: 3
    }, {
      name: '待取件',
      value: 4
    }, {
      name: '已完成',
      value: 5
    }],

    selectStatus: 0,
    page: 1,
    pageSize: 10,
    count: 0,
    loadCompleted: false,
    select: 0,
    bookingOrders: [],
    selectOrder: undefined,

    orderTable: [{
      id: "18352790283072",
      time: "2018-01-10",
      start: "浙江温州",
      end: "湖北武汉",
      receive: "武汉恒望科技有限公司",
      num: "210",
      opt: [{
        name: "拒绝",
        to: "refuse",
        style: 1,
      }, {
        name: "查看",
        to: "toDetail",
        style: 2,
      }, {
        name: "接单",
        to: "consent",
        style: 3,
      }],
    }, {
      id: "18352790280265",
      time: "2018-01-02",
      start: "浙江温州",
      end: "北京市",
      receive: "北京海淀雷蒙赛博机电技术有限公司",
      num: "150",
      opt: [{
        name: "查看",
        to: "toDetail",
        style: 2,
      }, {
        name: "派车",
        to: "toDispatch",
        style: 3,
      }, {
        name: "取货",
        to: "pickup",
        style: 3,
      }],
    }, {
      id: "18352790283072",
      time: "2018-01-01",
      start: "浙江温州",
      end: "湖北武汉",
      receive: "武汉恒望科技有限公司",
      num: "210",
      opt: [{
        name: "查看",
        to: "toDetail",
        style: 2,
      }, {
        name: "派车",
        to: "toDispatch",
        style: 3,
      }],
    }, ],
    hideShadow: true,
    hidePickup: true,

  },

  bindinput: function (e) {
    const key = e.currentTarget.dataset.key
    this.setData({
      [key]: e.detail.value
    })
  },
  
  handCommand(e){
    const id = e.currentTarget.dataset.id
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
    } else if (command === 'pickup') {
      this.pickup()
      return;
    } else {
      wx.showModal({
        title: '操作确认',
        content: '您确定要对订单号为' + code + '的订单进行' + commandText + '操作吗?',
        success(res) {
          if (res.confirm) {
            wx.showLoading({
              title: '操作中...',
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
                _this.setData({
                  page: 1,
                  bookingOrders: [],
                  loadCompleted: false
                }, () => {
                  _this.getListBookingOrder()
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
          }
        },
      })
    }
  },


  //取货
  pickup: function (e) {
    var index = e.target.dataset.index;
    const selectOrder = this.data.bookingOrders[index]
    this.setData({
      hideShadow: false,
      hidePickup: false,
      selectOrder,
    })
  },


  hide: function (e) {
    this.setData({
      hideShadow: true,
      hidePickup: true,
    })
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
    console.log(partnerTypeCode)
    let api = orderInterface.get(partnerTypeCode)
    //暂时加一层判断，根据个人角色来决定是司机还是承运商身份
    if (app.globalData.memberInfo.talent_type === 'driver' || app.globalData.memberInfo.talent_type === 'bigdriver') {
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
          Array.prototype.push.apply(bookingOrders, res.data)
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
    const roleType = roleMap.get(partnerTypeCode)
    const status = roleStatus.get(partnerTypeCode)
    this.setData({
      roleType,
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
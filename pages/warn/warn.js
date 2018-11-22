// pages/warn/warn.js
const ajax = require('../../utils/ajax.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderStatus: [{ 
      name: "预警运单",
      value: 0
    }, {
      name: "预警订单",
      value: 1
    }, ],

    sellerOrder:[],
    shopOrder:[],
    selectStatus: 0,
    page: 1,
    pageSize: 10,
    loadCompleted: false,
    ul: "ul-2",

    orderTable: [{
      id: "18352790283072",
      time: "2018-01-10",
      start: "浙江温州",
      end: "湖北武汉",
      receive: "武汉恒望科技有限公司",
      num: "210",
      date: "10",
      code: "../../images/code-big.jpg",
    }, {
      id: "18352790280265",
      time: "2018-01-02",
      start: "浙江温州",
      end: "北京市",
      receive: "北京海淀雷蒙赛博机电技术有限公司",
      num: "150",
      date: "5",
      code: "../../images/code-big.jpg",
    }, ],


    orderTablebar: [{
      id: "18352790283072",
      time: "2018-01-10",
      date: "8",
      bar: [{
        info: [{
          label: "",
          name: "10",
        }, {
          label: "商品编码",
          name: "EWHTCK0283",
        }, {
          label: "商品名称",
          name: "SC32*50S带磁气缸",
        }, {
          label: "订单数量",
          name: "500",
        }, {
          label: "属性状态",
          name: "库存 待发货",
        }, {
          label: "备注",
          name: "破损包换，若发货数量有误，3日内补发",
        }, ]
      }, {
        info: [{
          label: "",
          name: "20",
        }, {
          label: "商品编码",
          name: "DHCHTS0201",
        }, {
          label: "商品名称",
          name: "8寸5合1多功能尖嘴钳",
        }, {
          label: "订单数量",
          name: "120",
        }, {
          label: "属性状态",
          name: "库存 缺货",
        }, {
          label: "备注",
          name: "",
        }, ]
      }]
    }, {
      id: "18352790280265",
      time: "2018-01-02",
      date: "3",
      bar: [{
        info: [{
          label: "",
          name: "10",
        }, {
          label: "商品编码",
          name: "EWHTCK0283",
        }, {
          label: "商品名称",
          name: "SC32*50S带磁气缸",
        }, {
          label: "订单数量",
          name: "500",
        }, {
          label: "属性状态",
          name: "定制 待发货",
        }, {
          label: "备注",
          name: "破损包换，若发货数量有误，3日内补发",
        }, ]
      }, ]
    }, ]



  },



  //选择我的订单状态
  selectStatus: function(e) {
    var index = e.target.dataset.index;
    this.setData({
      selectStatus: index,
      page: 1,
      shopOrder: [],
      sellerOrder: [],
      loadCompleted: false,
    }, () => {
      wx.showLoading({
        title: '数据加载中...',
      })
      this.getOrder(() => {
        wx.hideLoading()
      })
    })
  },


  //跳转到货运单详情页面
  toInfo: function(e) {
    wx.navigateTo({
      url: '../transportdetail/transportdetail?id=' + e.currentTarget.dataset.shoporderId
    })
  },

  lower: function (e) {
    let page = this.data.page
    const pageSize = this.data.pageSize
    const loadCompleted = this.data.loadCompleted
    console.log(page, pageSize)
    if (!loadCompleted) {
      wx.showLoading({
        title: '更多数据加载中...',
      })
      page++
      this.setData({
        page
      }, () => {
        this.getOrder(() => {
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({
      title: '数据加载中...',
    })
    this.getOrder(() => {
      wx.hideLoading()
    })
  },

  getOrder: function (callback) {
    const status = this.data.selectStatus
    if (status === 0) {
      //预警运单
      this.getEarlyWaringShopOrder(callback)
    } else if (status === 1){
      //预警订单
      this.getEarlyWaringSellerOrder(callback)
    }else {
      wx.showToast({
        title: '错误的tab_id',
      })
    }
  },

  //预警运单
  getEarlyWaringShopOrder: function (callback) {
    ajax.getApi('app/order/getEarlyWaringShopOrder', {
      page: this.data.page,
      pageSize: this.data.pageSize
    }, (err, res) => {
      console.log(res)
      if (res && res.success) {
        if (res.data.length > 0) {
          const shopOrder = this.data.shopOrder
          Array.prototype.push.apply(shopOrder, res.data);
          this.setData({
            shopOrder
          })
        } else {
          wx.hideLoading(() => {
            wx.showToast({
              title: '预警运单已加载完毕',
              duration: 1000
            })
          })
          this.setData({
            loadCompleted: true
          })
        }
      }
      if (callback) {
        callback()
      }
    })
  },

  //预警订单
  getEarlyWaringSellerOrder: function (callback) {
    ajax.getApi('app/order/getEarlyWaringSellerOrder', {
      page: this.data.page,
      pageSize: this.data.pageSize
    }, (err, res) => {
      console.log(res)
      if (res && res.success) {
        if (res.data.length > 0) {
          const sellerOrder = this.data.sellerOrder
          Array.prototype.push.apply(sellerOrder, res.data);
          this.setData({
            sellerOrder
          })
        } else {
          wx.hideLoading(() => {
            wx.showToast({
              title: '预警订单已加载完毕',
              duration: 1000
            })
          })
          this.setData({
            loadCompleted: true
          })
        }
      }
      if (callback) {
        callback()
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
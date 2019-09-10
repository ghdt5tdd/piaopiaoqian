// pages/order/order.js
const ajax = require('../../utils/ajax.js')
const util = require('../../utils/util.js')
const app = getApp()
const orderInterface = new Map()
orderInterface.set('ownLogistCenter', 'app/order/getOwnLogistSellerOrders')
orderInterface.set('ownLogistArea', 'app/order/getOwnLogistSellerOrders')

orderInterface.set('bigCustomer', 'app/order/getCustomAndFranchiserSellerOrders')
orderInterface.set('franchiser', 'app/order/getCustomAndFranchiserSellerOrders')
Page({

  /**
   * 页面的初始数据
   */ 
  data: {
    query:{
      no: '',
      state: undefined,
      startDate: '',
      endDate: '',
      goodsCode: '',
      billNo: '',
      page:1,
      pageSize: 10,
      loadCompleted: false
    },
    hideFilter: true,
    hide: true,
    filter: [],
    Index: "",
    fixedTop: false,

    orderStatus: [{
      name: "全部",
      value: undefined
    }, {
      name: "生产中",
      value: 0
    }, {
      name: "待发货",
      value: 1
    }, {
      name: "调拨中",
      value: 2
    }, {
      name: "在途中",
      value: 3
    }, {
      name: "已到达",
      value: 4
    }, {
      name: "待签收",
      value: 5
    }, {
      name: "已签收",
      value: 6
    }, ],

    selectStatus: 0,
    orders:[],
    orderWidth: "100%",
  },



  //输入筛选条件
  bindInput: function(e) {   
    const key = e.currentTarget.dataset.key
    this.data.query[key] = e.detail.value

    this.setData({
      query: this.data.query,
    })
  },

  //清除筛选条件
  conditionClear: function(e) {
    var index = e.currentTarget.dataset.index
    var queryItems = this.data.queryItems
    queryItems[index].status = false
    queryItems[index].val = ''

    this.setData({
      queryItems: queryItems,
    })
  },

  //打开日历
  showDate: function(e) {
    wx.setStorageSync('timeindex', e.currentTarget.dataset.key)
    this.setData({
      showDate: true,
      hide: false,
    });
  },

  //关闭弹窗
  hide: function(e) {
    this.setData({
      showDate: false,
      hideFilter: true,
      hide: true,
    });
  },



  //打开筛选条件
  showFilter: function(e) {
    this.setData({
      hideFilter: false,
      hide: false,
    });
  },

  bindPickerChange: function(e) {
    this.setData({
      Index: e.detail.value
    })
  },


  //重置筛选条件
  filterReset: function(e) {
    var filter = wx.getStorageSync('filter')
    var filterDate = wx.getStorageSync('filterDate')


    this.data.query.no = ''
    this.data.query.state = undefined
    this.data.query.goodsCode = ''
    this.data.query.billNo = ''
    this.data.query.page = 1
    this.data.query.loadCompleted = false
    this.setData({
      query: this.data.query,
      Index: '',
      filter: filter,
      filterDate: filterDate,
    });
  },


  //确认输入的筛选条件
  filterSure: function(e) {
    this.setData({
      hideFilter: true,
      hide: true,
    }, () => {
      this.search()
    });
   
  },



  //选择我的订单状态
  selectStatus: function(e) {
    var state = e.target.dataset.state;
    this.data.query.state = state
    this.data.query.page = 1
    this.data.query.loadCompleted = false
    this.setData({
      query: this.data.query,
      orders: [],
    }, () => {
      this.getOrder()
    })
  },


  //去节点状态页面
  toNode: function(e) {
    const id = e.target.dataset.id
    wx.navigateTo({
      url: '../node/node?id=' + id
    })
  },

  search:function(){
    this.data.query.page = 1
    this.data.query.loadCompleted = false
    this.setData({
      query: this.data.query,
      orders: [],
    }, () => {
      this.getOrder()
    })
  },


  lower: function (e) {
    let page = this.data.query.page
    const pageSize = this.data.query.pageSize
    const loadCompleted = this.data.query.loadCompleted
    console.log(page, pageSize)
    if (!loadCompleted) {
      wx.showLoading({
        title: '更多订单加载中...',
      })
      this.data.query.page++
      this.setData({
        query: this.data.query
      }, () => {
        this.getOrder(() => {
          wx.hideLoading()
        })
      })
    } else {
      wx.showToast({
        title: '订单已全部加载完毕',
        duration: 1000
      })
    }
  },

  getOrder: function (callback){
    wx.showLoading({
      title: '查询中..',
    })

    const partnerTypeCode = app.globalData.memberInfo.partnerTypeCode
    const api = orderInterface.get(partnerTypeCode)
    ajax.getApi(api, {
      ...this.data.query
    }, (err, res) => {
      wx.hideLoading()
      if (res && res.success) {
        if (res.data.length > 0) {
          const orders = this.data.orders
          Array.prototype.push.apply(orders, res.data);
          this.setData({
            orders
          })
        } else {
          wx.hideLoading(() => {
            wx.showToast({
              title: '订单已全部加载完毕',
              duration: 1000
            })
          })
          this.data.query.loadCompleted = true
          this.setData({
            query: this.data.query
          })
        }
      }else {
        wx.showToast({
          title: '订单获取失败',
        })
      }

      if (callback) {
        callback()
      }
    })	
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setNowDate();
    this.resetQuery()
    this.getOrder()

    //计算宽度
    var query = wx.createSelectorQuery();
    var that = this;
    query.selectAll('.order-status-items').boundingClientRect(function(rect) {
      var widthAll = 0
      for (let i = 0; i < that.data.orderStatus.length; i++) {
        widthAll += rect[i].width + 21
      }
      that.setData({
        orderWidth: widthAll + 'px'
      })
    }).exec();

    //方便重置筛选条件
    wx.setStorageSync('filter', this.data.filter)
    wx.setStorageSync('filterDate', this.data.filterDate)
  },

  resetQuery:function() {
    let cur_day = this.data.cur_day
    let cur_month = this.data.cur_month
    if (cur_day < 10) {
      cur_day = "0" + cur_day
    }
    if (cur_month < 10) {
      cur_month = "0" + cur_month
    }
    this.data.query.startDate = util.addDate(new Date(), -7)
    this.data.query.endDate = this.data.cur_year + '-' + cur_month + '-' + cur_day
    this.setData({
      query: this.data.query
    })
  },

  //选择日期
  dateSelectAction: function(e) {
    const key = wx.getStorageSync('timeindex')
    var cur_day = e.currentTarget.dataset.idx;
    var cur_date = cur_day + 1;
    var cur_month = this.data.cur_month;
    var cur_year = this.data.cur_year;
    if (cur_date < 10) {
      cur_date = "0" + cur_date
    }
    if (cur_month < 10) {
      cur_month = "0" + cur_month
    }
    this.data.query[key] = cur_year + "-" + cur_month + "-" + cur_date

    if (this.data.hideFilter == true) {
      this.setData({
        hide: true,
      })
    }

    this.setData({
      todayIndex: cur_day,
      showDate: false,
      query: this.data.query,
    })
  },

  //构造日历插件
  setNowDate: function() {
    const date = new Date();
    const cur_year = date.getFullYear();
    const cur_month = date.getMonth() + 1;
    const cur_day = date.getDate() ;
    const todayIndex = date.getDate() - 1;
    const weeks_ch = ['日', '一', '二', '三', '四', '五', '六'];
    this.calculateEmptyGrids(cur_year, cur_month);
    this.calculateDays(cur_year, cur_month);
    this.setData({
      cur_year,
      cur_month,
      cur_day,
      weeks_ch,
      todayIndex,
    })
  },
  getThisMonthDays(year, month) {
    return new Date(year, month, 0).getDate();
  },
  getFirstDayOfWeek(year, month) {
    return new Date(Date.UTC(year, month - 1, 1)).getDay();
  },
  calculateEmptyGrids(year, month) {
    const firstDayOfWeek = this.getFirstDayOfWeek(year, month);
    let empytGrids = [];
    if (firstDayOfWeek > 0) {
      for (let i = 0; i < firstDayOfWeek; i++) {
        empytGrids.push(i);
      }
      this.setData({
        hasEmptyGrid: true,
        empytGrids
      });
    } else {
      this.setData({
        hasEmptyGrid: false,
        empytGrids: []
      });
    }
  },
  calculateDays(year, month) {
    let days = [];
    const thisMonthDays = this.getThisMonthDays(year, month);
    for (let i = 1; i <= thisMonthDays; i++) {
      days.push(i);
    }
    this.setData({
      days
    });
  },
  handleCalendar(e) {
    const handle = e.currentTarget.dataset.handle;
    const cur_year = this.data.cur_year;
    const cur_month = this.data.cur_month;
    if (handle === 'prev') {
      let newMonth = cur_month - 1;
      let newYear = cur_year;
      if (newMonth < 1) {
        newYear = cur_year - 1;
        newMonth = 12;
      }
      this.calculateDays(newYear, newMonth);
      this.calculateEmptyGrids(newYear, newMonth);

      this.setData({
        cur_year: newYear,
        cur_month: newMonth
      })
    } else {
      let newMonth = cur_month + 1;
      let newYear = cur_year;
      if (newMonth > 12) {
        newYear = cur_year + 1;
        newMonth = 1;
      }
      this.calculateDays(newYear, newMonth);
      this.calculateEmptyGrids(newYear, newMonth);

      this.setData({
        cur_year: newYear,
        cur_month: newMonth
      })
    }
  },



  //页面整体滚动
  scroll: function (e) {
    let scrollTop = this.data.scrollTop
    let fixedTop = e.detail.scrollTop - wx.getStorageSync('fixedTop')
    //+ (112 / 750 * wx.getSystemInfoSync().windowWidth)

    // 是否固定住
    if (fixedTop > 0) {
      this.setData({
        fixedTop: true
      })
    } else {
      this.setData({
        fixedTop: false
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let query = wx.createSelectorQuery()
    query.select('.order-status').boundingClientRect(function (rect) {
      var fixedTop = rect.top
      wx.setStorageSync('fixedTop', fixedTop)
    }).exec()

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
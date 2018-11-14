// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    queryItems: [{
      name: "请输入订单号",
      status: false,
      val: "",
    }, {
      name: "请输入物料编号",
      status: false,
      val: "",
    }],

    queryDate: [{
      name: "请选择开始时间",
      status: false,
      val: "请选择开始时间",
    }, {
      name: "请选择结束时间",
      status: false,
      val: "请选择结束时间",
    }],


    hideFilter: true,
    hide: true,
    filter: [{
      label: "订单号",
      style: 1,
      name: "请输入订单号",
      val: "",
    }, {
      label: "订单状态",
      style: 2,
      name: "请选择订单状态",
    }, {
      label: "物流编号",
      style: 1,
      name: "请输入物料编号",
      val: "",
    }, {
      label: "发运单号",
      style: 1,
      name: "请输入发运单号",
      val: "",
    }, ],
    filterDate: [{
      label: "开始时间",
      name: "请选择开始时间",
    }, {
      label: "结束时间",
      name: "请选择结束时间",
    }],
    Index: "",


    orderStatus: [{
      name: "全部",
    }, {
      name: "生产中",
    }, {
      name: "调拨中",
    }, {
      name: "待发货",
    }, {
      name: "在途中",
    }, {
      name: "待签收",
    }, {
      name: "已签收",
    }, ],

    selectStatus: 0,
    orderWidth: "100%",

    orderTable: [{
      id: "18352790283072",
      time: "2018-01-10",
      bar: [{
        opt: "节点状态>>",
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
        opt: "节点状态>>",
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
      bar: [{
        opt: "节点状态>>",
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
    }, {
      id: "18352790283072",
      time: "2018-01-10",
      bar: [{
        opt: "节点状态>>",
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
        opt: "节点状态>>",
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
    }, ]



  },



  //输入筛选条件
  bindInput: function(e) {
    var index = e.currentTarget.dataset.index
    var queryItems = this.data.queryItems
    queryItems[index].status = true
    queryItems[index].val = e.detail.value

    this.setData({
      queryItems: queryItems,
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
    wx.setStorageSync('timeindex', e.currentTarget.dataset.index)
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

  //清除日历
  DateClear: function(e) {
    var index = e.currentTarget.dataset.index
    var queryDate = this.data.queryDate
    var queryDefault = queryDate[index].name
    queryDate[index].status = false
    queryDate[index].val = queryDefault

    this.setData({
      queryDate: queryDate
    })
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

    this.setData({
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
    });
  },



  //选择我的订单状态
  selectStatus: function(e) {
    var index = e.target.dataset.index;
    this.setData({
      selectStatus: index
    })
  },


  //去节点状态页面
  toNode: function(e) {
    wx.navigateTo({
      url: '../node/node'
    })
  },





  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setNowDate();

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

  //选择日期
  dateSelectAction: function(e) {
    var cur_day = e.currentTarget.dataset.idx;
    var cur_date = cur_day + 1;
    var cur_month = this.data.cur_month;
    var cur_year = this.data.cur_year;
    var index = wx.getStorageSync('timeindex')
    var queryDate = this.data.queryDate
    queryDate[index].status = true
    queryDate[index].val = cur_year + "-" + cur_month + "-" + cur_date

    var filterDate = this.data.filterDate
    filterDate[index].name = cur_year + "-" + cur_month + "-" + cur_date


    if (this.data.hideFilter == true) {
      this.setData({
        hide: true,
      })
    }

    this.setData({
      todayIndex: cur_day,
      showDate: false,
      queryDate: queryDate,
      filterDate: filterDate
    })
  },

  //构造日历插件
  setNowDate: function() {
    const date = new Date();
    const cur_year = date.getFullYear();
    const cur_month = date.getMonth() + 1;
    const todayIndex = date.getDate() - 1;
    const weeks_ch = ['日', '一', '二', '三', '四', '五', '六'];
    this.calculateEmptyGrids(cur_year, cur_month);
    this.calculateDays(cur_year, cur_month);
    this.setData({
      cur_year: cur_year,
      cur_month: cur_month,
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
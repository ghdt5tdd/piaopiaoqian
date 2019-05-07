// pages/contractRenew/contractRenew.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    queryItems: [{
      name: "请输入单据编号",
      status: false,
      val: "",
    }, {
      name: "请输入客户名称",
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

    hide: true,
    orderStatus: [{
      name: "到期",
    }, {
      name: "逾期",
    }, {
      name: "1个月内",
    }, {
      name: "3个月内",
    }, {
      name: "半年内",
    }, {
      name: "1年内",
    }, ],

    selectStatus: 0,
    orderWidth: "100%",

    orderTable: [{
      id: "18352790283072",
      time: "2019-04-01",
      info: [{
        label: "客户代码",
        name: "MGsy2637",
      }, {
        label: "客户卡号",
        name: "6228848372635464731",
      }, {
        label: "客户名称",
        name: "温州鑫煌物流有限公司有限公司",
        one: true
      }, {
        label: "联系人",
        name: "林元准",
      }, {
        label: "联系方式",
        name: "13858778218",
      }, ],
      tableTh: [{
        title: ""
      }, {
        title: "续费状态"
      }, {
        title: "续费金额"
      }, {
        title: "商品金额"
      }, {
        title: "合同交付时间"
      }, {
        title: "到期时间"
      }, {
        title: "剩余天数"
      }, {
        title: "序号"
      }, {
        title: "商品编码"
      }, {
        title: "商品名称"
      }, {
        title: "备注"
      }],

      tableTr: [{
        td: [{
          select: true
        }, {
          name: "执行中"
        }, {
          name: "500"
        }, {
          name: "8000"
        }, {
          name: "2019-04-01 00:00"
        }, {
          name: "2020-04-01 00:00"
        }, {
          name: "365"
        }, {
          name: "10"
        }, {
          name: "EWHTCK0283"
        }, {
          name: "SC32*50S带磁气缸"
        }, {
          name: ""
        }, ]
      }, {
        td: [{
          select: true
        }, {
          name: "执行中"
        }, {
          name: "500"
        }, {
          name: "1300"
        }, {
          name: "2019-04-01 00:00"
        }, {
          name: "2020-04-01 00:00"
        }, {
          name: "365"
        }, {
          name: "20"
        }, {
          name: "DHCHTS0201"
        }, {
          name: "8寸5合1多功能尖嘴钳"
        }, {
          name: ""
        }, ]
      }, {
        td: [{
          select: true
        }, {
          name: "即将到期"
        }, {
          name: "300"
        }, {
          name: "1800"
        }, {
          name: "2019-04-01 00:00"
        }, {
          name: "2019-06-01 00:00"
        }, {
          name: "61"
        }, {
          name: "10"
        }, {
          name: "EWHTCK0283"
        }, {
          name: "SC32*50S带磁气缸"
        }, {
          name: ""
        }, ]
      }, {
        td: [{
          select: true
        }, {
          name: "运行中"
        }, {
          name: "200"
        }, {
          name: "1700"
        }, {
          name: "2019-04-01 00:00"
        }, {
          name: "2019-08-01 00:00"
        }, {
          name: "123"
        }, {
          name: "20"
        }, {
          name: "DHCHTS0201"
        }, {
          name: "8寸5合1多功能尖嘴钳"
        }, {
          name: ""
        }, ]
      }, ],
    }, {
      id: "18352790283072",
      time: "2019-02-10",
      info: [{
        label: "客户代码",
        name: "redsunjy",
      }, {
        label: "客户卡号",
        name: "6226042635464731",
      }, {
        label: "客户名称",
        name: "温州红太阳企业管理咨询公司",
        one: true
      }, {
        label: "联系人",
        name: "陈庆武",
      }, {
        label: "联系方式",
        name: "13353338777",
      }, ],
      tableTh: [{
        title: ""
      }, {
        title: "续费状态"
      }, {
        title: "续费金额"
      }, {
        title: "商品金额"
      }, {
        title: "合同交付时间"
      }, {
        title: "到期时间"
      }, {
        title: "剩余天数"
      }, {
        title: "序号"
      }, {
        title: "商品编码"
      }, {
        title: "商品名称"
      }, {
        title: "备注"
      }],

      tableTr: [{
        td: [{
          select: true
        }, {
          name: "近期创建"
        }, {
          name: "500"
        }, {
          name: "8000"
        }, {
          name: "2019-02-10 00:00"
        }, {
          name: "2020-02-10 00:00"
        }, {
          name: "365"
        }, {
          name: "10"
        }, {
          name: "EWHTCK0283"
        }, {
          name: "SC32*50S带磁气缸"
        }, {
          name: ""
        }, ]
      }, {
        td: [{
          select: true
        }, {
          name: "执行中"
        }, {
          name: "500"
        }, {
          name: "1300"
        }, {
          name: "2019-02-01 00:00"
        }, {
          name: "2020-02-01 00:00"
        }, {
          name: "365"
        }, {
          name: "20"
        }, {
          name: "DHCHTS0201"
        }, {
          name: "8寸5合1多功能尖嘴钳"
        }, {
          name: ""
        }, ]
      }, {
        td: [{
          select: true
        }, {
          name: "紧急到期"
        }, {
          name: "300"
        }, {
          name: "1800"
        }, {
          name: "2018-04-02 00:00"
        }, {
          name: "2019-04-02 00:00"
        }, {
          name: "61"
        }, {
          name: "10"
        }, {
          name: "EWHTCK0283"
        }, {
          name: "SC32*50S带磁气缸"
        }, {
          name: ""
        }, ]
      }, {
        td: [{
          select: true
        }, {
          name: "逾期续费"
        }, {
          name: "200"
        }, {
          name: "1700"
        }, {
          name: "2019-03-01 00:00"
        }, {
          name: "2019-08-01 00:00"
        }, {
          name: "123"
        }, {
          name: "20"
        }, {
          name: "DHCHTS0201"
        }, {
          name: "8寸5合1多功能尖嘴钳"
        }, {
          name: ""
        }, ]
      }, ],
    }, ],




    renew: false
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


  //选择我的订单状态
  selectStatus: function(e) {
    var index = e.target.dataset.index;
    this.setData({
      selectStatus: index
    })
  },




  //勾选续费项
  select: function(e) {
    var index = e.currentTarget.dataset.index
    var orderTable = this.data.orderTable
    var indextr = e.currentTarget.dataset.indextr

    var select = orderTable[index].tableTr[indextr].td[0].select;
    orderTable[index].tableTr[indextr].td[0].select = !select;

    this.setData({
      orderTable: orderTable
    })
  },

  //右上角续费
  renewContract: function(e) {
    this.setData({
      renew: true
    })
  },

  //取消
  hideRenew: function(e) {
    this.setData({
      renew: false
    })
  },

  //勾选合同项，点击续费生成新的合同创建页面（合同项就是勾选的合同项,客户信息也一并进程过来）
  toAdd: function(e) {
    wx.navigateTo({
      url: '../contractAdd/contractAdd?type=' + '续费'
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

    //计算宽度
    var query = wx.createSelectorQuery();
    var that = this;
    query.select('.table').boundingClientRect(function(rect) {
      console.log(rect.width)
      that.setData({
        goodsWidth: rect.width + 'px'
      })
    }).exec();
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
    queryDate[index].val = cur_year + "-" + ((cur_month >= 10) ? cur_month : ("0" + cur_month)) + "-" + ((cur_date >= 10) ? cur_date : ("0" + cur_date))

    this.setData({
      hide: true,
      todayIndex: cur_day,
      showDate: false,
      queryDate: queryDate,
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
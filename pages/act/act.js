// pages/act/act.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    queryItems: [{
      name: "请输入汇报人",
      status: false,
      val: "",
    }, {
      name: "请选择事务类型",
      status: false,
      picker: true,
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
      name: "全部",
    }, {
      name: "上班",
    }, {
      name: "值班",
    }, {
      name: "晚上加班",
    }, {
      name: "市内外出",
    }, {
      name: "外地出差",
    }, {
      name: "拜访客户",
    }, {
      name: "节假日",
    }, ],
    Index: 0,

    abnormalItems: [{
      name: "张三",
      time: "2018-01-08",
      status: "上班",
      info: "1.维护并开发企业票票签，票票签，物流云店2.提供物流云店多会员域的处理方案3.研究新支付的文档"
    }, {
      name: "张三",
      time: "2018-01-08",
      status: "外地出差",
      info: "去杭州见客户"
    }],
  },

  //选择事务类型
  bindPickerChange: function(e) {
    var index = e.currentTarget.dataset.index
    var queryItems = this.data.queryItems
    queryItems[index].status = true

    this.setData({
      queryItems: queryItems,
      Index: e.detail.value
    })
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
      Index: 0
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


  //汇报
  addAct: function(e) {
    wx.navigateTo({
      url: '../actAdd/actAdd'
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setNowDate();
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
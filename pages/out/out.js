// pages/out/out.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    queryItems: [{
      name: "请输入报告单号",
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

    orderStatus: [{
      name: "待受理",
    }, {
      name: "待确认",
    }, {
      name: "待评价",
    }, {
      name: "已完成",
    }, ],

    selectStatus: 0,

    hide: true,
    showDate: false,

    outItems: [{
      id: "20181210124646",
      time: "2018-12-10 12:46",
      card: "1001",
      name: "张三",
      sole: "橡胶底3",
      soledrug: "894AH",
      vamp: "棉布",
      vampdrug: "894AH",
      status: "待确认"
    }, {
      id: "20181210092717",
      time: "2018-12-10 09:27",
      card: "1001",
      name: "张三",
      sole: "TPR底1",
      soledrug: "TPR处理剂",
      vamp: "棉布",
      vampdrug: "894AH",
      status: "待评价"
    }, {
      id: "20181209124646",
      time: "2018-12-09 12:46",
      card: "1001",
      name: "张三",
      sole: "橡胶底3",
      soledrug: "894AH",
      vamp: "绒面",
      vampdrug: "894AH",
      status: "待确认"
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


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setNowDate(); //日历
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
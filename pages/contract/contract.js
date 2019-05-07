// pages/contract/contract.js
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
      name: "草稿",
    }, {
      name: "提交申请",
    }, {
      name: "审批通过",
    }, {
      name: "审批退回",
    }, {
      name: "合同作废",
    }, {
      name: "合同终止",
    }, {
      name: "到期关闭",
    }, ],

    selectStatus: 0,
    orderWidth: "100%",

    orderTable: [{
      id: "18352790283072",
      time: "2019-04-01",
      info: [{
        label: "类型",
        name: "新购",
      }, {
        label: "商品总额",
        name: "12800",
      }, {
        label: "续费总额",
        name: "1500",
      }, {
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
      }, {
        label: "合同备注",
        name: "浙江全线,后续每增加一个网点，商品金额增加500",
        one: true
      }, ],
      opt: [{
        name: "删除",
        to: "delete",
        style: 1,
      }, {
        name: "拍照",
        to: "picture",
        style: 2,
      }, {
        name: "修改",
        to: "edit",
        style: 3,
      }, {
        name: "提交",
        to: "submit",
        style: 3,
      }, ],
    }, {
      id: "18352790283072",
      time: "2019-02-10",
      info: [{
        label: "类型",
        name: "续费",
      }, {
        label: "商品总额",
        name: "12800",
      }, {
        label: "续费总额",
        name: "1500",
      }, {
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
      }, {
        label: "合同备注",
        name: "",
        one: true
      }, ],
      opt: [{
        name: "删除",
        to: "delete",
        style: 1,
      }, {
        name: "作废",
        to: "abolish",
        style: 2,
      }, {
        name: "驳回",
        to: "refuse",
        style: 3,
      }, {
        name: "审核",
        to: "auditing",
        style: 3,
      }, ],

    }, {
      id: "18352790283072",
      time: "2019-01-10",
      info: [{
        label: "类型",
        name: "升级",
      }, {
        label: "商品总额",
        name: "12800",
      }, {
        label: "续费总额",
        name: "1500",
      }, {
        label: "客户代码",
        name: "junhua",
      }, {
        label: "客户卡号",
        name: "9558800200135073266",
      }, {
        label: "客户名称",
        name: "温州骏华物流有限公司",
        one: true
      }, {
        label: "联系人",
        name: "胡海滨",
      }, {
        label: "联系方式",
        name: "15867770555",
      }, {
        label: "合同备注",
        name: "身份阅读器一台",
        one: true
      }, ],
      opt: [{
        name: "删除",
        to: "delete",
        style: 1,
      }, {
        name: "作废",
        to: "abolish",
        style: 2,
      }, {
        name: "修改",
        to: "edit",
        style: 3,
      }, ],
    }]



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


  //去合同详情页面
  toInfo: function(e) {
    wx.navigateTo({
      url: '../contractInfo/contractInfo'
    })
  },

  //创建新合同
  toAdd: function(e) {
    wx.navigateTo({
      url: '../contractAdd/contractAdd'
    })
  },

  //修改合同
  edit: function(e) {
    var index = e.currentTarget.dataset.index
    var info = this.data.orderTable[index].info
    wx.navigateTo({
      url: '../contractEdit/contractEdit?id=' + this.data.orderTable[index].id + "&dateValue=" + this.data.orderTable[index].time + "&type=" + info[0].name + "&company=" + info[5].name + "&code=" + info[3].name + "&card=" + info[4].name + "&contacts=" + info[6].name + "&tel=" + info[7].name + "&goodsSum=" + info[1].name + "&renewSum=" + info[2].name + "&marks=" + info[8].name
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
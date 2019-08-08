// pages/formSheet/formSheet.js
const ajax = require('../../utils/ajax.js')
const util = require('../../utils/util.js')
const storage = require('../../utils/storage.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    curIndex: 0,
    hideShadow: true,
    hideTip: true,

    conditionStatus: false,
    dateStatus: false,
    date: '请选择月份',
    orderStatus: [{
      name: "已计费",
      value: 2
    }, {
      name: "待计费",
      value: 1
    }, ],
    selectStatus: 2,
    ul: "ul-2",
    carrier: ['请选择客户'],
    carrier_name: '',
    receiving: ['请选择收货站'],
    receiving_station: '',


    tableTh: [{
      title: "序号"
    }, {
      title: "货运单创建时间"
    }, {
      title: "货运单号"
    }, {
      title: "结算单创建时间"
    }, {
      title: "结算单号"
    }, {
      title: "客户卡号"
    }, {
      title: "客户姓名"
    }, {
      title: "发货站"
    }, {
      title: "收货站"
    }, {
      title: "货物名称"
    }, {
      title: "运单份数"
    }, {
      title: "件数"
    }, {
      title: "重量（KG）"
    }, {
      title: "立方"
    }, {
      title: "趟数"
    }, {
      title: "计费金额"
    }, {
      title: "结算金额（元）"
    }, {
      title: "结算方式"
    }, {
      title: "结算状态"
    }, {
      title: "付款方式"
    }, {
      title: "账单状态"
    },],

    //客户列表弹窗
    hideForwarder: true,

    analysisData: [],
    page: 1,
    pageSize: 20,
    loadCompleted: false,

    analysisDetailData: [],
    detailPage: 1,
    detailPageSize: 20,
    detailLoadCompleted: false,

    startDate:'',
    endDate:'',
    selectId:undefined
  },

  //选择类型
  selectType: function(e) {
    const curIndex = e.currentTarget.dataset.index
    const detailPage = this.data.detailPage
    this.setData({
      curIndex
    }, () => {
      if (curIndex === '1' && detailPage === 1) {
        this.listSettlementByFlag()
      }
    })
  },

  //详情页
  toList: function(e) {
    const id = e.currentTarget.dataset.id
    const code = e.currentTarget.dataset.code
    const month = e.currentTarget.dataset.month
    wx.navigateTo({
      url: '../formSheetlist/formSheetlist?id=' + id + '&month=' + month + '&code=' + code
    })
  },

  //操作日志
  toDaily: function(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../formSheetdaily/formSheetdaily?id=' + id
    })
  },

  //打开承运商列表
  showForwarder: function (e) {
    this.setData({
      hideShadow: false,
      hideForwarder: false,
    })
  },

  //对账确认
  toSure: function(e) {
    const index = e.currentTarget.dataset.index
    this.setData({
      selectData: this.data.analysisData[index],
      hideShadow: false,
      hideTip: false
    })
  },

  //打开日历
  showDate: function (e) {
    wx.setStorageSync('timeindex', e.currentTarget.dataset.key)
    this.setData({
      showDate: true,
      hideShadow: false,
    });
  },

  //清除日历
  DateClear: function (e) {
    var key = e.currentTarget.dataset.key
    this.setData({
      [key]: ''
    })
  },

  checkConfirm(e) {
    wx.showLoading({
      title: '稍等...',
    })
    const selectData = this.data.selectData

    ajax.postApi('app/payable/accountCheckConfirm', {
      month_id: selectData.id,
      partner_code: selectData.partner_code,
      create_user: app.globalData.memberInfo.user_account,
    }, (err, res) => {
      wx.hideLoading()
      if (res && res.success) {
        wx.showToast({
          title: '已对账',
        })
      } else {
        wx.showToast({
          title: res.text,
          duration: 1000
        })
      }
    })	

  },


  //关闭弹窗
  hide: function(e) {
    this.setData({
      hideShadow: true,
      hideTip: true
    })
  },

  //输入筛选条件
  bindInput: function(e) {
    this.setData({
      conditionStatus: true,
      val: e.detail.value
    })
  },

  search(e) {
    this.setData({
      analysisDetailData: [],
      detailPage: 1,
      detailLoadCompleted: false,
    }, () => {
      this.listSettlementByFlag()
    })
  },

  //清除输入条件
  conditionClear: function(e) {
    this.setData({
      conditionStatus: false,
      val: ''
    })
  },

  //选择收货站
  bindReceiving: function (e) {
    this.setData({
      receiving_station: e.detail.value,
      siteStatus: true,
    })
  },

  //清除收货站
  siteClear: function (e) {
    this.setData({
      receiving_station: 0,
      siteStatus: false,
    })
  },
  

  //选择客户
  bindCarrier: function (e) {
    this.setData({
      carrier_select: e.detail.value,
      carrierStatus: true,
    })
  },

  //清除客户
  carrierClear: function (e) {
    this.setData({
      carrier_select: 0,
      carrierStatus: false,
    })
  },
  

  //选择日历
  bindDateChange: function(e) {
    this.setData({
      dateStatus: true,
      date: e.detail.value
    })
  },

  //清除日历条件
  dateClear: function(e) {
    this.setData({
      dateStatus: false,
      date: '请选择月份'
    })
  },

  //选择我的订单状态
  selectStatus: function(e) {
    var index = e.target.dataset.index;
    this.setData({
      selectStatus: index,
      analysisDetailData: [],
      detailPage: 1,
      detailLoadCompleted: false,
    }, () => {
      this.listSettlementByFlag()
    })
  },

  lower: function (e) {
    let page = this.data.page
    const pageSize = this.data.pageSize
    const loadCompleted = this.data.loadCompleted
    if (!loadCompleted) {
      wx.showLoading({
        title: '加载中...',
      })
      page++
      this.setData({
        page
      }, () => {
        this.listMonthTotalSettlement()
      })
    } else {
      wx.showToast({
        title: '数据加载完毕',
        duration: 1000
      })
    }
  },

  detaillower: function (e) {
    let detailPage = this.data.detailPage
    const detailPageSize = this.data.detailPageSize
    const detailLoadCompleted = this.data.detailLoadCompleted
    if (!detailLoadCompleted) {
      wx.showLoading({
        title: '加载中...',
      })
      detailPage++
      this.setData({
        detailPage
      }, () => {
        this.listSettlementByFlag()
      })
    } else {
      wx.showToast({
        title: '数据加载完毕',
        duration: 1000
      })
    }
  },

  listSettlementByFlag() {
    wx.showLoading({
      title: '加载数据中...',
    })

    const params = {
      app_area: app.globalData.memberInfo.platform_app_area,
      currentPage: this.data.detailPage,
      pageSize: this.data.detailPageSize,
      type: 2, //这里默认应付统计
      flag: this.data.selectStatus,
      partner_code: app.globalData.memberInfo.user_account,
      start_date: this.data.startDate,
      end_date: this.data.endDate,
    }
    if (this.data.carrier_name !== '请选择承运商') {
      params.consignee_name = this.data.carrier_name
    }

    if (this.data.receiving_station !== '请选择收货站') {
      params.receiving_station = this.data.receiving_station
    }

    ajax.getApi('app/payable/listSettlementByFlag', params, (err, res) => {
      wx.hideLoading()
      if (res && res.success) {
        if (res.data.length > 0) {
          const analysisDetailData = this.data.analysisDetailData
          const carrier = this.data.carrier
          const receiving = this.data.receiving
          for (const an of res.data) {
            if (carrier.indexOf(an.consignee_name) === -1) {
              carrier.push(an.consignee_name)
            }
          }
          for (const an of res.data) {
            if (receiving.indexOf(an.receiving_station_name) === -1) {
              receiving.push(an.receiving_station_name)
            }
          }
          Array.prototype.push.apply(analysisDetailData, res.data);
          this.setData({
            analysisDetailData,
            carrier,
            receiving
          })
        } else {
          wx.hideLoading(() => {
            wx.showToast({
              title: '已全部加载',
              duration: 1000
            })
          })
          this.setData({
            loadCompleted: true
          })
        }
      }
    })
  },

  listMonthTotalSettlement() {
    wx.showLoading({
      title: '加载数据中...',
    })
    ajax.getApi('app/payable/listMonthTotalSettlement', {
      app_area: app.globalData.memberInfo.platform_app_area,
      currentPage: this.data.page,
      pageSize: this.data.pageSize,
      type: 2, //这里默认应付统计
      partner_code: app.globalData.memberInfo.user_account,
    }, (err, res) => {
      wx.hideLoading()
      if (res && res.success) {
        if (res.data.length > 0) {
          const analysisData = this.data.analysisData
          Array.prototype.push.apply(analysisData, res.data);
          this.setData({
            analysisData
          })
        } else {
          wx.hideLoading(() => {
            wx.showToast({
              title: '已全部加载',
              duration: 1000
            })
          })
          this.setData({
            loadCompleted: true
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.listMonthTotalSettlement()
    this.setNowDate();
  },

  //选择日期
  dateSelectAction: function (e) {
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

    this.setData({
      todayIndex: cur_day,
      hide: true,
      hideShadow: true,
      showDate: false,
      [key]: cur_year + "-" + cur_month + "-" + cur_date,
    })
  },

  //构造日历插件
  setNowDate: function () {
    const date = new Date();
    const cur_year = date.getFullYear();
    const cur_month = date.getMonth() + 1;
    const cur_day = date.getDate();
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
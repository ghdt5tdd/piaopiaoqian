// pages/dispatch/dispatch.js
const ajax = require('../../utils/ajax.js')
const util = require('../../utils/util.js')
const storage = require('../../utils/storage.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookingOrder: undefined,
    sendDriver: undefined,
    sendCar: undefined,
    remark:'',
    hideShadow: true,
    hideTime: true,
    sendTime: "",
    //预约时间
    calendar: [],
    width: 0,
    currentIndex: 0,
    currentTime: -1,
    timeArr: [{
      "timeBegin": "09:00",
      "timeEnd": "11:00",
      "overtime": false, //未超时可预约
    }, {
      "timeBegin": "11:00",
      "timeEnd": "13:00",
      "overtime": false,
    }, {
      "timeBegin": "13:00",
      "timeEnd": "15:00",
      "overtime": false,
    }, {
      "timeBegin": "15:00",
      "timeEnd": "17:00",
      "overtime": false,
    }, {
      "timeBegin": "17:00",
      "timeEnd": "19:00",
      "overtime": false,
    }, {
      "timeBegin": "19:00",
      "timeEnd": "21:00",
      "overtime": false,
    }, ],
  },

  bindinput: function (e) {
    const key = e.currentTarget.dataset.key
    this.setData({
      [key]: e.detail.value
    })
  },

  //跳转到司机
  toDriver: function(e) {
    wx.navigateTo({
      url: '../driver/driver'
    })
  },

  getDateStr(addDay) {
    var result_date = new Date();
    result_date.setDate(result_date.getDate() + addDay);//获取AddDayCount天后的日期
    var year = result_date.getFullYear();
    var month = result_date.getMonth() + 1;//获取当前月份的日期
    if (month < 10) {
      month = "0" + month
    }
    if (month > 11) {
      month = "0" + (month - 11)
    }
    var day = result_date.getDate();
    if (day < 10) {
      day = "0" + day
    }
    return year + "-" + month + "-" + day
  },

  getDateWeekStr(dateStr) {
    const weeks_ch = ['日', '一', '二', '三', '四', '五', '六']
    const date = new Date(dateStr)
    const now_date = new Date()
    const week_index = date.getDay()
    const week_str = weeks_ch[week_index]

    var timesDiff = Math.abs(date.getTime() - now_date.getTime());
    var diffDays = Math.round(timesDiff / (1000 * 60 * 60 * 24));
    console.log(timesDiff)
    console.log(diffDays)

    if (diffDays == 0) {
      return "今天"
    } else if (diffDays == 1) {
      return "明天"
    }

    return '星期' + week_str
  },


  //预约时间
  showTime: function (e) {
    const calendar = this.data.calendar
    const today = this.getDateStr(0)
    const tomorrow = this.getDateStr(1)
    const after_tomorrow = this.getDateStr(2)

    calendar[0] = {
      date: today,
      week: this.getDateWeekStr(today)
    }
    calendar[1] = {
      date: tomorrow,
      week: this.getDateWeekStr(tomorrow)
    }
    calendar[2] = {
      date: after_tomorrow,
      week: this.getDateWeekStr(after_tomorrow)
    }

    this.setData({
      hideShadow: false,
      hideTime: false,
      markFcous: true,
      calendar
    })
    this.statusTime()
  },

  //超过时间变灰,除了今天都不会超时
  statusTime() {
    const date = new Date();
    const cur_hour = date.getHours() + ":" + date.getMinutes();
    let timeArr = this.data.timeArr
    for (var i = 0; i < timeArr.length; i++) {
      if (this.data.currentIndex == 0) {
        if (cur_hour > timeArr[i].timeBegin) {
          timeArr[i].overtime = true
        }
      } else {
        timeArr[i].overtime = false
      }
    }
    this.setData({
      timeArr: timeArr
    })
  },


  //选择日期点击事件
  select: function(e) {
    this.setData({
      currentIndex: e.currentTarget.dataset.index
    })
    this.statusTime()
  },

  //选择时间点击事件
  selectTime: function(e) {
    let timeArr = this.data.timeArr
    let index = e.currentTarget.dataset.tindex
    if (timeArr[index].overtime == false) {
      this.setData({
        currentTime: e.currentTarget.dataset.tindex
      })
    } else {
      return false
    }
  },

  //选择预约日期时间
  chooseTime: function(e) {
    var chooseDate = this.data.currentIndex
    var chooseTime = this.data.currentTime
    if (chooseTime == -1) {
      wx.showToast({
        title: '请选择配送时间~',
        icon: 'none',
        duration: 2000,
      })
    } else {
      var chooseSendDate = this.data.calendar[chooseDate].date
      var chooseSendTime = this.data.timeArr[chooseTime].timeBegin + "-" + this.data.timeArr[chooseTime].timeEnd
      this.setData({
        sendDate: chooseSendDate,
        sendTime: chooseSendTime,
        hideShadow: true,
        hideTime: true,
      })
    }

  },


  //关闭配送时间弹窗
  hideTime: function(e) {
    this.setData({
      hideShadow: true,
      hideTime: true,
    })
  },

  dispatch() {
    const id = this.data.bookingOrder.id
    const driver_id = this.data.sendDriver.id
    const remark = this.data.remark

    wx.showLoading({
      title: '请稍等...',
      mask: true
    })
    ajax.postApi('app/order/carrierAssignDriverBookingOrderCommand', {
      id,
      driver_id,
      // vehicle_number,
      remark
    }, (err, res) => {
      wx.hideLoading()
      if (res && res.success) {
        wx.showToast({
          title: '指派成功!',
          success () {
            wx.navigateBack({
              delta: 1
            })
          },
        })
      } else {
        wx.showToast({
          title: res.text,
          duration: 1000
        })
      }
    })	
  },

  getBookingOrderById(id) {
    wx.showLoading({
      title: '加载中...',
    })

    ajax.getApi('app/order/getBookingOrderById', {
      id
    }, (err, res) => {
      wx.hideLoading()
      if (res && res.success) {
        const bookingOrder = res.data
        const add_services = bookingOrder.add_services
        if (add_services) {
          bookingOrder.add_services = JSON.parse(add_services)
        }
        this.setData({
          bookingOrder
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const id = options.id
    this.getBookingOrderById(id)
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
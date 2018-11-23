// pages/report/report.js
const ajax = require('../../utils/ajax.js')
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    comment: "请填写异常内容",
    location: "点击定位",
    locationtype: 0,
    imgs: [],
    abnormalType: [], 
    indexType: 0,
    abnormalNode: [],
    indexNode: 0,
    abnormalDate: "",
    hide: true,
    showDate: false,
    abnormalName: "",
    abnormalTel: "",
    abnormalContent: "",
  },


  inputAbnormalName: function (e) {
    this.setData({
      abnormalName: e.detail.value
    })
  },

  inputContent: function (e) {
    this.setData({
      abnormalContent: e.detail.value
    })
  },

  inputAbnormalTel: function (e) {
    this.setData({
      abnormalTel: e.detail.value
    })
  },

  //异常类型
  bindTypeChange: function(e) {
    this.setData({
      indexType: e.detail.value
    })
  },

  //发生环节
  bindNodeChange: function(e) {
    this.setData({
      indexNode: e.detail.value
    })
  },

  //时间弹窗
  showDate: function(e) {
    this.setData({
      showDate: true,
      hide: false,
    });
  },

  hide: function(e) {
    this.setData({
      showDate: false,
      hide: true,
    });
  },





  //上传图片
  changePic: function (e) {
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: res => {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        res.tempFilePaths.forEach(v => {
          util.ImgPathToBase64(v, base64 => {
            const imgs = this.data.imgs
            const img = 'data:image/png;base64,' + base64
            imgs.push(img)
            this.setData({
              imgs
            })
          })
        })
      }
    })

  },

  // 删除图片
  deleteImg: function(e) {
    var imgs = this.data.imgs;
    var index = e.currentTarget.dataset.index;
    imgs.splice(index, 1);
    this.setData({
      imgs: imgs,
    });
  },

  //定位地址
  location: function(e) {
    wx.navigateTo({
      url: '../mapLocation/mapLocation'
    })
  },

  reportException: function() {
    wx.showLoading({
      title: '提交中...',
    })
    const type = this.data.abnormalType[this.data.indexType].itemKey
    const link = this.data.abnormalNode[this.data.indexNode].itemKey
    const contact_man = this.data.abnormalName
    const contact_way = this.data.abnormalTel
    const report_content = this.data.abnormalContent
    const pictures = JSON.stringify(this.data.imgs)
    const address = this.data.location
    const location_type = this.data.locationtype
    const location = this.data.locationIndex
    const happen_date = this.data.abnormalDate

    ajax.postApi('app/order/reportException', {
      type, link, contact_man, contact_way, report_content,
      pictures, address, location, location_type, happen_date
    }, (err, res) => {
      wx.hideLoading()
      if (res && res.success) {
        wx.showToast({
          title: '提交成功',
          duration: 1000
        })
        wx.navigateBack({
          delta: 1
        })
      }else {
        wx.showToast({
          title: '提交失败:' + res.text,
          duration: 1000
        })
      }
    })	
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setNowDate();
    this.getExceptionType()
    this.getExceptionLink()
  },

  getExceptionType:function() {
    ajax.getApi('app/order/getExceptionType', {

    }, (err, res) => {
      if (res && res.success) {
        console.log(res.data)
        this.setData({
          abnormalType: res.data
        })
      }
    })	
  },

  getExceptionLink:function() {
    ajax.getApi('app/order/getExceptionLink', {

    }, (err, res) => {
      if (res && res.success) {
        this.setData({
          abnormalNode: res.data
        })
      }
    })
  },



  //选择日期
  dateSelectAction: function(e) {
    var cur_day = e.currentTarget.dataset.idx;
    var cur_date = cur_day + 1;
    var cur_month = this.data.cur_month;
    var cur_year = this.data.cur_year;

    var abnormalDate = cur_year + "-" + cur_month + "-" + cur_date

    this.setData({
      todayIndex: cur_day,
      hide: true,
      showDate: false,
      abnormalDate: abnormalDate,
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
      abnormalDate: cur_year + '-' + cur_month + '-' + (todayIndex + 1)
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
    //接收从定位页面或者搜索定位页面传递的参数
    var that = this
    let pages = getCurrentPages();
    let currPage = pages[pages.length - 1];
    var sign = currPage.data.sign
    if (sign == '1') {
      that.setData({ //将携带的参数赋值
        locationtype: sign,
        region: [currPage.data.province, currPage.data.city, currPage.data.district],
        location: currPage.data.province + currPage.data.city + currPage.data.district + currPage.data.door,
      });

    }
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
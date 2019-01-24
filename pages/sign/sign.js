// pages/sign/sign.js
const ajax = require('../../utils/ajax.js')
const util = require('../../utils/util.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    x:undefined,
    y:undefined,
    memberInfo:null,
    selectOrder:null,
    getlocation: true,
    query: {
      orderNo: '',
      state: 0,
      startDate: '',
      endDate: '',
      consigneeCode: '',
      page: 1,
      pageSize: 10,
      loadCompleted: false
    },

    hideFilter: true,
    hide: true,
    filter: [],
    selectIndex:0,
    now: null,
    
    orderStatus: [{
      name: "全部",
      value: -1
    }, {
      name: "待签收",
      value: 0
    }, {
      name: "已签收",
      value: 1
    }, ],
    selectStatus: 0,
    ul: "ul-3",
    orders: [],
    hideSign: true,
    hideComment: true,
    timelyArray:[{
      text:"及时",
      img: "../../images/check.png",
      value: 1
    }, {
      text: "不及时",
      img: "../../images/uncheck.png",
      value: 0
    }],
    timelyIndex:0,
    latitude: undefined,
    longitude: undefined,
    operator:undefined,
    signNow: undefined,
    actualNumber:undefined,
    actualDate:undefined,
    actualTime:undefined,
    timeliness:undefined,
  },

  //异常类型
  bindTimelyChange: function (e) {
    this.setData({
      timelyIndex: e.detail.value,
      timeliness: this.data.timelyArray[e.detail.value].value
    })
  },

  //异常类型
  bindTimeChange: function (e) {
    this.setData({
      actualTime: e.detail.value,
    })
  },

  selectRadio:function(e) {
    if (e.currentTarget.dataset.index === 0) {
      const actualDate = this.data.selectOrder.estimated_arrive_date.substring(0, 10)
      const actualTime = this.data.selectOrder.estimated_arrive_date.substring(11)
      this.setData({
        actualDate,
        actualTime,
      })
    }
    this.setData({
      timely: e.currentTarget.dataset.index === 0 ? true : false,
      timelyIndex: e.currentTarget.dataset.index,
      timeliness: this.data.timelyArray[e.currentTarget.dataset.index].value
    })

  },

  signOrder:function() {
    const idList = this.data.selectOrder.id
    const latitude = this.data.latitude
    const longitude = this.data.longitude
    const actualDate = this.data.actualDate
    const actual_arrive_date = this.data.actualDate + ' ' + this.data.actualTime
    const estimated_arrive_date = this.data.selectOrder.estimated_arrive_date
    const now = this.data.now
    const timely = this.data.timely

    if (util.compareDate(actual_arrive_date, now) > 0) {
      wx.showModal({
        title: '日期错误',
        content: '实际到货时间不得大于目前时间',
      })
      return ;
    }

    if (!timely && util.compareDate(estimated_arrive_date, actual_arrive_date) >= 0) {
      wx.showModal({
        title: '日期错误',
        content: '不及时的情况下实际到货时间不能小于等于预计到货时间',
      })
      return;
    }

    if (this.data.getlocation) {
      wx.showLoading({
        title: '正在签收中...',
      })
      ajax.postApi('app/order/receiptShopOrder', {
        idList,
        location: longitude + ',' + latitude,
        actual_arrive_date: this.data.actualDate + ' ' + this.data.actualTime,
        sign_date: this.data.now,
        quantity: this.data.actualNumber,
        timeliness: this.data.timeliness,
      }, (err, res) => {
        wx.hideLoading()
        if (res && res.success) {
          wx.showToast({
            title: '签收成功',
          })
          this.data.orders.splice(this.data.selectIndex, 1)
          this.setData({
            orders: this.data.orders,
            hide: true,
            hideSign: true,
          })
        } else {
          wx.showToast({
            title: res.text,
            duration: 1000
          })
        }
      })

    } else {
      wx.showToast({
        title: '坐标获取异常',
      })
    }
  },

  commitComment: function () {
    const id = this.data.selectOrder.id
    const comment_star = this.data.starSelect
    const comment = this.data.comment
    const imgs = JSON.stringify(this.data.imgs)

    if (comment === '') {}
    wx.showLoading({
      title: '评价提交中...',
    })
    ajax.postApi('app/order/evaluateShopOrder', {
      id,
      comment_content: comment,
      comment_star,
      imgs
    }, (err, res) => {
      wx.hideLoading()
      if (res && res.success) {
        wx.showToast({
          title: '提交成功',
        })
        this.data.orders.splice(this.data.selectIndex, 1)
        this.setData({
          orders: this.data.orders,
          hide: true,
          hideComment: true,
        })
      } else {
        wx.showToast({
          title: res.text,
          duration: 1000
        })
      }
    })	
  },

  search: function () {
    this.data.query.page = 1
    this.data.query.loadCompleted = false
    this.setData({
      query: this.data.query,
      orders: [],
    }, () => {
      this.getOrder()
    })
  },

  //输入筛选条件
  bindInput: function (e) {
    const key = e.currentTarget.dataset.key
    this.data.query[key] = e.detail.value

    this.setData({
      query: this.data.query,
    })
  },

  //输入筛选条件
  bindActualNumberInput: function (e) {
    this.setData({
      actualNumber: e.detail.value
    })
  },
  //输入筛选条件
  bindOperatorInput: function (e) {
    this.setData({
      operator: e.detail.value
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
  showDate: function (e) {
    if(this.data.timely) {
      return;
    }
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
      hideSign: true,
      hideComment: true,
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
  selectStatus: function (e) {
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

  //跳转到货运单详情页面
  toInfo: function (e) {
    wx.navigateTo({
      url: '../transportdetail/transportdetail?id=' + e.currentTarget.dataset.shoporderId
    })
  },

  //打开签收弹窗
  showSign: function(e) {
    const index = e.currentTarget.dataset.index
    
    this.setData({
      hide: false,
      hideSign: false,
      selectOrder: this.data.orders[index],
      selectIndex: index,
      now: util.getFormatDate(1)
    }, () => {
      const isTimely = util.compareDate(this.data.selectOrder.estimated_arrive_date, this.data.now)
      console.log(this.data.selectOrder.estimated_arrive_date)
      console.log(this.data.now)
      console.log(isTimely)
      this.setData({
        actualNumber: this.data.selectOrder.total_packing_quantity,
        actualDate: this.data.now.substring(0, 10),
        actualTime: this.data.now.substring(11, 16),
        timely: isTimely >= 0,
        isHideTimeLy: isTimely >= 0,
        timeliness: isTimely >= 0 ? 1 : 0,
        timelyIndex: isTimely >= 0 ? 0 : 1,
      })
    })
  },

  //关闭签收页面
  hideSign: function(e) {
    this.setData({
      hide: true,
      hideSign: true,
    })
  },




  //打开评价弹窗
  showComment: function(e) {
    const index = e.currentTarget.dataset.index
    this.setData({
      hide: false,
      hideComment: false,
      selectIndex: index,
      selectOrder: this.data.orders[index],
      //评价星级
      commentStar: [{
          pic: '../../images/eva-on.png',
          index: '0',
          checked: false
        },
        {
          pic: '../../images/eva-on.png',
          index: '1',
          checked: false
        },
        {
          pic: '../../images/eva-on.png',
          index: '2',
          checked: false
        },
        {
          pic: '../../images/eva-on.png',
          index: '3',
          checked: false
        },
        {
          pic: '../../images/eva-on.png',
          index: '4',
          checked: true
        },
      ],

      commentRank: "非常好",
      comment: "",
      imgs: [],
      starSelect: 5,

    })
  },

  inputComment:function(e){
    const comment = e.detail.value
    this.setData({
      comment
    })
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

  //评价星级选择
  changeEva: function(e) {
    var commentStar = this.data.commentStar;
    var checkIndex = e.currentTarget.dataset.index

    for (var i = 0; i < commentStar.length; i++) {
      if (i <= checkIndex) {
        commentStar[i].pic = "../../images/eva-on.png"
      } else {
        commentStar[i].pic = "../../images/eva-e.png"
      }
    }
    this.setData({
      commentStar: commentStar,
      starSelect: checkIndex + 1,
    });


    if (checkIndex == 4) {
      this.setData({
        commentRank: "非常好",
      });
    } else if (checkIndex == 3) {
      this.setData({
        commentRank: "较好",
      });
    } else if (checkIndex == 2) {
      this.setData({
        commentRank: "一般",
      });
    } else {
      this.setData({
        commentRank: "差",
      });
    }

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



  //关闭评价页面
  hideComment: function(e) {
    this.setData({
      hide: true,
      hideComment: true,
    })
  },

  lower: function (e) {
    let page = this.data.query.page
    const pageSize = this.data.query.pageSize
    const loadCompleted = this.data.query.loadCompleted
    console.log(page, pageSize)
    if (!loadCompleted) {
      wx.showLoading({
        title: '更多运单加载中...',
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
        title: '运单已全部加载完毕',
        duration: 1000
      })
    }
  },

  getOrder: function (callback) {
    wx.showLoading({
      title: '查询中..',
    })

    ajax.getApi('app/order/getShopOrderList', {
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
              title: '运单已全部加载完毕',
              duration: 1000
            })
          })
          this.data.query.loadCompleted = true
          this.setData({
            query: this.data.query
          })
        }
      } else {
        wx.showToast({
          title: '运单获取失败',
        })
      }

      if (callback) {
        callback()
      }
    })
  },

  showScan: function () {
    wx.scanCode({
      success: (res) => {
        const api = res.result
        const x = this.data.longitude
        const y = this.data.latitude
        if (api && api.indexOf('ppq') !== -1) {
          const id = util.getQueryString(api, 'id')
          const ac = util.getQueryString(api, 'ac')

          let 
            successText,
            loadingText
          if (ac) {
            switch (ac) {
              case 'qs':
                successText = '签收成功'
                loadingText = '正在签收运单...'
                break;
              case 'jj':
                successText = '交接成功'
                loadingText = '正在交接运单...'
                break;
              default:
                wx.showLoading({
                  title: 'ac_error',
                })
                return;
            }
          } else {
            successText = '处理成功'
            loadingText = '正在处理运单...'
          }
          wx.showLoading({
            title: loadingText,
          })
          ajax.postApi('app/order/scanReceiptAndTransferShopOrder', {
            id,
            x,
            y,
            type: 0
          }, (err, res) => {
            wx.hideLoading()
            if (res && res.success) {
              wx.showToast({
                title: successText,
              })
              this.data.query.page = 1
              this.data.query.loadCompleted = false
              this.setData({
                query: this.data.query,
                orders: [],
              }, () => {
                this.getOrder()
              })
            } else {
              wx.showToast({
                title: res.text || '访问失败',
                duration: 1000
              })
            }
          })
        } else {
          wx.showToast({
            title: '错误的二维码内容',
          })
        }

      },
      fail: function (res) {
        wx.showToast({
          title: '扫码失败',
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setNowDate()
    this.resetQuery()
    this.getOrder()
    this.getLocation()
    this.setData({
      memberInfo: app.globalData.memberInfo
    })

  },
  getLocation:function(){
    let latitude = this.data.latitude
    let longitude = this.data.longitude
    if (!latitude) {
      wx.getLocation({
        type: 'wgs84',//默认为 wgs84 返回 gps 坐标，gcj02 返回可用于wx.openLocation的坐标
        success: res => {
          console.log(res)
          latitude = res.latitude
          longitude = res.longitude
          this.setData({
            latitude,
            longitude
          })
        },
        fail: res => {
          this.setData({
            getlocation: false
          })
          wx.showModal({
            title: '坐标异常',
            content: '获取用户当前坐标失败,无法进行签收',
          })
        }
      })
    }
  },


  resetQuery: function () {
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
    if (key === 'startDate' || key === 'endDate') {
      this.data.query[key] = cur_year + "-" + cur_month + "-" + cur_date

      this.setData({
        todayIndex: cur_day,
        showDate: false,
        query: this.data.query,
      })
    }else {
      this.data[key] = cur_year + "-" + cur_month + "-" + cur_date
      this.setData({
        todayIndex: cur_day,
        showDate: false,
        [key]: this.data[key] 
      })
      
    }

    if (this.data.hideFilter == true) {
      this.setData({
        hide: true,
      })
    }

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
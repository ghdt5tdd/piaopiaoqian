// pages/contractAdd/contractAdd.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: "新购",
    imgs: [],
    hide: true,
    hideContract: true,
    tableTh: [{
      title: ""
    }, {
      title: "序号"
    }, {
      title: "商品编码"
    }, {
      title: "商品名称"
    }, {
      title: "合同交付时间"
    }, {
      title: "到期时间"
    }, {
      title: "是否续费项"
    }, {
      title: "续费金额"
    }, {
      title: "商品金额"
    }, {
      title: "备注"
    }],

    tableTr: [{
      td: [{
        select: true
      }, {
        name: "10"
      }, {
        name: "EWHTCK0283"
      }, {
        name: "SC32*50S带磁气缸"
      }, {
        name: "2019-04-01 00:00"
      }, {
        name: "2020-04-01 00:00"
      }, {
        name: "是"
      }, {
        name: "500"
      }, {
        name: "800"
      }, {
        name: ""
      }, ]
    }, {
      td: [{
        select: true
      }, {
        name: "20"
      }, {
        name: "DHCHTS0201"
      }, {
        name: "8寸5合1多功能尖嘴钳"
      }, {
        name: "2019-04-01 00:00"
      }, {
        name: "2020-04-01 00:00"
      }, {
        name: "是"
      }, {
        name: "1000"
      }, {
        name: "12000"
      }, {
        name: ""
      }, ]
    }, {
      td: [{
        select: true
      }, {
        name: "10"
      }, {
        name: "EWHTCK0283"
      }, {
        name: "SC32*50S带磁气缸"
      }, {
        name: "2019-04-01 00:00"
      }, {
        name: "2020-04-01 00:00"
      }, {
        name: "是"
      }, {
        name: "500"
      }, {
        name: "800"
      }, {
        name: ""
      }, ]
    }, {
      td: [{
        select: true
      }, {
        name: "20"
      }, {
        name: "DHCHTS0201"
      }, {
        name: "8寸5合1多功能尖嘴钳"
      }, {
        name: "2019-04-01 00:00"
      }, {
        name: "2020-04-01 00:00"
      }, {
        name: "是"
      }, {
        name: "1000"
      }, {
        name: "12000"
      }, {
        name: ""
      }, ]
    }, {
      td: [{
        select: true
      }, {
        name: "10"
      }, {
        name: "EWHTCK0283"
      }, {
        name: "SC32*50S带磁气缸"
      }, {
        name: "2019-04-01 00:00"
      }, {
        name: "2020-04-01 00:00"
      }, {
        name: "是"
      }, {
        name: "500"
      }, {
        name: "800"
      }, {
        name: ""
      }, ]
    }, {
      td: [{
        select: true
      }, {
        name: "20"
      }, {
        name: "DHCHTS0201"
      }, {
        name: "8寸5合1多功能尖嘴钳"
      }, {
        name: "2019-04-01 00:00"
      }, {
        name: "2020-04-01 00:00"
      }, {
        name: "是"
      }, {
        name: "1000"
      }, {
        name: "12000"
      }, {
        name: ""
      }, ]
    }, ],

    editContract: true,

  },



  //打开日历
  showDate: function(e) {
    wx.setStorageSync('timetype', e.currentTarget.dataset.name)
    this.setData({
      showDate: true,
      hide: false,
    });
  },

  //关闭弹窗
  hide: function(e) {
    this.setData({
      showDate: false,
      hideContract: true,
      editContract: true,
      hide: true,
    });
  },


  //选择联系人
  toClient: function(e) {
    wx.navigateTo({
      url: '../client/client'
    })
  },


  //上传图片
  changePic: function(e) {
    var that = this // 不能直接用this，留坑
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        var imgs = that.data.imgs;
        for (var i = 0; i < tempFilePaths.length; i++) {
          if (imgs.length >= 4) {
            that.setData({
              imgs: imgs
            });
            return false;
          } else {
            imgs.push(tempFilePaths[i]);
          }
        }
        that.setData({
          imgs: imgs,
        });
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


  //选择移除合同项
  remove: function(e) {
    var index = e.currentTarget.dataset.index
    var tableTr = this.data.tableTr

    var select = tableTr[index].td[0].select;
    tableTr[index].td[0].select = !select;

    this.setData({
      tableTr: tableTr
    })
  },


  //移除合同项
  clearContract: function(e) {
    var tableTr = this.data.tableTr
    for (let i = tableTr.length - 1; i >= 0; i--) {
      if (tableTr[i].td[0].select == false) {
        tableTr.splice(i, 1)
      }
    }

    this.setData({
      tableTr: tableTr
    })
  },

  //添加合同项
  addContract: function(e) {
    this.setData({
      hide: false,
      hideContract: false
    })
  },


  //扫描商品编码
  scanCode() {
    wx.scanCode({
      success(res) {
        console.log(res.result)
      }
    })
  },

  //商品选择
  toGoods: function(e) {
    wx.navigateTo({
      url: '../contractGoods/contractGoods'
    })
  },





  //编辑合同项
  openContract: function(e) {
    this.setData({
      hide: false,
      editContract: false,
      //合同项信息目前是假数据，怎么取过来交给后台了
      goodSerialedit: "10",
      goodIdedit: "EWHTCK0283",
      goodNameedit: "SC32*50S带磁气缸",
      dateStartedit: "2019-04-01",
      dateEndedit: "2020-04-01",
      goodNumedit: "800",
      renewNumedit: "500",
      goodMarkedit: "",
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
    query.select('.table').boundingClientRect(function(rect) {
      console.log(rect.width)
      that.setData({
        goodsWidth: rect.width + 'px'
      })
    }).exec();

    if (options.type != undefined) {
      this.setData({
        type: options.type
      })
    }

  },

  //选择日期
  dateSelectAction: function(e) {
    var cur_day = e.currentTarget.dataset.idx;
    var cur_date = cur_day + 1;
    var cur_month = this.data.cur_month;
    var cur_year = this.data.cur_year;

    var type = wx.getStorageSync('timetype')
    var dateValue = cur_year + "-" + ((cur_month >= 10) ? cur_month : ("0" + cur_month)) + "-" + ((cur_date >= 10) ? cur_date : ("0" + cur_date))





    if (type == "submit") {
      this.setData({
        dateValue: dateValue,
        hide: true,
      })
    } else if (type == "start") {
      this.setData({
        dateStart: dateValue,
      })
    } else if (type == "end") {
      this.setData({
        dateEnd: dateValue,
      })
    } else if (type == "startedit") {
      this.setData({
        dateStartedit: dateValue,
      })
    } else if (type == "endedit") {
      this.setData({
        dateEndedit: dateValue,
      })
    }


    this.setData({
      todayIndex: cur_day,
      showDate: false,
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
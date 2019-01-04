// pages/send/send.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    WSend: false, //这里表示有设为默认的寄件地址
    WReceive: true,

    sendName: "黄晓克", //设为默认的寄件地址信息
    sendTel: "13355888988",
    sendLocation: "浙江省温州市鹿城区黎明工业区36号楼505室",

    WCargo: true,
    WService: true,

    sendTime: "请选择提货时间（选填）",
    ruleStatus: false,
    ruleIcon: "../../images/uncheck.png",

    sendForwarder: "请选择承运商",


    hideShadow: true,
    hideTime: true,

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

    markFcous: false,

    hideRule: true,
    Rule: [{
      info: "您好！感谢您选择XXXX运输有限公司（以下简称我公司）。",
      indent: true,
    }, {
      info: "请您在托运货物前仔细阅读本服务条款，您阅读并确认后，说明：您同意遵守我公司公示的隐私政策及不定期修订的相关内容，并同意我公司按照法律法规和隐私政策处理您提供的运单信息，且愿意遵守或协同遵循一下条款的服务约定。",
      indent: true,
    }, {
      info: "1 共同遵守国家“实名制寄件制度"
    }, {
      info: "1.1根据《中华人民共和国反恐怖主义法》、《关于加强物流安全管理工作的若干意见》、《汽车货物运输规则》等法规要求，我公司采用“实名寄件”的形式受理您的托运需求，您必须有效配合。"
    }, {
      info: "1.2为保证托运货物安全送达，您必须如实提供您（发货人）的个人信息（包括身份信息和通信联络信息）及“收货人”的地址信息和联系电话等资料，以供登记和查验。"
    }, {
      info: "1.3您必须如实申报需要托运的货物的“名称”和货物的“性质”，并准确录入开票系统。"
    }, {
      info: "2 关于货物检视与禁运货物的申明"
    }, {
      info: "2.1为共同遵循《中华人民共和国反恐怖主义法》、《关于加强物流安全管理工作的若干意见》、《汽车货物运输规则》等禁止运输货物法律法规的规定，我公司有权依法对您托运的货物进行“检视”。"
    }, {
      info: "2.2禁止运输和限制运输的货物包括但不限于：易燃易爆、枪支弹药、民爆产品；有毒有害、放射源、危及人身健康、破坏生态环境的物品；宣传宗教极端思想、宣扬民族分裂思想、反党反社会主义言论等极端思想的宣传品等。"
    }, {
      info: "3 托运货物的保价与赔偿"
    }, {
      info: "3.1我公司建议，您在托运货物时如实按所托运的货物实际价值选择保价；在托运过程中发生的损失理赔时，按照我公司要求提供相关价值证明材料（如果您是代表单位、企业的，所提供的证明材料须加盖对应单位的公章）。"
    }, {
      info: "3.2如您未选择保价运输，当托运货物出现理赔情况时，我公司按“普通货物”的理赔标准进行处理，最高按当期票损失货物平均运价的五倍进行赔偿，货物实际价值小于“货物平均运价五倍”的，按实际价值进行赔偿。"
    }, {
      info: "3.3如您已经选择了保价运输，当托运货物出现理赔情况时，我公司按“保价货物”的理赔标准进行处置，实际价值大于或等于声明价值时，所托货物全部毁损或灭失，我公司按照保价声明价值予以赔偿；如所托货物部分损毁或内件短少，则按照声明价值和损失比例赔偿。实际价值小于声明价值时，所托货物全部毁损或灭失，按照实际价值赔偿；所托货物部分损毁或内件短少时，则按照实际损失赔偿。"
    }],


    hideTip: true, //下单成功提示
    orderId: '',


  },



  //寄件地址选择
  toSend: function(e) {
    wx.navigateTo({
      url: '../addSend/addSend'
    })
  },



  //收件地址选择
  toReceive: function(e) {
    wx.navigateTo({
      url: '../addReceive/addReceive'
    })
  },

  //货物信息
  toCargo: function(e) {
    wx.navigateTo({
      url: '../cargo/cargo'
    })
  },

  //增值服务
  toService: function(e) {
    wx.navigateTo({
      url: '../service/service'
    })
  },


  //承运商选择
  toforwarder: function (e) {
    wx.navigateTo({
      url: '../forwarder/forwarder'
    })
  },




  //预约时间
  showTime: function(e) {
    var that = this;
    that.setData({
      hideShadow: false,
      hideTime: false,
      markFcous: true,
    })


    function getThisMonthDays(year, month) {
      return new Date(year, month, 0).getDate();
    }
    // 计算每月第一天是星期几
    function getFirstDayOfWeek(year, month) {
      return new Date(Date.UTC(year, month - 1, 1)).getDay();
    }
    const date = new Date();
    const cur_year = date.getFullYear();
    const cur_month = date.getMonth() + 1;
    const cur_date = date.getDate();
    const weeks_ch = ['日', '一', '二', '三', '四', '五', '六'];
    //利用构造函数创建对象
    function calendar(date, week) {
      this.date = cur_year + '-' + cur_month + '-' + date;
      if (date == cur_date) {
        this.week = "今天";
      } else if (date == cur_date + 1) {
        this.week = "明天";
      } else {
        this.week = '星期' + week;
      }
    }
    //当前月份的天数
    var monthLength = getThisMonthDays(cur_year, cur_month)
    //当前月份的第一天是星期几
    var week = getFirstDayOfWeek(cur_year, cur_month)
    var x = week;
    for (var i = 1; i <= monthLength; i++) {
      //当循环完一周后，初始化再次循环
      if (x > 6) {
        x = 0;
      }
      //利用构造函数创建对象
      that.data.calendar[i] = new calendar(i, [weeks_ch[x]][0])
      x++;
    }
    //限制要渲染的日历数据天数为4天以内（用户体验）
    var flag = that.data.calendar.splice(cur_date, that.data.calendar.length - cur_date <= 3 ? that.data.calendar.length : 3)
    that.setData({
      calendar: flag
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
        markFcous: false,
      })
    }

  },


  //关闭配送时间弹窗
  hideTime: function(e) {
    this.setData({
      hideShadow: true,
      hideTime: true,
      markFcous: false,
    })
  },


  //查询条款按钮
  ruleCheck: function(e) {
    if (this.data.ruleStatus == false) {
      this.setData({
        ruleIcon: "../../images/check.png",
        ruleStatus: true
      })
    } else {
      this.setData({
        ruleIcon: "../../images/uncheck.png",
        ruleStatus: false
      })
    }

  },


  //打开服务条款弹窗
  showRule: function(e) {
    this.setData({
      hideShadow: false,
      hideRule: false,
      markFcous: true,
    })
  },

  //同意条款
  agreeRule: function(e) {
    this.setData({
      ruleIcon: "../../images/check.png",
      ruleStatus: true,
      hideShadow: true,
      hideRule: true,
      markFcous: false,
    })
  },



  //关闭服务条款弹窗
  hideRule: function(e) {
    this.setData({
      hideShadow: true,
      hideRule: true,
      markFcous: false,
    })
  },


  //下单成功提示
  submitOrder: function(e) {
    if (this.data.WSend == true) {
      wx.showToast({
        title: '请选择寄件地址！',
        icon: 'none',
        duration: 3000,
      })
      return false;

    } else if (this.data.WReceive == true) {
      wx.showToast({
        title: '请选择收件地址！',
        icon: 'none',
        duration: 3000,
      })
      return false;

    } else if (this.data.WCargo == true) {
      wx.showToast({
        title: '请填写货物信息！',
        icon: 'none',
        duration: 3000,
      })
      return false;

    } else if (this.data.ruleStatus == false) {
      wx.showToast({
        title: '请查询并同意服务条款！',
        icon: 'none',
        duration: 3000,
      })
      return false;

    } else {
      this.setData({
        hideShadow: false,
        hideTip: false,
        orderId: 'QY20181127542', //订单编号、下单时间这里是虚拟数据
        orderTime: '2018-11-27 12:30',
        markFcous: true,
      })

      wx.setStorageSync('hasOrder', true) //此时用户有运单了
    }
  },


  //再下一单
  hideTip: function(e) {
    this.setData({
      hideShadow: true,
      hideTip: true,
      markFcous: false,
    })
  },


  //查看订单
  toOrder: function(e) {
    this.setData({
      hideShadow: true,
      hideTip: true,
      markFcous: false,
    })
    //   wx.navigateTo({
    //     url: '../orderinfo/orderinfo?status=' + e.currentTarget.dataset.status + '&orderId=' + e.currentTarget.dataset.id + '&orderTime=' + e.currentTarget.dataset.time
    //   })
  },


  //关闭弹窗
  hide: function(e) {
    this.setData({
      hideShadow: true,
      hideTime: true,
      hideRule: true,
      hideTip: true,
      markFcous: false,
    })
  },






  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {


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
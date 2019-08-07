// pages/formCustomer/formCustomer.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    forwarderStatus: false,
    dateStatus: false,
    date: '请选择月份',

    tableTh: [{
      title: "序号"
    }, {
      title: "月份"
    }, {
      title: "承运商名称"
    }, {
      title: "收货方客户卡号"
    }, {
      title: "收货方客户名称"
    }, {
      title: "已签收"
    }, {
      title: "待签收"
    }, {
      title: "总数"
    }, {
      title: "签收率"
    }],

    tableTr: [{
      td: [{
        name: "1"
      }, {
        name: "2018-02"
      }, {
        name: "河南路港综合运输有限公司"
      }, {
        name: "8011001"
      }, {
        name: "杭州滕策机电设备有限公司"
      }, {
        name: "39"
      }, {
        name: "0"
      }, {
        name: "39"
      }, {
        name: "100%"
      }, ]
    }, {
      td: [{
        name: "2"
      }, {
        name: "2018-02"
      }, {
        name: "山东ABC有限公司"
      }, {
        name: "8011001"
      }, {
        name: "杭州滕策机电设备有限公司"
      }, {
        name: "0"
      }, {
        name: "1"
      }, {
        name: "1"
      }, {
        name: "0.0%"
      }, ]
    }, {
      td: [{
        name: "3"
      }, {
        name: "2018-02"
      }, {
        name: "芜湖八达物流有限公司"
      }, {
        name: "8011001"
      }, {
        name: "杭州滕策机电设备有限公司"
      }, {
        name: "0"
      }, {
        name: "1"
      }, {
        name: "1"
      }, {
        name: "0.0%"
      }, ]
    }, {
      td: [{
        name: "汇总"
      }, {
        name: ""
      }, {
        name: ""
      }, {
        name: ""
      }, {
        name: ""
      },{
        name: "39"
      }, {
        name: "3"
      }, {
        name: "42"
      }, {
        name: "92.857%"
      }, ]

    }],


    //承运商列表弹窗
    hide: true,
    hideForwarder: true,
    forwarderList: [{
      logo: "../../images/company2.jpg",
      name: "万隆化工物流",
      level: '4',
      levelpic: "../../images/s_crown_1.gif",
      person: "老王",
      tel: "0577-65092470",
      by: "浙江、江苏、上海配送",
      location: "浙江省温州市瑞安市锦湖街道万隆化工",
      check: "../../images/uncheck.png",
    }, {
      logo: "../../images/company1.jpg",
      name: "德力西物流",
      level: '3',
      levelpic: "../../images/s_cap_1.gif",
      person: "小李",
      tel: "0577-61778888",
      by: "浙江、江苏、上海配送",
      location: "浙江省乐清市柳市镇德力西高科技工业园",
      check: "../../images/uncheck.png",
    }, {
      logo: "../../images/company3.jpg",
      name: "邮政EMS",
      level: '5',
      levelpic: "../../images/b_blue_1.gif",
      person: "张三",
      tel: "0577-61772929",
      by: "浙江、湖北、北京、上海配送",
      location: "浙江省杭州市东宁路60号A座",
      check: "../../images/uncheck.png",
    }, {
      logo: "../../images/company1.jpg",
      name: "德力西物流",
      level: '5',
      levelpic: "../../images/s_red_1.gif",
      person: "小徐",
      tel: "0577-61775678",
      by: "浙江、江苏、上海配送",
      location: "浙江省乐清市柳市镇德力西高科技工业园",
      check: "../../images/uncheck.png",
    }, ]

  },

  //打开承运商列表
  showForwarder: function(e) {
    this.setData({
      hide: false,
      hideForwarder: false,
    })
  },



  //选中承运商
  toSend: function(e) {
    var forwarderList = this.data.forwarderList
    var index = e.currentTarget.dataset.index
    var name = forwarderList[index].name
    for (var i = 0; i < forwarderList.length; i++) {
      forwarderList[i].check = "../../images/uncheck.png"
    }
    forwarderList[index].check = "../../images/check.png"

    this.setData({
      forwarderList: forwarderList,
      checkName: name
    })

  },

  //确认选择承运商
  sureForwarder: function(e) {
    console.log(this.data.checkName)
    if (this.data.checkName == undefined || this.data.checkName == '') {
      wx.showToast({
        title: '请选择承运商！',
        icon: 'none',
        duration: 3000,
      })
    } else {
      this.setData({
        hide: true,
        hideForwarder: true,
        val: this.data.checkName,
        forwarderStatus: true,
      })
    }
  },

  //关闭弹窗
  hide: function(e) {
    this.setData({
      hide: true,
      hideForwarder: true,
    })
  },


  //清除选择承运商
  forwarderClear: function(e) {
    var forwarderList = this.data.forwarderList
    for (var i = 0; i < forwarderList.length; i++) {
      forwarderList[i].check = "../../images/uncheck.png"
    }

    this.setData({
      forwarderStatus: false,
      val: '',
      checkName: '',
      forwarderList: forwarderList
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



  //详情页
  toInfo: function(e) {
    wx.navigateTo({
      url: '../formCustomerinfo/formCustomerinfo'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
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
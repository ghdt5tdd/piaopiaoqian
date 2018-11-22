// pages/transportdetail/transportdetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderStatus: [{
      name: "运单详情",
    }, {
      name: "异常上报",
    }, {
      name: "签收回单",
    }, {
      name: "订单评价",
    }, {
      name: "电子回单",
    }, ],

    selectStatus: 0,
    ul: "ul-5",

    //运单详情
    transportId: "18352790283072",
    transportTime: "2018-01-10",
    transportStart: "浙江温州",
    transportEnd: "湖北武汉",
    startTime: "2018-01-11",
    endTime: "2018-01-15",

    startCompany: "温州物流",
    startName: "郭丽",
    startTel: "13633928364",
    startDoor: "浙江省乐清市柳市镇德力西高科技工业园区",
    endCompany: "武汉恒望科技有限公司",
    endName: "张三",
    endTel: "15890268364",
    endDoor: "湖北省武汉市洪山区光谷世贸中心",


    transportBar: [{
      bar: [{
        label: "开始起运时间",
        text: "2018-01-11 16：50",
      }, {
        label: "预计送达时间",
        text: "2018-01-15 10：00",
      }, {
        label: "货物名称",
        text: "普货",
      }, {
        label: "货物件数",
        text: "180",
      }, {
        label: "货物重量",
        text: "2637kg",
      }, {
        label: "货物体积",
        text: "4.8m³",
      }, {
        label: "备注",
        text: "",
      }, ]
    }, {
      bar: [{
        label: "承运商",
        text: "浙江乐清物流",
      }, {
        label: "联系人",
        text: "安振龙",
      }, {
        label: "联系方式",
        text: "13628353926",
      }, ]
    }],





    //异常上报
    abnormalItems: [{
      name: "张三",
      time: "2018-01-08",
      status: "等待处理",
      row: [{
        label: "异常类型",
        name: "货损",
      }, {
        label: "发生环节",
        name: "取货",
      }, {
        label: "联系人",
        name: "张三",
      }],
    }, {
      name: "李思",
      time: "2018-01-08",
      status: "等待处理",
      row: [{
        label: "异常类型",
        name: "货差",
      }, {
        label: "发生环节",
        name: "交接",
      }, {
        label: "联系人",
        name: "李思",
      }],
    }],



    //评价星级
    commentAvatar: "../../images/avatar-sy.png",
    commentName: "张三",
    commentTime: "2018-01-15 09:26",
    commentStar: "star-4",
    commentRank: "非常好",
    commentWords: "发货速度很快，到货时积极联系，货物包装完好无损，数量无差，给快递员比个小心心❥(^_-)",
    commentImgs: [{
      img: "../../images/scene1.jpg"
    }, {
      img: "../../images/scene2.jpg"
    }],


    //电子回单
    stubCode: "../../images/barCode.jpg",
    stubItem: [{
      info: [{
        label: "货物名称",
        text: "普货",
      }, {
        label: "货物件数",
        text: "180",
      }]

    }, {
      info: [{
        label: "货物重量",
        text: "2637kg",
      }, {
        label: "货物体积",
        text: "4.8m³",
      }]
    }, ],

    stubBar: [{
      style: 1,
      bar: [{
        label: "揽件人",
        text: "安振龙",
      }, {
        label: "支付方式",
        text: "",
      }, {
        label: "发件人",
        text: "郭丽",
      }, {
        label: "签收人",
        text: "",
      }]
    }, {
      style: 0,
      bar: [{
        label: "承运商",
        text: "浙江乐清物流",
      }, {
        label: "创建时间",
        text: "2018-01-10 08：36",
      }, {
        label: "起运时间",
        text: "2018-01-11 16：50",
      }, {
        label: "备注",
        text: "",
      }]
    }, ]




  },



  //Tab选择
  selectStatus: function(e) {
    var index = e.target.dataset.index;
    this.setData({
      selectStatus: index
    })
  },


  //跳转到异常详情页面
  toInfo: function(e) {
    wx.navigateTo({
      url: '../abnormalinfo/abnormalinfo'
    })
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options.id)
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
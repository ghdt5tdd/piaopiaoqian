// pages/forwarderLevel/forwarderLevel.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    levelGood:"1860",
    levelMedium:"120",
    levelNegative:"20",
    levelTotal: "2000",
    levelRate: "93%",
    tableTh: [{
      title: "等级"
    }, {
      title: "最低好评数"
    }, {
      title: "总评数"
    }, {
      title: "最低好评率"
    }, ],

    tableTr: [{
      td: [{
        levelNum: "5",
        levelPic: "../../images/s_crown_1.gif",
      }, {
        name: "1960"
      }, {
        name: "2000"
      }, {
        name: "98%"
      }, ]
    }, {
      td: [{
        levelNum: "4",
        levelPic: "../../images/s_crown_1.gif",
      }, {
        name: "1900"
      }, {
        name: "2000"
      }, {
        name: "95%"
      }, ]
    }, {
      td: [{
        levelNum: "3",
        levelPic: "../../images/s_crown_1.gif",
      }, {
        name: "1840"
      }, {
        name: "2000"
      }, {
        name: "92%"
      }, ]
    }, {
      td: [{
        levelNum: "2",
        levelPic: "../../images/s_crown_1.gif",
      }, {
        name: "1800"
      }, {
        name: "2000"
      }, {
        name: "90%"
      }, ]
    }, {
      td: [{
        levelNum: "1",
        levelPic: "../../images/s_crown_1.gif",
      }, {
        name: "1760"
      }, {
        name: "2000"
      }, {
        name: "88%"
      }, ]
    }, {
      td: [{
        levelNum: "5",
        levelPic: "../../images/s_cap_1.gif",
      }, {
        name: "1425"
      }, {
        name: "1500"
      }, {
        name: "95%"
      }, ]
    }, {
      td: [{
        levelNum: "4",
        levelPic: "../../images/s_cap_1.gif",
      }, {
        name: "1350"
      }, {
        name: "1500"
      }, {
        name: "90%"
      }, ]
    }, {
      td: [{
        levelNum: "3",
        levelPic: "../../images/s_cap_1.gif",
      }, {
        name: "1320"
      }, {
        name: "1500"
      }, {
        name: "88%"
      }, ]
    }, {
      td: [{
        levelNum: "2",
        levelPic: "../../images/s_cap_1.gif",
      }, {
        name: "1290"
      }, {
        name: "1500"
      }, {
        name: "86%"
      }, ]
    }, {
      td: [{
        levelNum: "1",
        levelPic: "../../images/s_cap_1.gif",
      }, {
        name: "1260"
      }, {
        name: "1500"
      }, {
        name: "84%"
      }, ]
    }, {
      td: [{
        levelNum: "5",
        levelPic: "../../images/b_blue_1.gif",
      }, {
        name: "950"
      }, {
        name: "1000"
      }, {
        name: "95%"
      }, ]
    }, {
      td: [{
        levelNum: "4",
        levelPic: "../../images/b_blue_1.gif",
      }, {
        name: "920"
      }, {
        name: "1000"
      }, {
        name: "92%"
      }, ]
    }, {
      td: [{
        levelNum: "3",
        levelPic: "../../images/b_blue_1.gif",
      }, {
        name: "900"
      }, {
        name: "1000"
      }, {
        name: "90%"
      }, ]
    }, {
      td: [{
        levelNum: "2",
        levelPic: "../../images/b_blue_1.gif",
      }, {
        name: "880"
      }, {
        name: "1000"
      }, {
        name: "88%"
      }, ]
    }, {
      td: [{
        levelNum: "1",
        levelPic: "../../images/b_blue_1.gif",
      }, {
        name: "840"
      }, {
        name: "1000"
      }, {
        name: "84%"
      }, ]
    }, {
      td: [{
        levelNum: "5",
        levelPic: "../../images/s_blue_1.gif",
      }, {
        name: "540"
      }, {
        name: "600"
      }, {
        name: "90%"
      }, ]
    }, {
      td: [{
        levelNum: "4",
        levelPic: "../../images/s_blue_1.gif",
      }, {
        name: "528"
      }, {
        name: "600"
      }, {
        name: "88%"
      }, ]
    }, {
      td: [{
        levelNum: "3",
        levelPic: "../../images/s_blue_1.gif",
      }, {
        name: "510"
      }, {
        name: "600"
      }, {
        name: "85%"
      }, ]
    }, {
      td: [{
        levelNum: "2",
        levelPic: "../../images/s_blue_1.gif",
      }, {
        name: "480"
      }, {
        name: "600"
      }, {
        name: "80%"
      }, ]
    }, {
      td: [{
        levelNum: "1",
        levelPic: "../../images/s_blue_1.gif",
      }, {
        name: "756"
      }, {
        name: "600"
      }, {
        name: "76%"
      }, ]
    }, {
      td: [{
        levelNum: "5",
        levelPic: "../../images/s_red_1.gif",
      }, {
        name: "170"
      }, {
        name: "200"
      }, {
        name: "85%"
      }, ]
    }, {
      td: [{
        levelNum: "4",
        levelPic: "../../images/s_red_1.gif",
      }, {
        name: "160"
      }, {
        name: "200"
      }, {
        name: "80%"
      }, ]
    }, {
      td: [{
        levelNum: "3",
        levelPic: "../../images/s_red_1.gif",
      }, {
        name: "152"
      }, {
        name: "200"
      }, {
        name: "76%"
      }, ]
    }, {
      td: [{
        levelNum: "2",
        levelPic: "../../images/s_red_1.gif",
      }, {
        name: "144"
      }, {
        name: "200"
      }, {
        name: "72%"
      }, ]
    }, {
      td: [{
        levelNum: "1",
        levelPic: "../../images/s_red_1.gif",
      }, {
        name: "140"
      }, {
        name: "200"
      }, {
        name: "70%"
      }, ]
    }, ]


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      levelNum: options.level,
      levelPic: options.pic,
    })
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
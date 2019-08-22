// pages/enter/enter.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderStatus: [{
      name: "到货库存",
    }, {
      name: "送货上门",
    }, ],
    selectStatus: 0,

    
    order: [{
      id: "18352790283072",
      time: "2018-01-10",
      start: "始发站一",
      end: "到达站二",
      bar: [{
        label: "车次",
        info: "车次03",
      }, {
        label: "车号",
        info: "浙C11A6X",
      }, {
        label: "司机",
        info: "张三 13622551425",
      }, {
        label: "货物件数",
        info: "16件",
      }, {
        label: "发车时间",
        info: "2018-01-11 12:53",
      }, {
        label: "预计到达时间",
        info: "2018-01-15 18:00",
      }, {
        label: "实际到达时间",
        info: "2018-01-15 16:27",
      }, {
        label: "备注",
        info: "货物为易碎品，轻拿轻放",
      }],
      status: "待上报",
      opt: [{
        name: "查看详情",
        open: "toInfo",
        line: true
      }, {
        name: "进仓上报",
        open: "toReport"
      }]
    }, {
      id: "18352790283072",
      time: "2018-01-10",
      start: "始发站一",
      end: "到达站二",
      bar: [{
        label: "车次",
        info: "车次03",
      }, {
        label: "车号",
        info: "浙C11A6X",
      }, {
        label: "司机",
        info: "张三 13622551425",
      }, {
        label: "货物件数",
        info: "16件",
      }, {
        label: "发车时间",
        info: "2018-01-11 12:53",
      }, {
        label: "预计到达时间",
        info: "2018-01-15 18:00",
      }, {
        label: "实际到达时间",
        info: "2018-01-15 16:27",
      }, {
        label: "备注",
        info: "货物为易碎品，轻拿轻放",
      }],
      status: "待上报",
      opt: [{
        name: "查看详情",
        open: "toInfo",
        line: true
      }, {
        name: "进仓上报",
        open: "toReport"
      }]
    }, ],

    hide: true,
    hideReport: true,
    enterPay: "20.00",
    receiptPic: "../../images/picture2.png"
  },



  //选择我的订单状态
  selectStatus: function(e) {
    var index = e.target.dataset.index;
    this.setData({
      selectStatus: index
    })
  },


  //扫描二维码
  scanCode() {
    wx.scanCode({
      success(res) {
        console.log(res.result)
        this.setData({
          hideReport: false,
          hide: false,
        })
      }
    })
  },

  //运单详情
  toInfo: function(e) {
    wx.navigateTo({
      url: '../enterInfo/enterInfo'
    })
  },


  //进仓上报
  toReport: function(e) {
    this.setData({
      hideReport: false,
      hide: false,
    })
  },

  //回单上传
  changeReceipt: function(e) {
    var _this = this // 不能直接用this，留坑
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'], // 指定是原图还是压缩图
      sourceType: ['album', 'camera'], // 指定来源是相册还是相机
      success: function(res) {
        var tempFilePaths = res.tempFilePaths; //可以作为img标签的src属性显示图片
        _this.setData({
          receiptPic: tempFilePaths
        });
      }
    })
  },


  //关闭弹窗
  hide: function(e) {
    this.setData({
      hide: true,
      hideReport: true,
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
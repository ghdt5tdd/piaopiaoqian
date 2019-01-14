// pages/goodsdetail/goodsdetail.js
const ajax = require('../../utils/ajax.js')
const util = require('../../utils/util.js')
const storage = require('../../utils/storage.js')
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    levelTotal: "1081",
    vipLevel: "level0",
    levelPic: "../../images/b_blue_4.gif",
    levelRate: "28%",
    levelDatas:[],
    memberServiceRate: {},
    tableTh: [{
      title: ""
    }, {
      title: "好评"
    }, {
      title: "中评"
    }, {
      title: "差评"
    }, {
      title: "总计"
    }, {
      title: "服务率"
    }, ],

    tableTr: [{
      td: [{
        name: "最近一周"
      }, {
        name: "0"
      }, {
        name: "1"
      }, {
        name: "1"
      }, {
        name: "2"
      }, {
        name: "-50%"
      }, ]
    }, {
      td: [{
        name: "最近1个月"
      }, {
        name: "6"
      }, {
        name: "10"
      }, {
        name: "7"
      }, {
        name: "23"
      }, {
        name: "-4%"
      }, ]
    }, {
      td: [{
        name: "最近3个月"
      }, {
        name: "18"
      }, {
        name: "10"
      }, {
        name: "8"
      }, {
        name: "36"
      }, {
        name: "28%"
      }, ]
    }, {
      td: [{
        name: "最近6个月"
      }, {
        name: "18"
      }, {
        name: "10"
      }, {
        name: "8"
      }, {
        name: "36"
      }, {
        name: "28%"
      }, ]
    }, {
      td: [{
        name: "6个月前"
      }, {
        name: "0"
      }, {
        name: "0"
      }, {
        name: "0"
      }, {
        name: "0"
      }, {
        name: "0%"
      }, ]
    }, {
      td: [{
        name: "总计"
      }, {
        name: "1600"
      }, {
        name: "10"
      }, {
        name: "8"
      }, {
        name: "36"
      }, {
        name: "28%"
      }, ]
    }, ]
  },

  getServiceReport() {

    const memberServiceReport = storage.get('memberServiceReport' + app.globalData.memberInfo.id)
    if (!memberServiceReport) {
      wx.showLoading({
        title: '数据获取中',
      })
      ajax.getApi('app/member/getServiceReport', {

      }, (err, res) => {
        wx.hideLoading()
        if (res && res.success) {
          const levelDatas = res.data

          levelDatas.forEach(v => {
            v.favorable_rating *= 100
          })
          storage.put('memberServiceReport' + app.globalData.memberInfo.id, levelDatas, 12 * 60 * 60)
          this.setData({
            levelDatas
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
    } else {
      this.setData({
        levelDatas: memberServiceReport,
      })
    }


  },


  getServiceRating() {
    const memberServiceRate = storage.get('memberServiceRate' + app.globalData.memberInfo.id)
    if (!memberServiceRate) {
      ajax.getApi('app/member/getServiceRating', {

      }, (err, res) => {
        if (res && res.success) {
          const serviceRate = res.data
          serviceRate.favorable_rating *= 100
          storage.put('memberServiceRate' + app.globalData.memberInfo.id, serviceRate, 12 * 60 * 60)
          this.setData({
            memberServiceRate: serviceRate,
            vipLevel: 'level' + serviceRate.icon_number,
            levelTotal: serviceRate.total_order_number,
            levelRate: serviceRate.favorable_rating,
            levelPic: '../../images/b_blue_' + serviceRate.icon_number + '.gif'
          })
        }
      })
    } else {
      this.setData({
        memberServiceRate,
        vipLevel: 'level' + memberServiceRate.icon_number,
        levelTotal: memberServiceRate.total_order_number,
        levelRate: memberServiceRate.favorable_rating,
        levelPic: '../../images/b_blue_' + memberServiceRate.icon_number + '.gif'
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setWidth()
    this.getServiceReport()
    this.getServiceRating()
  },

  setWidth() {
    //计算宽度
    var query = wx.createSelectorQuery();
    var that = this;
    query.select('.table').boundingClientRect(function (rect) {
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
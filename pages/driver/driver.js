// pages/driver/driver.js
const ajax = require('../../utils/ajax.js')
const util = require('../../utils/util.js')
const storage = require('../../utils/storage.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    pageSize: 10,
    loadCompleted: false,
    drivers: []
  },
  

  //选择车辆
  checkDriver: function(e) {
    wx.navigateBack({ //返回
      delta: 1
    })
    const pages = getCurrentPages();
    const prevPage = pages[pages.length - 2]; //上一个页面
    //直接调用上一个页面的setData()方法，把数据存到上一个页面中去

    const drivers = this.data.drivers
    const index = e.currentTarget.dataset.index
    prevPage.setData({
      sendDriver: drivers[index],
      sendCar: drivers[index].remark,
    })
  },


  //设为常派
  defaultSet: function(e) {
    var index = e.currentTarget.dataset.index
    var driver = this.data.driver
    var button = driver[index].button;
    if (button == false) {
      driver[index].button = !button;
    } else {
      for (var i = 0; i < driver.length; i++) {
        driver[i].button = true;
      }
      driver[index].button = false;
    }

    this.setData({
      driver: driver
    })
  },

  lower: function (e) {
    let page = this.data.page
    const pageSize = this.data.pageSize
    const loadCompleted = this.data.loadCompleted
    if (!loadCompleted) {
      page++
      this.setData({
        page
      }, () => {
        this.getDrivers()
      })
    } else {
      wx.showToast({
        title: '数据已全部加载完毕',
        duration: 1000
      })
    }
  },

  getDrivers() {
    wx.showLoading({
      title: '获取中...',
    })
    const page = this.data.page
    const pageSize = this.data.pageSize
    const params = {
      page,
      pageSize,
    }  
    ajax.getApi('app/member/findSubAccount', params, (err, res) => {
      wx.hideLoading()
      if (res && res.success) {
        wx.hideLoading()
        if (res.data.length > 0) {
          const drivers = this.data.drivers
          Array.prototype.push.apply(drivers, res.data)
          this.setData({
            drivers
          })
        } else {
          this.setData({
            loadCompleted: true
          })
          wx.showToast({
            title: '数据已全部加载完毕',
            duration: 1000
          })
        }
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
    this.getDrivers()
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
// pages/form/form.js
const ajax = require('../../utils/ajax.js')
const util = require('../../utils/util.js')
const storage = require('../../utils/storage.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    partnerTypeCode: undefined,
  },

  toDataList(e){
    const type = e.currentTarget.dataset.type
    wx.navigateTo({
      url: '../formCustomer/formCustomer?type=' + type,
    })
  },

  // toSignList(e){
  //   const type = e.currentTarget.dataset.type
  //   wx.navigateTo({
  //     url: '../formSign/formSign?type=' + type,
  //   })
  // },

  setTitle(partnerTypeCode){
    switch(partnerTypeCode) {
      case 'carrier':
        wx.setNavigationBarTitle({
          title:"承运商"
        })
        break;
      case 'ownLogistCenter':
      case 'ownLogistArea':
        wx.setNavigationBarTitle({
          title: "区域仓"
        })
        break;
      case 'bigCustomer':
      case 'franchiser':
        wx.setNavigationBarTitle({
          title: "客户"
        })
        break;
      default:
        wx.showToast({
          title: '不支持的角色',
        })
    }
     
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const partnerTypeCode = app.globalData.memberInfo.partnerTypeCode
    this.setTitle(partnerTypeCode)
    this.setData({
      partnerTypeCode
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})
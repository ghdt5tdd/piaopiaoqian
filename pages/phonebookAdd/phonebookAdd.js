// pages/phonebookAdd/phonebookAdd.js
const ajax = require('../../utils/ajax.js')
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: { 
      head_img: '',
      name: '',
      contact_man: '',
      contact_way: '',
      card_number: '',
      address: '',
      remark: '',
  },

  name: function(e) {
    const name = e.detail.value
    this.setData({
      name
    })
  },

  contact_man: function (e) {
    const contact_man = e.detail.value
    this.setData({
      contact_man
    })
  },

  contact_way: function (e) {
    const contact_way = e.detail.value
    this.setData({
      contact_way
    })
  },

  card_number: function (e) {
    const card_number = e.detail.value
    this.setData({
      card_number
    })
  },

  address: function (e) {
    const address = e.detail.value
    this.setData({
      address
    })
  },

  remark: function (e) {
    const remark = e.detail.value
    this.setData({
      remark
    })
  },

  save: function() {
    const now = util.getFormatDate()
    wx.showLoading({
      title: '保存中...',
    })
    ajax.postApi('app/member/telbookSaveOrUpdate', {
      ...this.data
    }, (err, res) => {
      wx.hideLoading()
      if (res && res.success) {
        wx.showToast({
          title: '保存成功',
          duration: 1500
        })
        wx.removeStorageSync('telbooksInfo')
        wx.navigateBack({
          delta: 1
        })
      }else {
        wx.showToast({
          title: '保存失败',
          duration: 1000
        })
      }
    })	
  },

  //上传图片
  changePic: function(e) {
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: res => {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        util.ImgPathToBase64(res.tempFilePaths[0], base64 => {
          const head_img = 'data:image/png;base64,' + base64
          this.setData({
            head_img
          })
        })
      }
    })

  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(...this.data)
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
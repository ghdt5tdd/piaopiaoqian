// pages/phonebookAdd/phonebookAdd.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    src: "../../images/avatar-sy.png",
    phoneItems: [{
      img: "../../images/list1.png",
      label: "头像",
    }, {
      img: "../../images/list2.png",
      label: "姓名",
      name: "温州山鹰物流公司",
    }, {
      img: "../../images/list3.png",
      label: "联系人",
      name: "李程",
    }, {
      img: "../../images/list4.png",
      label: "联系方式",
      name: "13584904645",
    }, {
      img: "../../images/list5.png",
      label: "卡号",
      name: "42030216372893085",
    }, {
      img: "../../images/list6.png",
      label: "地址",
      name: "浙江省温州市鹿城广场",
    }, {
      img: "../../images/list7.png",
      label: "备注",
      name: "可不填",
    }, ]


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
        that.setData({
          src: res.tempFilePaths
        })

      }
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
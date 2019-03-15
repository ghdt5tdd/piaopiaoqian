// pages/driver/driver.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    driver: [{
      name: "章纵",
      tel: "15822635463",
      area: "浙江省",
      car: "浙C18526",
      carType: "中货车",
      carLength: "1.5",
      carWeight: "5000",
      button: true
    }, {
      name: "黎旭",
      tel: "13622636688",
      area: "浙江省",
      car: "浙C34267",
      carType: "大卡车",
      carLength: "4.5",
      carWeight: "9000",
      button: true
    }]
  },
  

  //选择车辆
  checkDriver: function(e) {
    wx.navigateBack({ //返回
      delta: 1
    })
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2]; //上一个页面
    //直接调用上一个页面的setData()方法，把数据存到上一个页面中去

    var driver = this.data.driver
    var index = e.currentTarget.dataset.index
    prevPage.setData({
      sendDriver: driver[index].name,
      sendCar: driver[index].car,
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
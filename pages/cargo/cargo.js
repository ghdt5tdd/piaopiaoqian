// pages/cargo/cargo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cargoList: [{
      name: "电子"
    }, {
      name: "服装鞋帽"
    }, {
      name: "小型家电"
    }, {
      name: "汽配"
    }, {
      name: "食品"
    }, {
      name: "图书印刷品"
    }, {
      name: "其他",
    }],
    select: 0,
    cargoName: "电子",


    cargoPay: [{
      pic: "../../images/check.png",
      name: "现付"
    }, {
      pic: "../../images/uncheck.png",
      name: "到付"
    }, {
      pic: "../../images/uncheck.png",
      name: "月结"
    }],


  },

  //商品名名称
  selectname: function(e) {
    var cargoList = this.data.cargoList
    var index = e.currentTarget.dataset.index
    if (cargoList[index].name == '其他') {
      cargoList[index].input = true
      var cargoName = ''
    } else {
      for (var i = 0; i < cargoList.length; i++) {
        cargoList[i].input = false
      }
      var cargoName = cargoList[index].name
    }

    this.setData({
      select: index,
      cargoList: cargoList,
      cargoName: cargoName
    })

  },



  //结算方式
  selectpay: function(e) {
    var cargoPay = this.data.cargoPay
    var index = e.currentTarget.dataset.index
    for (var i = 0; i < cargoPay.length; i++) {
      cargoPay[i].pic = "../../images/uncheck.png"
    }
    cargoPay[index].pic = "../../images/check.png"

    this.setData({
      cargoPay: cargoPay
    })

  },


  //保存
  formSubmit: function(e) {
    if (e.detail.value.name == "") {
      wx.showToast({
        title: '请输入货物名称！',
        icon: 'none',
        duration: 3000,
      })
    } else if (e.detail.value.num == "") {
      wx.showToast({
        title: '请输入货物件数！',
        icon: 'none',
        duration: 3000,
      })
    } else {

      wx.navigateBack({ //返回
        delta: 1
      })
      var pages = getCurrentPages();
      var prevPage = pages[pages.length - 2]; //上一个页面
      //直接调用上一个页面的setData()方法，把数据存到上一个页面中去


      if (this.data.cargoName == '') { //货物名称是选择的还是自己写的
        var cargoName = e.detail.value.name
      } else {
        var cargoName = this.data.cargoName
      }

      if (e.detail.value.weight != '') { //填了货物重量
        prevPage.setData({
          cargoWeight: e.detail.value.weight + 'kg',
        })
      }

      if (e.detail.value.cub != '') { //填了货物体积
        prevPage.setData({
          cargoCub: e.detail.value.cub + 'm³',
        })
      }


      prevPage.setData({ //货物名称、件数、包装等信息
        WCargo: false,
        cargoName: cargoName,
        cargoNum: e.detail.value.num + '件',
        cargoPack: e.detail.value.pack,
      })

    }

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
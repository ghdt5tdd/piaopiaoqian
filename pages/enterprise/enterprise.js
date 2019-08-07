// pages/enterprise/enterprise.js
const app = getApp()
const ajax = require('../../utils/ajax.js')
const util = require('../../utils/util.js')
// 引入SDK核心类
var QQMapWX = require('../qqmap/qqmap-wx-jssdk.js')
var demo = new QQMapWX({
  key: app.globalData.qqMapKey // 必填 换成自己申请到的
})
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 0,
    pageSize: 10,
    begin: "城市",
    companyItems: [],
    companyItemsFilter: [],
    enterprise: [{
      logo: "../../images/company.png",
      name: "温州春城货运有限公司",
      tel: "0577-88452218",
      by: "温州-昆明专线",
      location: "温州市瓯海区潘桥街横焦路99号中瓯物流园9幢1-2号",
    }, {
      logo: "../../images/company3.jpg",
      name: "温州华安物流有限公司",
      tel: "0577-88418198",
      by: "温州-山东全线",
      location: "浙江省温州市瓯海区潘桥街道高新技术区创业园",
    }, {
      logo: "../../images/company2.jpg",
      name: "万隆化工有限公司",
      tel: "0577-65092470",
      by: "中国企业500强",
      location: "浙江省温州市瑞安市锦湖街道万隆化工",
    }, {
      logo: "../../images/company1.jpg",
      name: "德力西电气有限公司",
      tel: "0577-61778888",
      by: "中国企业500强",
      location: "浙江省乐清市柳市镇德力西高科技工业园",
    }, ]
  },


  //拨打电话
  bookTel: function (e) {
    var tel = e.currentTarget.dataset.tel
    wx.makePhoneCall({
      phoneNumber: tel
    })
  },

  bindSarchInput(e) {
    const val = e.detail.value
    const companyItems = this.data.companyItems
    const companyItemsFilter = companyItems.filter(v => {
      return v.company.indexOf(val) !== -1
    })
    this.setData({
      companyItemsFilter
    })
  },


  //导航
  navigation: function (e) {
    console.log(e)
    //地址解析(地址转坐标)     
    demo.geocoder({
      address: e.currentTarget.dataset.location,

      success: function (res) {
        console.log(res)
        var latitude = res.result.location.lat
        var longitude = res.result.location.lng
        var addressOn = e.currentTarget.dataset.location
        // 取到坐标并打开地图
        wx.openLocation({
          latitude: latitude,
          longitude: longitude,
          address: addressOn,
          scale: 28
        })
      },
      fail: function (res) {
        console.log(res);
      },
      complete: function (res) {
        console.log(res);
      }
    });
  },


  //选择企业
  toBind: function (e) {
    var logo = e.currentTarget.dataset.logo
    var title = e.currentTarget.dataset.name
    var area = e.currentTarget.dataset.area

    var pages = getCurrentPages();
    if (pages.some(v => v.route === 'pages/bind/bind')) {
      var prevPage = pages[pages.length - 2]; //上一个页面
      //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
      prevPage.setData({
        logo: logo,
        title: title,
        area: area,
        loginUsername: '',
        loginPassword: '',
      })
      wx.navigateBack({
        delta: 1
      })
    } else {
      wx.redirectTo({
        url: '../bind/bind?area=' + area + '&title=' + title + '&logo=' + logo,
      })
    }
 
  },

  getCompany(e) {
    wx.showLoading({
      title: '读取中...',
    })
    ajax.getApi('app/common/getShopListByGrant', {
      page: this.data.page,
      pageSize: this.data.pageSize,
      app_area: app.globalData.piaopiaoQianAppArea
    }, (err, res) => {
      wx.hideLoading()
      if (res && res.success) {
        util.handleImgUrl(res.data, 'logo_img')
        this.setData({
          companyItems: res.data,
          companyItemsFilter: res.data
        })
      }
    })
  },


  //返回
  switch: function(e) {
    wx.redirectTo({
      url: '../enterpriseDomain/enterpriseDomain'
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getCompany()
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
// pages/company/company.js
const app = getApp()
// 引入SDK核心类
var QQMapWX = require('../qqmap/qqmap-wx-jssdk.js');
var demo = new QQMapWX({
  key: 'I5GBZ-ZQULP-6MTD5-L4RVA-XAPAJ-DKB4G' // 必填 换成自己申请到的
});

Page({

  /**
   * 页面的初始数据
   */
  data: {
    begin: "城市",
    companyItems: [{
      logo: "../../images/company1.jpg",
      name: "德力西电气有限公司",
      spec: "德力西电气有限公司是成立于2007年的大型的合资企业，座落于“中国电器之都”———浙江省乐清市柳市镇，累计投资额近20亿元人民币，占地达240, 000平方米，拥有员工10, 000余人，是中国低压电器行业具有一定规模的合资企业。",
      tel: "0577-61778888",
      by: "浙江、江苏、上海配送",
      location: "浙江省乐清市柳市镇德力西高科技工业园",
    }, {
      logo: "../../images/company2.jpg",
      name: "万隆化工有限公司",
      spec: "万隆化工有限公司创建于1984年，是我国历史悠久，生产规模庞大的荧光颜料生产企业。公司通过了ISO9001质量体系认证和ISO14001环境体系认证，荣获多项国家专利，是国家级高新技术企业",
      tel: "0577-65092470",
      by: "浙江、江苏、上海配送",
      location: "浙江省温州市瑞安市锦湖街道万隆化工",

    }]
  },


  /*城市选择事件 */
  BeginCity: function () {
    wx.navigateTo({
      url: '../city/city?cityType=begin',
    })
  },

  //拨打电话
  bookTel: function (e) {
    var tel = e.currentTarget.dataset.tel
    wx.makePhoneCall({
      phoneNumber: tel
    })
  },

  //导航
  navigation: function (e) {

    //地址解析(地址转坐标)     
    demo.geocoder({
      address : e.currentTarget.dataset.location,

      success: function (res) {

        var latitude = res.result.location.lat
        var longitude = res.result.location.lng
        var addressOn = e.currentTarget.dataset.location
        // 取到坐标并打开地图
        wx.openLocation({
          latitude: latitude,
          longitude: longitude,
          address:addressOn,
          scale: 28
        })

      },
      fail: function (res) {
        // console.log(res);
      },
      complete: function (res) {
        // console.log(res);
      }
    });




  },

  //选择企业
  toBind: function (e) {
    var logo = e.currentTarget.dataset.logo
    var title = e.currentTarget.dataset.name
    wx.navigateBack({ //返回
      delta: 1
    })
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2]; //上一个页面
    //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
    prevPage.setData({
      logo: logo,
      title: title,
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

    if (app.globalData.trainBeginCity == undefined) {
      this.setData({
        begin: "城市",
      })
    } else {
      this.setData({
        begin: app.globalData.trainBeginCity,
      })
    }
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
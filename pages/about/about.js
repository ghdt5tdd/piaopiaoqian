// pages/about/about.js
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
    logo: "../../images/company2.jpg",
    name: "万隆化工物流",
    spec: "卓越服务，我们就在您身边",
    introduce:[{
      info:"万隆化工物流是一家集零担快运、物流配送、车辆挂靠为一体的专业货运公司。是经交通局、工商局、税务局等部门批准的合法运输企业。公司自备车队及专业吊装设备，为广大客户提供专业化、大规模、全方位的物流服务。公司技术力量雄厚，具有多名高级物流师，可为各类企业设计专业的物流方案。"
    },{
        info:"   公司以开拓的思路、超前的意识，塑造崭新的形象，用实践中探索出来的管理制度和工作程序为各类企业提供优质高效的服务。当您选择了我们，我们将以真诚的服务来回赠您对我们的选择，坚持诚信为本、高效、优质、安全的流程化管理和服务。我们将本着“至诚之信、精益求精”的经营理念，以客户为中心，以诚信为准则，以满意为宗旨，与客户携手共进，合作双赢，共创美好的明天！"
    }],
    tel: "0577-65092470",
    by: "浙江、江苏、上海配送",
    location: "浙江省温州市瑞安市锦湖街道万隆化工",
  },


  //地址导航
  networkMap: function (e) {

    wx.setStorageSync('address', e.currentTarget.dataset.name)

    //地址解析(地址转坐标)     
    demo.geocoder({

      address: e.currentTarget.dataset.name,
      success: function (res) {

        var latitude = res.result.location.lat
        var longitude = res.result.location.lng
        var addressOn = wx.getStorageSync('address')

        // 取到坐标并打开地图
        wx.openLocation({
          latitude: latitude,
          longitude: longitude,
          address: addressOn,
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


  //拨打电话
  bookTel: function (e) {
    wx.makePhoneCall({
      phoneNumber: this.data.tel
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
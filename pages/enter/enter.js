// pages/enter/enter.js
const ajax = require('../../utils/ajax.js')
const util = require('../../utils/util.js')
const storage = require('../../utils/storage.js')
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderStatus: [{
      name: "待上报",
      value: 0
    }, {
      name: "已上报",
      value: 1
    }],
    x: undefined,
    y: undefined,
    selectStatus: 0,
    selectOrder: undefined,
    orderNo: undefined,
    code: undefined,
    shopImgs: [],
    agentWarehouseEntryFee: 0,
    agentElseFee: 0,

    orders: [],
    page: 1,
    pageSize: 10,
    loadCompleted: false,
    hide: true,
    hideReport: true,
    enterPay: "20.00",
    receiptPic: "../../images/picture2.png",
    codename: "获取验证码"
  },

  //输入筛选条件
  bindInput: function (e) {
    const key = e.currentTarget.dataset.key
    this.setData({
      [key]: e.detail.value,
    })
  },

  //确定筛选条件
  bindComfirm: function (e) {
    this.setData({
      page: 1,
      loadCompleted: false,
      orders: [],
    }, () => {
      this.getOrder()
    })
  },

  //选择我的订单状态
  selectStatus: function (e) {
    var selectStatus = e.currentTarget.dataset.state;
    this.setData({
      selectStatus,
      page: 1,
      loadCompleted: false,
      orders: [],
    }, () => {
      this.getOrder()
    })
  },

 //获取验证码  
  getVerificationCode(e) {
    var _this = this;

    var num = 60
    var timer = setInterval(function() {
      num--;
      if (num <= 0) {
        clearInterval(timer);
        _this.setData({
          codename: '重新发送',
          disabled: false,
          codetype: false
        })
      } else {
        _this.setData({
          codename: num + "s",
          codetype: true
        })
      }
    }, 1000)

    ajax.postApi('app/order/sendDriverReportToWarehouseShopOrderMessage', {
      location: this.data.x + ',' + this.data.y,
      idList: this.data.selectOrder.id
    }, (err, res) => {
      wx.hideLoading()
      if (res && res.success) {
        if (res.data.length > 0) {
          const orders = this.data.orders
          Array.prototype.push.apply(orders, res.data);
          this.setData({
            orders
          })
        } else {
          wx.hideLoading(() => {
            wx.showToast({
              title: '运单已全部加载完毕',
              duration: 1000
            })
          })
          this.setData({
            loadCompleted: true
          })
        }
      } else {
        wx.showToast({
          title: '运单获取失败',
        })
      }

    })
    _this.setData({
      disabled: true
    })
  },

  //回单上传
  changePic: function (e) {
    var that = this // 不能直接用this，留坑
    var shopImgs = that.data.shopImgs
    if (shopImgs.length >= 6) {
      wx.showToast({
        title: '不能多于6张',
      })
      return;
    } 
    wx.chooseImage({
      count: 6, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        for (var i = 0; i < tempFilePaths.length; i++) {
          util.ImgPathToBase64(tempFilePaths[i], base64 => {
            const img = 'data:image/png;base64,' + base64
            shopImgs.push(img);
            that.setData({
              shopImgs: shopImgs,
            })
          })
        }
      }
    })

  },


  // 删除图片
  deleteImg: function (e) {
    var shopImgs = this.data.shopImgs
    var index = e.currentTarget.dataset.index;
    shopImgs.splice(index, 1);
    this.setData({
      shopImgs: shopImgs
    });
  },

  lower: function (e) {
    let page = this.data.page
    const pageSize = this.data.pageSize
    const loadCompleted = this.data.loadCompleted
    console.log(page, pageSize)
    if (!loadCompleted) {
      wx.showLoading({
        title: '更多运单加载中...',
      })
      page++
      this.setData({
        page
      }, () => {
        this.getOrder()
      })
    } else {
      wx.showToast({
        title: '运单已全部加载完毕',
        duration: 1000
      })
    }
  },

  getOrder: function () {
    wx.showLoading({
      title: '查询中..',
    })

    ajax.getApi('app/order/getDriverSendingShopOrderList', {
      state: this.data.selectStatus,
      page: this.data.page,
      pageSize: this.data.pageSize,
      orderNo: this.data.orderNo,
    }, (err, res) => {
      wx.hideLoading()
      if (res && res.success) {
        if (res.data.length > 0) {
          const orders = this.data.orders
          Array.prototype.push.apply(orders, res.data);
          this.setData({
            orders
          })
        } else {
          wx.hideLoading(() => {
            wx.showToast({
              title: '运单已全部加载完毕',
              duration: 1000
            })
          })
          this.setData({
            loadCompleted: true
          })
        }
      } else {
        wx.showToast({
          title: '运单获取失败',
        })
      }

    })
  },

  //扫描二维码
  scanCode() {
    var _this = this
    wx.scanCode({
      success(res) {
        _this.setData({
          orderNo: res.result,
          page: 1,
          loadCompleted: false,
          orders: [],
        }, () => {
          _this.getOrder()
        })
        // this.setData({
        //   hideReport: false,
        //   hide: false,
        // })
      }
    })
  },

  commitReport(e){
    wx.showLoading({
      title: '提交中...',
    })
    ajax.postApi('app/order/driverReportToWarehouseShopOrder', {
      code: this.data.code,
      location: this.data.x + ',' + this.data.y,
      idList: this.data.selectOrder.id,
      agent_warehouse_entry_fee: this.data.agentWarehouseEntryFee,
      agent_else_fee: this.data.agentElseFee,
    }, (err, res) => {
      this.setData({
        hideReport: true,
        hide: true,
      })
      if (res && res.success) {
        wx.showToast({
          title: '上报成功',
        })
      } else {
        wx.showToast({
          title: res.text,
          duration: 1000
        })
      }
    })	
  },


  //运单详情
  toInfo: function (e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../enterInfo/enterInfo?id=' + id
    })
  },


  //进仓上报
  toReport: function (e) {
    const index = e.currentTarget.dataset.index
    // const id = e.currentTarget.dataset.id
    const selectOrder = this.data.orders[index]

    this.setData({
      selectOrder,
      hideReport: false,
      hide: false,
    })
  },

  //回单上传
  changeReceipt: function (e) {
    var _this = this // 不能直接用this，留坑
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'], // 指定是原图还是压缩图
      sourceType: ['album', 'camera'], // 指定来源是相册还是相机
      success: function (res) {
        var tempFilePaths = res.tempFilePaths; //可以作为img标签的src属性显示图片
        _this.setData({
          receiptPic: tempFilePaths
        });
      }
    })
  },


  //关闭弹窗
  hide: function (e) {
    this.setData({
      hide: true,
      hideReport: true,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getOrder()
    this.getLocation()
  },

  getLocation: function () {
    let latitude = this.data.latitude
    let longitude = this.data.longitude
    if (!latitude) {
      wx.getLocation({
        type: 'wgs84',//默认为 wgs84 返回 gps 坐标，gcj02 返回可用于wx.openLocation的坐标
        success: res => {
          console.log(res)
          latitude = res.latitude
          longitude = res.longitude
          this.setData({
            latitude,
            longitude
          })
        },
        fail: res => {
          this.setData({
            getlocation: false
          })
          wx.showModal({
            title: '坐标异常',
            content: '获取用户当前坐标失败,可能无法进行上报操作',
          })
        }
      })
    }
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
// pages/suggest/suggest.js
const ajax = require('../../utils/ajax.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    suggest: "",
    abnormalType: ['功能建议', '产品缺陷'],
    indexType: 0,
    abnormalTitle: "请填写标题，15字以内",
    abnormalName: "请填写联系人",
    abnormalTel: "请填写联系方式",
  },

  suggest: function(e) {
    this.setData({
      suggest: e.detail.value
    })
  },

  //优先级
  bindTypeChange: function (e) {
    this.setData({
      indexType: e.detail.value
    })
  },

  //上传图片
  changePic: function (e) {
    var that = this // 不能直接用this，留坑
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;


        var imgs = that.data.imgs;

        for (var i = 0; i < tempFilePaths.length; i++) {
          if (imgs.length >= 4) {
            that.setData({
              imgs: imgs
            });
            return false;
          } else {
            imgs.push(tempFilePaths[i]);
          }
        }
        that.setData({
          imgs: imgs,
        });

      }
    })

  },


  // 删除图片
  deleteImg: function (e) {
    var imgs = this.data.imgs;
    var index = e.currentTarget.dataset.index;
    imgs.splice(index, 1);
    this.setData({
      imgs: imgs,
    });
  },


  commit: function() {
    const feedback_content = this.data.suggest
    wx.showLoading({
      title: '提交中...',
      mask: true
    })

    ajax.postApi('app/member/feedback', {
      feedback_content
    }, (err, res) => {
      wx.hideLoading()
      if (res && res.success) {
        wx.showToast({
          title: '提交成功',
          duration: 2000,
          success() {
            wx.navigateBack({
              delta: 1
            })
          }
        })
      }
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
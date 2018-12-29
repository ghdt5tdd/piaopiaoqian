// pages/workComment/workComment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    commentRadio: [{
      radio: "../../images/uncheck.png",
      name: "未解决"
    }, {
      radio: "../../images/check.png",
      name: "已解决"
    }],

    //评价星级
    commentStar: [{
        pic: '../../images/eva-on.png',
        index: '0',
        checked: false
      },
      {
        pic: '../../images/eva-on.png',
        index: '1',
        checked: false
      },
      {
        pic: '../../images/eva-on.png',
        index: '2',
        checked: false
      },
      {
        pic: '../../images/eva-on.png',
        index: '3',
        checked: false
      },
      {
        pic: '../../images/eva-on.png',
        index: '4',
        checked: true
      },
    ],
  },

  //是否解决
  selectRadio: function(e) {
    var commentRadio = this.data.commentRadio
    var index = e.currentTarget.dataset.index
    for (var i = 0; i < commentRadio.length; i++) {
      commentRadio[i].radio = "../../images/uncheck.png"
    }
    commentRadio[index].radio = "../../images/check.png"
    this.setData({
      commentRadio: commentRadio
    })
  },
  

  //评价星级选择
  changeEva: function (e) {
    var commentStar = this.data.commentStar;
    var checkIndex = e.currentTarget.dataset.index

    for (var i = 0; i < commentStar.length; i++) {
      if (i <= checkIndex) {
        commentStar[i].pic = "../../images/eva-on.png"
      } else {
        commentStar[i].pic = "../../images/eva-e.png"
      }
    }
    this.setData({
      commentStar: commentStar,
      starSelect: checkIndex,
    });
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
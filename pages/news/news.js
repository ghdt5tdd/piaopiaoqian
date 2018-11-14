// pages/news/news.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: "关于2018-02-10至2018-02-25期间停止所有物流商品配送说明",
    avatar: "../../images/logo-s.png",
    style: "通知",
    time: "2018-01-12",
    newsInfo: [{
      info: "春节马上就要来了!最开心的消息肯定就是要放假啦!说到放假就肯定离不开疯狂购物一波，但是要注意快递的放假时间，别等到快递都放假了再买",
      pic: "../../images/news-b.jpg"
    }, {
      info: "最后揽件时间：2月09日(腊月二十四)，年后2月25日(正月十一)开始正常工作。",
      pic: ""
    }],
    num: "2",
    newsComment: [{
      avatar: "../../images/friend1.png",
      name: "姜饼小A",
      time: "2018-01-25  15:32",
      info: "天啦噜，快递这么早就停运了啊，我还有很多东西想买呢，抓紧时间买买买。",
      reply: "小熊饼干",
      sum: "3",
      to: "toReply",
      icon: true,
    }, {
      avatar: "../../images/friend2.png",
      name: "尖叫的土拨鼠",
      time: "2018-01-25  15:32",
      info: "天啦噜，快递这么早就停运了啊，我还有很多东西想买呢，抓紧时间买买买。",
      reply: "ZXw72j",
      sum: "5",
      to: "toReply",
      icon: true,
    }],

    optItems: [{
      pic: "../../images/collect.png",
      num: "500",
      to: "collect"
    }, {
      pic: "../../images/comment.png",
      num: "24",
      to: ""
    }, {
      pic: "../../images/share.png",
      num: "",
      to: "share"
    }],
    setected: false,
    hide: true,
    hideComment: true,
    textComment: "我也说一句..."
  },

  //点赞
  zan: function(e) {
    var newsComment = this.data.newsComment
    var index = e.currentTarget.dataset.index
    var icon = newsComment[index].icon;
    newsComment[index].icon = !icon;

    this.setData({
      newsComment: newsComment,
    })
  },


  //评论或回复弹窗
  showComment: function(e) {
    var name = e.currentTarget.dataset.name
    if (name == undefined) {
      this.setData({
        hide: false,
        hideComment: false,
      })
    } else {
      this.setData({
        hide: false,
        hideComment: false,
        textComment: '回复' + name,
      })
    }

  },

  //关闭弹窗
  hide: function(e) {
    this.setData({
      hide: true,
      hideComment: true,
      textComment: '我也说一句...',
    })
  },


  //收藏
  collect: function(e) {
    var select = e.currentTarget.dataset.select
    var index = e.currentTarget.dataset.index
    var optItems = this.data.optItems
    if (select) {
      optItems[index].pic = '../../images/collect.png';
      //收藏数字也要变化，留给你
      this.setData({
        setected: false,
        optItems: optItems
      })
    } else {
      optItems[index].pic = '../../images/collect-r.png';
      //收藏数字也要变化，留给你
      this.setData({
        setected: true,
        optItems: optItems
      })
    }
  },


  //查看评论回复
  toReply: function(e) {
    wx.navigateTo({
      url: '../reply/reply?avatar=' + e.currentTarget.dataset.avatar + "&name=" + e.currentTarget.dataset.name + "&time=" + e.currentTarget.dataset.time + "&info=" + e.currentTarget.dataset.info + "&sum=" + e.currentTarget.dataset.sum
    })
  },

  //分享
  share: function(e) {

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
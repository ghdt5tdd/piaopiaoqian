// pages/news/news.js
const ajax = require('../../utils/ajax.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    commentPage: 1,
    commentPageSize: 10,
    newsId: '',
    newsInfo: {},
    newsComment: [],
    setected: false,
    hide: true,
    hideComment: true,
    textComment: "我也说一句...",
    commentContent: ''
  },

  //点赞
  zan: function(e) {
    const isZan = e.target.dataset.isZan
    if (isZan) {
      return;
    }
    const commentId = e.target.dataset.commentId
    const index = e.target.dataset.index
    const newsComment = this.data.newsComment
    const commentInfo = this.data.newsComment[index]
    if(commentId === '-1'){
      wx.showToast({
        title: '请刷新页面',
        duration: 1000
      })
      return;
    }
    ajax.postApi('app/member/newsCommentLikeHandler', {
      commentId
    }, (err, res) => {
      if (res && res.success) {
        commentInfo.isLiked = !commentInfo.isLiked
        newsComment[index] = commentInfo
        this.setData({
          newsComment
        })
      }
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
  commentNew: function() {
    const content = this.data.commentContent
    const newsId = this.data.newsId
    if (content === '') {
      wx.showToast({
        title: '请先填写评论内容',
        duration : 1000
      })
      return;
    }
    this.hide()
    wx.showLoading({
      title: '提交中...',
    })
    ajax.postApi('app/member/shopNewsComment', {
      newsId,
      content
    }, (err, res) => {
      wx.hideLoading()
      if (res && res.success) {
        const newsComment = this.data.newsComment
        const newsInfo = this.data.newsInfo
        const newComment = {
          head_img: app.globalData.memberInfo.head_img,
          isLiked: false,
          user_nickname: app.globalData.memberInfo.user_nickname,
          create_date: new Date(),
          content,
          id: '-1'
        }
        newsInfo.commentNum ++
        newsComment.unshift(newComment)
        
        this.setData({
          newsComment,
          newsInfo
        })
      }
    })	
  },

  writeComment:function(e) {
    this.setData({
      commentContent: e.detail.value
    })
  },

  //收藏
  collect: function(e) {
    const isLiked = e.currentTarget.dataset.isLiked
    const newsId = this.data.newsId
    if (isLiked) {
      return;
    }
    
    ajax.postApi('app/member/newsLikeHandler', {
      newsId
    }, (err, res) => {
      if (res && res.success) {
        const newsInfo = this.data.newsInfo
        newsInfo.isLiked = true
        newsInfo.likeNum ++
        this.setData({
          newsInfo
        })
      }
    })	

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

  lower:function(e) {
      const commentNum = this.data.newsInfo.commentNum
      let commentPage = this.data.commentPage
      const commentPageSize = this.data.commentPageSize
      if (commentNum > commentPage * commentPageSize) {
        wx.showLoading({
          title: '评论加载中...',
        })
        commentPage++
        this.setData({
          commentPage
        }, () => {
          this.getComments(this.data.newsId, () => {
            wx.hideLoading()
          })
        })
      }else {
        wx.showToast({
          title: '评论已加载完毕',
          duration: 1000
        })
      }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const newsId = options.id
    if(newsId === undefined || newsId === '') {
      wx.showToast({
        title:'没有新闻id!',
        duration: 1000,
        mask:true,
        success () {
          wx.navigateBack({
            delta: 1 
          })
        }
      })
    }else {
      this.setData({
        newsId
      })
      this.getNewsDetail(newsId)
      this.getComments(newsId)
    }
  },

  getNewsDetail: function (newsId) {
    ajax.getApi('app/member/getShopNewsDetail', {
      newsId
    }, (err, res) => {
      if (res && res.success) {
        this.setData({
          newsInfo: res.data
        })
      }
    })
  },
  getComments: function (newsId, callback) {
    ajax.getApi('app/member/getShopNewsCommentList', {
      newsId,
      page: this.data.commentPage,
      pageSize: this.data.commentPageSize
    }, (err, res) => {
      if (res && res.success) {
        const newsComment = this.data.newsComment
        Array.prototype.push.apply(newsComment, res.data);
        this.setData({
          newsComment
        })
      }
      if (callback) {
        callback()
      }
    })
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
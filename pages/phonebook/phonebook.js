// pages/phonebook/phonebook.js
const app = getApp()
const util = require('../../utils/util.js')
const ajax = require('../../utils/ajax.js')
Page({
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  //右侧字母定位
  bindAZ: function(e) { 
    var currentbookName = e.currentTarget.dataset.id
    var that = this;
    //放入A-Z的scrollTop参数
    if (that.data.scrollAZ == null) {
      wx.createSelectorQuery().selectAll('.book-item-A-Z').fields({
        dataset: true,
        size: true,
        rect: true
      }, function(res) {
        res.forEach(function(re) {
          if (currentbookName == re.dataset.bookname) {
            wx.pageScrollTo({
              scrollTop: re.top + that.data.scrollNow - 55.5,
              duration: 0
            })
          }
        })
      }).exec();
    } else {
      this.data.scrollAZ.forEach(function(re) {
        if (currentbookName == re.dataset.bookname) {
          wx.pageScrollTo({
            scrollTop: re.top + that.data.scrollNow - 55.5,
            duration: 0
          })
        }
      })
    }


  },
  //页面滚动
  onPageScroll: function(e) { // 获取滚动条当前位置
    this.setData({
      scrollNow: e.scrollTop
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  //关键字搜索
  bindSarchInput: function(e) {
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 0
    })

    var inputVal = e.detail.value;
    const filterBooks = this.data.bookResults.filter(item => {
      return item.name.indexOf(inputVal) !== -1
    })
    this.setData({
      filterBooks,
      searchClear: false,
      searchVal: inputVal
    })
  },

  //清除搜索
  searchClear: function(e) {
    this.setData({
      filterBooks: this.data.bookResults,
      searchClear: true,
      searchVal: ''
    })
  },


  //手指触摸动作开始 记录起点X坐标
  touchstart: function(e) {
    //开始触摸时 重置所有删除
    this.data.filterBooks.forEach(function(v, i) {
      if (v.isTouchMove) //只操作为true的
        v.isTouchMove = false;
    })
    this.setData({
      startX: e.changedTouches[0].clientX,
      startY: e.changedTouches[0].clientY,
      filterBooks: this.data.filterBooks
    })
  },

  //滑动事件处理
  touchmove: function(e) {
    var that = this,
      index = e.currentTarget.dataset.index, //当前索引
      startX = that.data.startX, //开始X坐标
      startY = that.data.startY, //开始Y坐标
      touchMoveX = e.changedTouches[0].clientX, //滑动变化坐标
      touchMoveY = e.changedTouches[0].clientY, //滑动变化坐标
      //获取滑动角度
      angle = that.angle({
        X: startX,
        Y: startY
      }, {
        X: touchMoveX,
        Y: touchMoveY
      });
    that.data.filterBooks.forEach(function(v, i) {
      v.isTouchMove = false
      //滑动超过30度角 return
      if (Math.abs(angle) > 30) return;
      if (i == index) {
        if (touchMoveX > startX) //右滑
          v.isTouchMove = false
        else //左滑
          v.isTouchMove = true
      }
    })
    //更新数据
    that.setData({
      filterBooks: that.data.filterBooks
    })
  },
  /**
   * 计算滑动角度
   * @param {Object} start 起点坐标
   * @param {Object} end 终点坐标
   */
  angle: function(start, end) {
    var _X = end.X - start.X,
      _Y = end.Y - start.Y
    //返回角度 /Math.atan()返回数字的反正切值
    return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
  },

  //右滑删除事件
  del: function(e) {
    const telbookId = e.target.dataset.id
    const now = util.getFormatDate()

    wx.showLoading({
      title: '请稍后...',
    })

    ajax.postApi('app/member/deleteTelbookById', {
      telbookId
    }, (err, res) => {
      wx.hideLoading()
      if (res && res.success) {
        wx.showToast({
          title: '删除成功',
          duration: 1000
        })
        const bookResults = this.data.bookResults
        let delIndex
        bookResults.forEach((item,index) => {
          if(item.id === telbookId) {
            delIndex = index
          }
        })
        bookResults.splice(delIndex, 1)

        const filterBooks = bookResults.filter(item => {
          return item.name.indexOf(this.data.searchVal) !== -1
        })


        this.setData({
          bookResults,
          filterBooks
        })

        wx.setStorageSync('telbooksInfo', {
          data: bookResults,
          expire: now
        })
      }else{
        wx.showToast({
          title: '删除失败',
          duration: 1000
        })
      }
    })	

  },


  //查看通讯录详情
  bookDetail: function(e) {
    const telbooksInfo = wx.getStorageSync('telbooksInfo')
    wx.showLoading({
      title: '获取中...',
    })
    const id = e.target.dataset.id
    ajax.getApi('app/member/getTelbookById', {
      id
    }, (err, res) => {
      wx.hideLoading()
      if (res && res.success) {
        this.setData({
          hide: false,
          hideBook: false,
        })
        this.setData({
          curBookDetail: res.data
        })
      }else {
        wx.showToast({
          title: '无法获取联系人详情',
          duration: 1000
        })
      }
    })	


  },


  //拨打电话
  bookTel: function (e) {
    wx.makePhoneCall({
      phoneNumber: this.data.curBookDetail.contact_way
    })
  },



  //关闭通讯录详情
  hide: function(e) {
    this.setData({
      hide: true,
      hideBook: true,
    })
  },


//新增通讯录
  bookAdd: function (e) {
    wx.navigateTo({
      url: '../phonebookAdd/phonebookAdd',
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    const now = util.getFormatDate()
    const telbooksInfo = wx.getStorageSync('telbooksInfo')
    if (telbooksInfo && telbooksInfo.expire === now) {
      this.setData({
        bookResults: telbooksInfo.data,
        filterBooks: mytelbooks
      })
    } else {
      ajax.getApi('app/member/getTelbook', {
        return_mode: '1'
      }, (err, res) => {
        if (res && res.success) {
          this.setData({
            bookResults: res.data,
            filterBooks: res.data
          })
          wx.setStorageSync('telbooksInfo', {
            data: res.data,
            expire: now
          })
        }
      })	
    }
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
    setTimeout(function() {
      wx.stopPullDownRefresh();
    }, 1000)

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

  },
  /**
   * 页面的初始数据，数据太长放在下方
   */
  data: {
    searchVal: '',
    hide: true,
    hideBook: true,
    curBookDetail: null,
    searchClear: true,
    scrollAZ: null,
    scrollNow: 0,
    bookResults: null,
    filterBooks: null,
    bookAZ: [{
      bookName: 'A'
    }, {
      bookName: 'B'
    }, {
      bookName: 'C'
    }, {
      bookName: 'D'
    }, {
      bookName: 'E'
    }, {
      bookName: 'F'
    }, {
      bookName: 'G'
    }, {
      bookName: 'H'
    }, {
      bookName: 'I'
    }, {
      bookName: 'J'
    }, {
      bookName: 'K'
    }, {
      bookName: 'L'
    }, {
      bookName: 'M'
    }, {
      bookName: 'N'
    }, {
      bookName: 'O'
    }, {
      bookName: 'P'
    }, {
      bookName: 'Q'
    }, {
      bookName: 'R'
    }, {
      bookName: 'S'
    }, {
      bookName: 'T'
    }, {
      bookName: 'U'
    }, {
      bookName: 'V'
    }, {
      bookName: 'W'
    }, {
      bookName: 'X'
    }, {
      bookName: 'Y'
    }, {
      bookName: 'Z'
    }, ],
    books: []
  }
})
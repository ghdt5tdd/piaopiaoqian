// pages/phonebook/phonebook.js
const app = getApp()

Page({
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    this.setData({
      bookResults: this.data.books
    })

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
    var bookResultsTemp = new Array()
    var books = this.data.books;

    if (inputVal == null || inputVal.trim() == '') {
      this.setData({
        bookResults: books
      })
      return;
    }

    for (var i = 0; i < books.length; i++) {
      if (books[i].bookName.indexOf(inputVal) == 0 || books[i].bookPY.indexOf(inputVal.toLowerCase()) == 0) {

        var ifHas = false;
        for (var j = 0; j < bookResultsTemp.length; j++) {
          if (bookResultsTemp[j] == books[i]) {
            ifHas = true;
            break;
          }
        }
        if (!ifHas) {
          bookResultsTemp.push(books[i]);
        }
      }
    }
    this.setData({
      bookResults: bookResultsTemp,
      searchClear: false
    })
  },

  //清除搜索
  searchClear: function(e) {
    this.setData({
      bookResults: this.data.books,
      searchClear: true,
      searchVal: ''
    })
  },


  //手指触摸动作开始 记录起点X坐标
  touchstart: function(e) {
    //开始触摸时 重置所有删除
    this.data.bookResults.forEach(function(v, i) {
      if (v.isTouchMove) //只操作为true的
        v.isTouchMove = false;
    })
    this.setData({
      startX: e.changedTouches[0].clientX,
      startY: e.changedTouches[0].clientY,
      bookResults: this.data.bookResults
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
    that.data.bookResults.forEach(function(v, i) {
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
      bookResults: that.data.bookResults
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
    this.data.bookResults.splice(e.currentTarget.dataset.index, 1)
    this.setData({
      bookResults: this.data.bookResults
    })
  },


  //查看通讯录详情
  bookDetail: function(e) {
    this.setData({
      hide: false,
      hideBook: false,
      bookLogo: "../../images/company.png",
      bookName: "温州山鹰物流公司",
      bookContact: "李程",
      bookTel: "13584904645",
      bookSpec: [{
        label: "卡号",
        note: "42030216372893085",
      }, {
          label: "地址",
          note: "浙江省温州市鹿城广场",
      }, {
          label: "备注",
          note: "常用联系人",
      }]
    })
  },


  //拨打电话
  bookTel: function (e) {
    wx.makePhoneCall({
      phoneNumber: this.data.bookTel
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
    searchClear: true,
    scrollAZ: null,
    scrollNow: 0,
    bookResults: null,
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
    books: [{
      bookName: 'A',
      bookPY: 'a'
    }, {
      bookName: '阿波罗物流公司',
      bookPY: 'abl'
    }, {
      bookName: '安康物流公司',
      bookPY: 'ak'
    }, {
      bookName: 'B',
      bookPY: 'b'
    }, {
      bookName: '白城物流公司',
      bookPY: 'bc'
    }, {
      bookName: '保定货物公司',
      bookPY: 'bd'
    }, {
      bookName: '北京物流公司',
      bookPY: 'bj'
    }, {
      bookName: 'C',
      bookPY: 'c'
    }, {
      bookName: '沧州货物公司',
      bookPY: 'cz'
    }, {
      bookName: '常德货物公司',
      bookPY: 'cd'
    }, {
      bookName: '长春万里货物公司',
      bookPY: 'ccwl'
    }, {
      bookName: '成都货物公司',
      bookPY: 'cd'
    }, {
      bookName: '重庆货物公司',
      bookPY: 'cq'
    }, {
      bookName: 'D',
      bookPY: 'd'
    }, {
      bookName: '大理航空公司',
      bookPY: 'dl'
    }, {
      bookName: '大连轮运公司',
      bookPY: 'dl'
    }, {
      bookName: '定远航空公司',
      bookPY: 'dy'
    }, {
      bookName: '东莞航空公司',
      bookPY: 'dg'
    }, {
      bookName: 'E',
      bookPY: 'e'
    }, {
      bookName: '俄罗斯国际货物公司',
      bookPY: 'els'
    }, {
      bookName: '峨眉货物公司',
      bookPY: 'em'
    }, {
      bookName: 'W',
      bookPY: 'w'
    }, {
      bookName: '温州山鹰物流公司',
      bookPY: 'wzsy'
    }, {
      bookName: '温州宇通货运公司',
      bookPY: 'wzyt'
    }, {
      bookName: 'X',
      bookPY: 'x'
    }, {
      bookName: '西安物流公司',
      bookPY: 'xa'
    }, {
      bookName: '襄阳货运公司',
      bookPY: 'xy'
    }, {
      bookName: '信阳货运公司',
      bookPY: 'xy'
    }, {
      bookName: 'Y',
      bookPY: 'y'
    }, {
      bookName: '延安货运公司',
      bookPY: 'ya'
    }, {
      bookName: '扬州百里货运公司',
      bookPY: 'yzbl'
    }, {
      bookName: '烟台批发公司',
      bookPY: 'yt'
    }, {
      bookName: '义乌批发公司',
      bookPY: 'yw'
    }, {
      bookName: '岳阳楼货运公司',
      bookPY: 'yyl'
    }, {
      bookName: 'Z',
      bookPY: 'z'
    }, {
      bookName: '张家界货运公司',
      bookPY: 'zjj'
    }, {
      bookName: '长沙货运公司',
      bookPY: 'zs'
    }, {
      bookName: '郑州物流公司',
      bookPY: 'zz'
    }, ]
  }
})
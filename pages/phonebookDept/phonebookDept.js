// pages/phonebookDept/phonebookDept.js
Page({

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
  bookTel: function(e) {
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


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    this.setData({
      bookResults: this.data.books
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
      bookName: '浙江物流'
    }, {
      bookName: '湖南物流'
    }, {
      bookName: '北京物流'
    }, {
      bookName: '航空物流'
    }, ],
    books: [{
      bookName: '浙江物流',
      bookPY: ''
    }, {
      bookName: '阿波罗物流公司',
      bookPY: 'abl'
    }, {
      bookName: '温州山鹰物流公司',
      bookPY: 'wzsy'
    }, {
      bookName: '温州宇通物流公司',
      bookPY: 'wzyt'
    }, {
      bookName: '湖南物流',
      bookPY: ''
    }, {
      bookName: '长春万里货运公司',
      bookPY: 'ccwl'
    }, {
      bookName: '岳阳楼货运公司',
      bookPY: 'yyl'
    }, {
      bookName: '张家界物流公司',
      bookPY: 'zjj'
    }, {
      bookName: '北京物流',
      bookPY: ''
    }, {
      bookName: '北京物流公司',
      bookPY: 'bj'
    }, {
      bookName: '常德货物公司',
      bookPY: 'cd'
    }, {
      bookName: '航空物流',
      bookPY: ''
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
      bookName: '俄罗斯国际航空公司',
      bookPY: 'els'
    }, ]
  }




})
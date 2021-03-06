// pages/addList/addList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    status: [{
      name: '寄件地址',
    }, {
      name: '收件地址',
    }],
    select: 0,
    hasList: true,
    addressList: [{
      name: "黄晓克",
      tel: "13355888988",
      province: "浙江省",
      city: "温州市",
      distric: "鹿城区",
      door: "黎明工业区36号楼505室",
      location: "浙江省温州市鹿城区黎明工业区36号楼505室",
      button: false,
    }, {
      name: "李思",
      tel: "1507128762",
      province: "湖北省",
      city: "武汉市",
      distric: "江夏区",
      door: "现代·光谷世贸中心A栋1907室-1908室",
      location: "湖北省武汉市江夏区现代·光谷世贸中心A栋1907室-1908室",
      button: true,
    }, {
      name: "张三",
      tel: "18633772639",
      province: "浙江省",
      city: "温州市",
      distric: "鹿城区",
      door: "黎明工业区36号楼505室",
      location: "浙江省温州市鹿城区黎明工业区36号楼505室",
      button: true,
    }, {
      name: "周武",
      tel: "1507128762",
      province: "湖北省",
      city: "武汉市",
      distric: "江夏区",
      door: "现代·光谷世贸中心A栋1907室-1908室",
      location: "湖北省武汉市江夏区现代·光谷世贸中心A栋1907室-1908室",
      button: true,
    }, ],
  },

  //选择地址
  select: function(e) {
    var index = e.currentTarget.dataset.index
    this.setData({
      select: index,
    })
  },


  //设为默认
  defaultSet: function(e) {
    var index = e.currentTarget.dataset.index
    var addressList = this.data.addressList
    var button = addressList[index].button;
    if (button == false) {
      addressList[index].button = !button;
    } else {
      for (var i = 0; i < addressList.length; i++) {
        addressList[i].button = true;
      }
      addressList[index].button = false;
    }

    this.setData({
      addressList: addressList
    })
  },


  //新增地址
  toCreate: function(e) {
    wx.navigateTo({
      url: '../addCreate/addCreate'
    })
  },

  //编辑地址
  toEdit: function(e) {
    wx.navigateTo({
      url: '../addEdit/addEdit?name=' + e.currentTarget.dataset.name + "&tel=" + e.currentTarget.dataset.tel + "&province=" + e.currentTarget.dataset.province + "&city=" + e.currentTarget.dataset.city + "&distric=" + e.currentTarget.dataset.distric + "&door=" + e.currentTarget.dataset.door + "&index=" + e.currentTarget.dataset.index
    })
  },


  //删除地址
  delete: function(e) {
    var addressList = this.data.addressList
    var index = e.currentTarget.dataset.index
    addressList.splice(index, 1);
    this.setData({
      addressList: addressList
    })
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
// pages/accountAdd/accountAdd.js
const ajax = require('../../utils/ajax.js')
const util = require('../../utils/util.js')
const storage = require('../../utils/storage.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatar: "../../images/avatar.png",
    open:true,
    sex: ['未知', '男', '女',],
    accountRoles: [{
      id: "unknow",
      role_code: "unknow",
      role_name: "未知"
    }],
    talent_type_id: '',
    talent_type_index: 0,
    sex_index: 0,
    age: "",
    email: "",
    address: "",
    employee_card_id: "",
    full_name: "",
    user_account: "",
    user_password: "",
    user_nickname: "",
    repassword: "", 
    head_img: "",
    phone: "",   
    remark: "",
    id:""
  },

  //上传头像
  changePic: function (e) {
    var that = this // 不能直接用this，留坑
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: res => {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        util.ImgPathToBase64(tempFilePaths[0], base64 => {
          const head_img = 'data:image/png;base64,' + base64
          this.setData({
            avatar: head_img,
            head_img,
          })
        })
      }
    })
  },

  //启用关闭账号
  set: function (e) {
    var open = this.data.open;
    this.setData({
      open: !open
    })
  },

  //选择性别
  bindSex: function (e) {
    this.setData({
      sex_index: e.detail.value
    })
  },

  //选择性别
  bindRole: function (e) {
    this.setData({
      talent_type_id: this.data.accountRoles[e.detail.value].id,
      talent_type_index: e.detail.value,
    })
  },


  bindinput: function (e) {
    const key = e.currentTarget.dataset.key
    this.setData({
      [key]: e.detail.value
    })
  },


  //确认
  formSubmit: function(e) {
    var warn = "";
    var flag = false;
    var myreg = /^(14[0-9]|13[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$$/;

    const full_name = this.data.full_name
    const user_account = this.data.user_account
    const user_password = this.data.user_password
    const user_nickname = this.data.user_nickname
    const repassword = this.data.repassword
    const phone = this.data.phone
    const remark = this.data.remark
    const id = this.data.id

    if (user_account === "") {
      warn = "请输入账号！";
    } else if (full_name == "") {
      warn = "请输入姓名！";
    } else if (phone == "") {
      warn = "请输入联系方式！";
    } else if (!myreg.test(phone)) {
      warn = "请输入正确的联系方式！";
    } else if (repassword != user_password) {
      warn = "两次密码不一致！";
    } else { 
      flag = true;
      wx.showLoading({
        title: '提交中...',
        mask: true
      })
      const param = {
        age: this.data.age,
        email: this.data.email,
        address: this.data.address,
        employee_card_id: this.data.employee_card_id,
        full_name: this.data.full_name,
        user_account: this.data.user_account,
        user_password: this.data.user_password,
        user_nickname: this.data.user_nickname,
        repassword: this.data.repassword,
        head_img: this.data.head_img,
        phone: this.data.phone,
        remark: this.data.remark
      }
      param.state = this.data.open? 1 : 0
      param.gender = this.data.sex_index  
      let api = 'app/member/createSubAccount'
      if (id) {
        param.id = id
        api = 'app/member/modifySubAccount'
      }
      ajax.postApi(api, {
        ...param
      }, (err, res) => {
        wx.hideLoading()
        if (res && res.success) {
          wx.showToast({
            title: '提交成功!',
          })
          wx.navigateBack({
            delta: 1
          })
        }
      })	
    }
    if (flag == false) {
      wx.showModal({
        title: '提示',
        content: warn
      })
    }
  },
  loadAccountRoles(cb){
    ajax.getApi('app/member/listPlatformAccountRoles', {
      type: 0
    }, (err, res) => {
      wx.hideLoading()
      if (res && res.success) {
        const data = res.data
        console.log(data)
        const accountRoles = this.data.accountRoles
        Array.prototype.push.apply(accountRoles, data);
        this.setData({
          accountRoles
        }, () => {
          cb()
        })
      } else {
        wx.showToast({
          title: '无法获取子账户详情',
          duration: 1000
        })
      }
    })
  },

  loadAccount(id) {
    wx.showLoading({
      title: '获取中...',
      mask: true
    })
    ajax.getApi('app/member/getSubAccount', {
      id
    }, (err, res) => {
      wx.hideLoading()
      if (res && res.success) {
        const data = res.data
        const accountRoles = this.data.accountRoles
        let talent_type_index = 0
        accountRoles.forEach((v,i) => {
          if (v.id === data.talent_type) {
            talent_type_index = i
          }
        })
        this.setData({
          id: data.id,
          user_nickname: data.user_nickname,
          user_account: data.user_account,
          full_name: data.full_name,
          phone: data.phone,
          avatar: data.head_img,
          remark: data.remark,
          address: data.address,
          age: data.age,
          email: data.email,
          sex_index: data.gender,
          talent_type_id: data.talent_type,
          talent_type_index,
          employee_card_id: data.employee_card_id,
          open: data.state == 1,
        })
      } else {
        wx.showToast({
          title: '无法获取子账户详情',
          duration: 1000
        })
      }
    })
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const unmodify = options.unmodify
    if (unmodify) {
      this.setData({
        unmodify
      })
    }
    this.loadAccountRoles(() => {
      const id = options.id
      if(id) {
        wx.setNavigationBarTitle({
          title: '修改子账户'
        })
        if (unmodify) {
          wx.setNavigationBarTitle({
            title: '查看子账户详情'
          })
        }
        this.loadAccount(id)
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
// components/ossImg.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    oSrc:{
      type: String,
      value: '',
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
   
  },

  /**
   * 组件的方法列表
   */
  methods: {
    tSrc : function () {
      return 'https://sping-cloud-fall.oss-cn-shanghai.aliyuncs.com/wlhn/' + oSrc
    }
  }
})

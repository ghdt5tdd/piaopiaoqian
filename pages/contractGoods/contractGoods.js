// pages/goods/goods.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopBanner: "../../images/banner.jpg",
    shopLogo: "../../images/logo1.jpg",
    shopName: "必胜客（曙光中商店）",
    shopStar: "star5",
    shopScore: "5.0",
    shopTaste: "4.9",
    shopPackage: "5.0",
    shopDelivery: "4.9",
    shopNum: "668",
    shopPay: "58",
    shopDistance: "1.1",
    shopTime: "36",
    curIndex: 0,
    types: [{
      name: "为你精选",
      num: 0
    }, {
      name: "进口原装",
      num: 0
    }, {
      name: "全球鲜果",
      num: 0
    }, {
      name: "甄选海鲜",
      num: 0
    }, {
      name: "特辑鲜肉",
      num: 0
    }, {
      name: "百元好货",
      num: 0
    }, {
      name: "甜品美酒",
      num: 0
    }, ],
    checkIndex: 0,
    items: [{
      title: "为你精选",
      child: [{
        pic: "../../images/goods1.jpg",
        name: "太阳谷牛排新鲜原切套餐牛扒家用进口整切加拿大眼肉西冷板腱牡蛎",
        code: "6903148516201",
        sale: "66",
        price: "229",
        num: 0,
        has: true,
        specs: [{
          label: "口味",
          select: 0,
          info: [{
            name: "咸味料包"
          }, {
            name: "甜味料包"
          }]
        }, {
          label: "包装",
          select: 0,
          info: [{
            name: "纸盒"
          }, {
            name: "纸袋"
          }]
        }]
      }, {
        pic: "../../images/goods2.jpg",
        name: "俄罗斯北极甜虾2L号刺身日料超大49-60头左右/1kg虾",
        code: "6903148516202",
        sale: "30",
        price: "158",
        num: 0
      }, {
        pic: "../../images/goods3.jpg",
        name: "王小二 泰国山竹新鲜 水果包邮当季批发进口热带山竹果应季特产 ",
        code: "6903148516203",
        sale: "27",
        price: "69.8",
        num: 0,
        has: true,
        specs: [{
          label: "包装",
          select: 0,
          info: [{
            name: "纸箱"
          }, {
            name: "网兜"
          }]
        }]
      }]
    }, {
      title: "进口原装",
      child: [{
        pic: "../../images/goods4.jpg",
        name: "阿根廷红虾l1大号2kg进口野生鲜活特大新鲜冷冻海鲜水产大虾4斤",
        code: "6903148524601",
        sale: "20",
        price: "179",
        num: 0
      }, {
        pic: "../../images/goods5.jpg",
        name: "tvi泰国进口丸子组合火锅食材龙虾球鱼豆腐鱼竹轮蟹肉甜不辣鱼丸 ",
        code: "6903148524602",
        sale: "56",
        price: "98",
        num: 0
      }, {
        pic: "../../images/goods6.jpg",
        name: "1KG装兰维乐ORAVIDA新西兰进口青口贝半壳原生态冷冻",
        code: "6903148524603",
        sale: "27",
        price: "69",
        num: 0
      }, {
        pic: "../../images/goods7.jpg",
        name: "冰岛大西洋真鳕鱼带皮中段共400g 鳕鱼片",
        code: "6903148524604",
        sale: "20",
        price: "139",
        num: 0
      }, {
        pic: "../../images/goods8.jpg",
        name: "挪威三文鱼 新鲜去骨带皮中段400g（大西洋鲑） ",
        code: "6903148524605",
        sale: "56",
        price: "128",
        num: 0
      }, ]
    }, {
      title: "全球鲜果",
      child: [{
        pic: "../../images/goods9.jpg",
        name: "烟台大樱桃车厘子2斤 新鲜当季水果山东美早批发包邮 ",
        code: "6903148530201",
        sale: "58",
        price: "108",
        num: 0
      }, {
        pic: "../../images/goods10.jpg",
        name: "泰国进口红毛丹带箱5斤 毛荔枝东南亚当季新鲜热带水果包邮",
        code: "6903148530202",
        sale: "68",
        price: "49.8",
        num: 0
      }, {
        pic: "../../images/goods11.jpg",
        name: "比利时Truval啤梨12只 进口水果新鲜梨 单果120g左右",
        code: "6903148530203",
        sale: "27",
        price: "38",
        num: 0
      }, {
        pic: "../../images/goods12.jpg",
        name: "南非进口西柚 新鲜水果红心果肉葡萄柚包邮 8个装单果重250-300g",
        code: "6903148530204",
        sale: "35",
        price: "59.8",
        num: 0
      }, {
        pic: "../../images/goods13.jpg",
        name: "墨西哥进口牛油果8个新鲜当季水果190-240g鳄梨整箱应季批发包邮 ",
        code: "6903148530205",
        sale: "48",
        price: "68.9",
        num: 0
      }, {
        pic: "../../images/goods14.jpg",
        name: "泰国黑金刚莲雾共3斤雾莲果新鲜水果 进口热带",
        code: "6903148530206",
        sale: "42",
        price: "59.8",
        num: 0
      }, {
        pic: "../../images/goods15.jpg",
        name: "泰国金枕头巴掌榴莲进口水果现摘现发带壳10斤新鲜孕妇水果包邮 ",
        code: "6903148530207",
        sale: "27",
        price: "218",
        num: 0
      }, ]
    }, {
      title: "甄选海鲜",
      child: [{
        pic: "../../images/goods16.jpg",
        name: "冰鲜三文鱼中段日料刺身拼盘新鲜生鱼片即食海鲜三文鱼肉",
        code: "6903148541701",
        sale: "120",
        price: "68",
        num: 0
      }, {
        pic: "../../images/goods17.jpg",
        name: "月亮湾 即食海参海生500g 美国进口野生海参鲜活海渗非刺参单只装",
        code: "6903148541702",
        sale: "67",
        price: "269",
        num: 0
      }, {
        pic: "../../images/goods18.jpg",
        name: "2500g包邮越南进口新鲜比龙利鱼柳好巴沙鱼",
        code: "6903148541703",
        sale: "82",
        price: "88",
        num: 0
      }, {
        pic: "../../images/goods19.jpg",
        name: "银鳕鱼新鲜宝宝辅食法国进口深海包邮鳕鱼片冷冻雪鱼鳕鱼排500g ",
        code: "6903148541704",
        sale: "24",
        price: "198",
        num: 0
      }, {
        pic: "../../images/goods20.jpg",
        name: "海鲜水产鲜活大虾基围虾鲜活青岛大虾厄瓜多尔白虾",
        code: "6903148541705",
        sale: "24",
        price: "108",
        num: 0
      }, {
        pic: "../../images/goods21.jpg",
        name: "韩国东远金枪鱼罐头进口吞拿鱼罐头原味即食海鲜鱼肉罐头食品10罐",
        code: "6903148541706",
        sale: "15",
        price: "94",
        num: 0
      }]
    }, {
      title: "特辑鲜肉",
      child: [{
        pic: "../../images/goods22.jpg",
        name: "小牛凯西澳洲原肉整切牛排套餐黑椒家用10片新鲜菲力儿童厚西冷 ",
        code: "6903148552101",
        sale: "64",
        price: "209",
        num: 0
      }, {
        pic: "../../images/goods23.jpg",
        name: "绝世澳洲家庭原肉整切牛排套餐团购黑椒10片儿童新鲜菲力西冷 ",
        code: "6903148552102",
        sale: "16",
        price: "189",
        num: 0
      }, {
        pic: "../../images/goods24.jpg",
        name: "太阳谷牛排新鲜澳洲板腱谷饲进口家庭整切原切牛排套餐牛肉6片",
        code: "6903148552103",
        sale: "98",
        price: "198",
        num: 0
      }]
    }, {
      title: "百元好货",
      child: [{
        pic: "../../images/goods25.jpg",
        name: "tvi泰国进口日式豆捞关东煮火锅食材鱼丸子龙虾球250g",
        code: "6903148567401",
        sale: "18",
        price: "29.9",
        num: 0
      }, {
        pic: "../../images/goods26.jpg",
        name: "澳洲进口原味牛肉肠早餐西餐食材热狗香肠烧烤肠500g",
        code: "6903148567402",
        sale: "84",
        price: "88",
        num: 0
      }, {
        pic: "../../images/goods27.jpg",
        name: "绝世澳洲家庭牛排套餐团购10片生鲜新鲜单片牛肉菲力西冷黑椒年货",
        code: "6903148567403",
        sale: "125",
        price: "99",
        num: 0
      }, {
        pic: "../../images/goods28.jpg",
        name: "澳洲新鲜雪花生牛肉筋头巴脑冷冻肉筋烧烤肉",
        code: "6903148567404",
        sale: "13",
        price: "68",
        num: 0
      }]
    }, {
      title: "美味甜品",
      child: [{
        pic: "../../images/goods29.jpg",
        name: "tiptop新西兰进口雪糕大桶装蜂窝焦糖冰激凌",
        code: "6903148579201",
        sale: "18",
        price: "198",
        num: 0
      }, {
        pic: "../../images/goods30.jpg",
        name: "哈根达斯冰淇淋比利时巧克力品脱单个装",
        code: "6903148579202",
        sale: "18",
        price: "80.9",
        num: 0
      }, {
        pic: "../../images/goods31.jpg",
        name: "玛琪摩尔进口冰淇淋桶装香草巧克力奥利奥朗姆酒冰激凌",
        code: "6903148579203",
        sale: "35",
        price: "188",
        num: 0
      }, {
        pic: "../../images/goods32.jpg",
        name: "日本进口 经典/巧克力/咖啡香草味组合冰淇淋套餐",
        code: "6903148579204",
        sale: "35",
        price: "139",
        num: 0
      }, {
        pic: "../../images/goods33.jpg",
        name: "新西兰深南冰淇淋冰激凌冰糕盒装冷饮 ",
        code: "6903148579205",
        sale: "35",
        price: "99",
        num: 0
      }, ]
    }, ],
    toView: "group0",
    totalNum: 0,
    totalPrice: 0,
    carts: [], //购物车弹窗
    hideShadow: true,
    cartHeight: 0,
    hideEnlarge: true, //放大商品
    hideSpecs: true, //选择规格
  },



  //左侧分类选择
  toRight: function(e) {
    var index = e.currentTarget.dataset.index
    this.setData({
      checkIndex: index,
      toView: 'group' + index,
    })
  },

  //右侧滚动
  onScroll(e) {
    // 如果是右侧的滚动 view
    if (e.currentTarget.id === 'right') {
      // 判断滚动的方向
      let top = e.detail.scrollTop
      this.dir = this.currentTop < top ? 'down' : 'up' //定义滚动方向上和下
      this.currentTop = top
      this.scrollTops = wx.getStorageSync('scrollTops') //取上边距数据

      // 判断当前滚动条所在区域，如果不在当前区域则进行跳转
      if (top > this.scrollTops[this.data.checkIndex + 1] &&
        this.dir == 'down' && this.data.checkIndex < this.data.types.length - 1) {
        var index = this.data.checkIndex + 1
        this.setData({
          checkIndex: index,
        })
      } else if (top < this.scrollTops[this.data.checkIndex] &&
        this.dir == 'up' && this.data.checkIndex > 0) {
        var index = this.data.checkIndex - 1
        this.setData({
          checkIndex: index,
        })
      }

    }
  },


  //商品放大查看
  enlarge: function(e) {
    var items = this.data.items
    var index = e.currentTarget.dataset.index
    var goodsindex = e.currentTarget.dataset.goodsindex

    this.setData({
      enlargePic: items[index].child[goodsindex].pic,
      enlargeName: items[index].child[goodsindex].name,
      enlargeSale: items[index].child[goodsindex].sale,
      enlargeCode: items[index].child[goodsindex].code,
      enlargePrice: items[index].child[goodsindex].price,
      hideShadow: false,
      hideEnlarge: false,
    })
  },

  //关闭放大弹窗
  hideEnlarge: function(e) {
    this.setData({
      hideShadow: true,
      hideEnlarge: true,
    })
  },

  /**商品加数量事件 */
  addCount(e) {
    var items = this.data.items
    var index = e.currentTarget.dataset.index //第几个分类
    var goodsindex = e.currentTarget.dataset.goodsindex //分类下第几个商品
    var num = items[index].child[goodsindex].num

    for (var a = 0; a < items.length; a++) {
      var child = items[a].child
      for (var b = 0; b < child.length; b++) {
        if (child[b].num != 0) {
          var nameF = child[b].name
          if (nameF != items[index].child[goodsindex].name) {
            var that = this
            wx.showModal({
              title: '提示',
              content: "换一个商品之前选择将清空",
              success(res) {
                if (res.confirm) {
                  child[b].num = 0
                  child[b].show = false
                  that.cartShake(); //购物车抖动动画               
                  that.typesSum(); //分类数量统计   
                  that.setData({
                    items: items,
                    carts: []
                  });
                  that.cartTotal(); //购物车商品总数
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            })
            return false
          }
        }
      }
    }

    var specs = e.currentTarget.dataset.specs //是否有规格
    var num = items[index].child[goodsindex].num

    //有规格的商品
    if (specs == true) {
      var specs = items[index].child[goodsindex].specs
      this.setData({
        specsPic: items[index].child[goodsindex].pic,
        specsName: items[index].child[goodsindex].name,
        specsPrice: items[index].child[goodsindex].price,
        specsItem: specs,
      });

      var specsOn = [] //默认规格
      let moName = ""
      var specsItem = this.data.specsItem
      for (var i = 0; i < specsItem.length; i++) {
        moName = specsItem[i].info[0].name
        var mo = {
          name: moName
        }
        specsOn.push(mo);
        specsItem[i].select = 0
      }

      this.setData({
        specsOn: specsOn,
        specsItem: specsItem,
        index: index,
        goodsindex: goodsindex,
        hideShadow: false,
        hideSpecs: false,
      });

      return false
    }


    num = num + 1;
    items[index].child[goodsindex].num = num;
    items[index].child[goodsindex].show = true

    //弹窗是否添加新商品
    var carts = this.data.carts
    for (var i = 0; i < carts.length; i++) {
      if (carts[i].name == items[index].child[goodsindex].name) {
        var same = i //是否添加已有商品，是则获取弹窗内已有商品下标
      }
    }

    if (same == undefined) {
      //添加到弹窗里面
      var jo = {
        name: items[index].child[goodsindex].name,
        code: items[index].child[goodsindex].code,
        price: items[index].child[goodsindex].price,
        num: num,
        pay: (items[index].child[goodsindex].price * num).toFixed(2),
        show: true,
      }
      carts.push(jo);
    } else {
      carts[same].num = num
      carts[same].pay = (carts[same].price * num).toFixed(2)
    }

    this.cartShake(); //购物车抖动动画
    this.cartTotal(); //购物车商品总数
    this.typesSum(); //分类数量统计

    this.setData({
      items: items,
      carts: carts
    });


  },

  /**规格选择*/
  selectSpecs: function(e) {
    var specsindex = e.currentTarget.dataset.specsindex
    var index = e.currentTarget.dataset.index
    var specsItem = this.data.specsItem
    var specsOn = this.data.specsOn
    specsItem[specsindex].select = index
    specsOn[specsindex].name = specsItem[specsindex].info[index].name

    this.setData({
      specsItem: specsItem,
      specsOn: specsOn
    });
  },

  /**添加规格商品*/
  addSpecs: function(e) {
    var index = e.currentTarget.dataset.item
    var goodsindex = e.currentTarget.dataset.good
    var spec = ''
    for (var j = 0; j < this.data.specsOn.length; j++) {
      spec += this.data.specsOn[j].name
    }

    //弹窗是否添加新商品
    var carts = this.data.carts
    var items = this.data.items
    var num = items[index].child[goodsindex].num
    num = num + 1;
    items[index].child[goodsindex].num = num;
    items[index].child[goodsindex].show = true

    for (var i = 0; i < carts.length; i++) {
      if (carts[i].name == items[index].child[goodsindex].name && carts[i].spec == spec) {
        var same = i //是否添加已有商品，是则获取弹窗内已有商品下标
      }
    }

    if (same == undefined && carts.length > 0) {
      for (var a = 0; a < items.length; a++) {
        var child = items[a].child
        for (var b = 0; b < child.length; b++) {
          var that = this
          wx.showModal({
            title: '提示',
            content: "换一个商品之前选择将清空",
            success(res) {
              if (res.confirm) {
                child[b].num = 0
                child[b].show = false
                that.cartShake(); //购物车抖动动画               
                that.typesSum(); //分类数量统计   
                that.setData({
                  items: items,
                  carts: [],
                  hideSpecs: true,
                  hideShadow: true,
                });
                that.cartTotal(); //购物车商品总数
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
          return false
        }
      }

    } else if (same == undefined && carts.length == 0) {
      //添加到弹窗里面
      var jo = {
        name: items[index].child[goodsindex].name,
        spec: spec,
        price: items[index].child[goodsindex].price,
        num: 1,
        pay: (items[index].child[goodsindex].price * num).toFixed(2),
        show: true,
      }
      carts.push(jo);
    } else {
      carts[same].num = num
      carts[same].pay = (carts[same].price * num).toFixed(2)
    }

    this.cartShake(); //购物车抖动动画
    this.cartTotal(); //购物车商品总数
    this.typesSum(); //分类数量统计

    this.setData({
      items: items,
      carts: carts,
      hideSpecs: true,
      hideShadow: true,
    });

  },


  /**商品减数量事件*/
  subtractCount(e) {
    var items = this.data.items
    var index = e.currentTarget.dataset.index //第几个分类
    var goodsindex = e.currentTarget.dataset.goodsindex //分类下第几个商品
    var specs = e.currentTarget.dataset.specs //是否有规格
    var num = items[index].child[goodsindex].num

    //有规格的商品
    if (specs == true) {

      wx.showToast({
        title: '多规格商品请从购物篮中删除！',
        icon: 'none',
        duration: 3000,
      })

      return false
    }


    if (num <= 1) {
      items[index].child[goodsindex].num = 0
      items[index].child[goodsindex].show = false
      //商品数量减至0弹窗中同时移除
      var carts = this.data.carts
      for (var i = 0; i < carts.length; i++) {
        if (carts[i].name == items[index].child[goodsindex].name) {
          var same = i
        }
      }
      carts.splice(same, 1)
    } else {
      num = num - 1;
      items[index].child[goodsindex].num = num;
      //弹窗中商品数量同步减少
      var carts = this.data.carts
      for (var i = 0; i < carts.length; i++) {
        if (carts[i].name == items[index].child[goodsindex].name) {
          carts[i].num = num
          carts[i].pay = (carts[i].price * num).toFixed(2)
        }
      }
    }

    this.cartShake(); //购物车抖动动画
    this.cartTotal(); //购物车商品总数
    this.typesSum(); //分类数量统计

    this.setData({
      items: items,
      carts: carts
    });

  },


  //打开弹窗
  showCart: function(e) {
    if (this.data.totalNum > 0) {
      this.cartHeight(); //购物车高度设置
      // 购物车打开动画
      this.animation = wx.createAnimation({
        duration: 300,
        timingFunction: 'ease-in-out',
      });
      var cartHeight = this.data.cartHeight
      this.animation.translateY(-cartHeight).step();
      this.setData({
        animation: this.animation.export(),
        hideShadow: false,
      });
    }
  },

  /**弹窗中商品加数量事件 */
  plusCount(e) {
    var carts = this.data.carts
    var index = e.currentTarget.dataset.index //弹窗中第几个商品
    var num = carts[index].num

    num = num + 1;
    carts[index].num = num;
    carts[index].show = true
    carts[index].pay = (carts[index].price * num).toFixed(2)


    //原商品数量增加
    var items = this.data.items
    for (var i = 0; i < items.length; i++) {
      var itemsgood = items[i].child
      for (var j = 0; j < itemsgood.length; j++) {
        if (itemsgood[j].name == carts[index].name) {
          var groupindex = i
          var sameindex = j
        }
      }
    }

    items[groupindex].child[sameindex].num = items[groupindex].child[sameindex].num + 1

    this.cartTotal(); //购物车商品总数
    this.typesSum(); //分类数量统计

    this.setData({
      carts: carts,
      items: items,
    });

  },


  /**弹窗中商品减数量事件 */
  minusCount(e) {
    var carts = this.data.carts
    var index = e.currentTarget.dataset.index //弹窗中第几个商品
    var num = carts[index].num

    //原商品数量减少
    var items = this.data.items
    for (var i = 0; i < items.length; i++) {
      var itemsgood = items[i].child
      for (var j = 0; j < itemsgood.length; j++) {
        if (itemsgood[j].name == carts[index].name) {
          var groupindex = i
          var sameindex = j
        }
      }
    }

    items[groupindex].child[sameindex].num = items[groupindex].child[sameindex].num - 1
    if (items[groupindex].child[sameindex].num == 0) {
      items[groupindex].child[sameindex].show = false
    }



    //弹窗商品数量
    if (num <= 1) {
      carts.splice(index, 1)
      //弹窗下移
      this.animation = wx.createAnimation({
        duration: 0,
        timingFunction: 'ease-in-out',
      });
      if (carts.length == 0) { //移除弹窗中最后一个商品触发关闭弹窗效果
        var deleteHeight = 0;
        this.setData({
          hideShadow: true
        });
      } else {
        var deleteHeight = 45 * (carts.length + 1) //移除弹窗商品需要弹窗下移量
      }

      this.animation.translateY(-deleteHeight).step();
      this.setData({
        animation: this.animation.export(),
      });

    } else {
      num = num - 1;
      carts[index].num = num;
      carts[index].pay = (carts[index].price * num).toFixed(2)

    }



    this.cartTotal(); //购物车商品总数
    this.typesSum(); //分类数量统计
    this.cartHeight(); //购物车高度设置

    this.setData({
      carts: carts,
      items: items,
    });

  },

  //清空
  empty() {
    var items = this.data.items
    for (var i = 0; i < items.length; i++) {
      var itemsgood = items[i].child
      for (var j = 0; j < itemsgood.length; j++) {
        itemsgood[j].num = 0
        itemsgood[j].show = false
      }
    }

    //弹窗下移
    this.animation = wx.createAnimation({
      duration: 0,
      timingFunction: 'ease-in-out',
    });
    this.animation.translateY(0).step();

    this.setData({
      animation: this.animation.export(),
      carts: [],
      items: items,
      hideShadow: true,
    });

    this.cartTotal(); //购物车商品总数
    this.typesSum(); //分类数量统计
    this.cartHeight(); //购物车高度设置

  },


  //是否清空
  modal: function(e) {
    var that = this
    wx.showModal({
      title: '',
      content: '确认本次选购所有商品',
      confirmText: '删除',
      success(res) {
        if (res.confirm) {
          that.empty()
        } else if (res.cancel) {}
      }
    })
  },

  //关闭弹窗
  hideCart: function(e) {
    // 购物车关闭动画
    this.animation = wx.createAnimation({
      duration: 300,
      timingFunction: 'ease-in-out',
    });
    var cartHeight = this.data.cartHeight
    this.animation.translateY(cartHeight).step();
    this.setData({
      animation: this.animation.export(),
      hideShadow: true,
      hideEnlarge: true,
      hideSpecs: true
    });
  },


  //购物车抖动动画
  cartShake() {
    var that = this
    setTimeout(function() {
      that.setData({
        scaleCart: true
      })
      setTimeout(function() { //购物车动画
        that.setData({
          scaleCart: false,
        })
      }, 200)
    }, 300)
  },

  //购物车数量金额计算
  cartTotal() {
    var carts = this.data.carts
    var cartnum = 0
    var cartprice = 0
    for (var i = 0; i < carts.length; i++) {
      cartnum += carts[i].num
      cartprice += carts[i].price * carts[i].num
    }
    if (cartnum == 0) {
      var hasCarts = false
    } else {
      var hasCarts = true
    }
    this.setData({
      totalNum: cartnum,
      totalPrice: cartprice.toFixed(2),
      hasCarts: hasCarts
    });
  },

  //购物车高度设置
  cartHeight() {
    if (this.data.carts.length > 5) {
      var scrollheight = 250
    } else {
      var scrollheight = this.data.carts.length * 50
    }
    var cartHeight = scrollheight + 40
    this.setData({
      scrollHeight: scrollheight,
      cartHeight: cartHeight
    });
  },



  //分类数量统计
  typesSum() {
    var types = this.data.types
    for (var i = 0; i < types.length; i++) {
      var items = this.data.items
      var itemsgood = items[i].child
      var goodsnum = 0
      for (var j = 0; j < itemsgood.length; j++) {
        goodsnum += itemsgood[j].num
      }
      types[i].num = goodsnum
    }
    this.setData({
      types: types
    });
  },

  //去结算页面
  toConfirm: function(e) {
    wx.navigateBack({ //返回
      delta: 1
    })
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2]; //上一个页面
    //直接调用上一个页面的setData()方法，把数据存到上一个页面中去


    prevPage.setData({ //货物名称、件数、包装等信息
      goodId: this.data.carts[0].code,
      goodName: this.data.carts[0].name,
      goodNum: this.data.totalPrice
    })

  },


  //评价标签选择
  selectTag: function(e) {
    var index = e.currentTarget.dataset.index
    this.setData({
      tagIndex: index,
    })
  },

  //放大预览营业资质
  aspect: function(e) {
    var array = [];
    var index = e.currentTarget.dataset.index
    var pic = this.data.shopLicence[index].pic
    array.push(pic)
    wx.previewImage({
      urls: array // 需要预览的图片http链接列表
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

    let query = wx.createSelectorQuery()
    var scrollTops = []

    query.select('#right').boundingClientRect(function(rect) {
      var ch = rect.top
      wx.setStorageSync('ch', ch) //高度差值,右侧滚动模块到顶部距离
    }).exec()

    for (let i = 0; i < this.data.types.length; i++) {
      var length = this.data.types.length
      query.select(`#group${i}`).boundingClientRect(function(rect) {
        var ch = wx.getStorageSync('ch')
        scrollTops[i] = rect.top - ch
        if (scrollTops.length == length) {
          wx.setStorageSync('scrollTops', scrollTops) //存上边距数据
        }
      }).exec()
    }
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
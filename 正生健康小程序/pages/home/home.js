// pages/home / home.js
var wxCharts = require('../../utils/wxcharts.js');
var app = getApp()
var rate = 0;
var canvasWidth = 0;
var canvasHeight = 0;
var areaChart = null;
var loginBool = 0;
var deviceHeight = false;
var imgeUrlAni = ""
var imgeUrlAni2 = ""
var imgeUrlAni1 = ""
// 获取数据的方法，具体怎么获取列表数据大家自行发挥
var GetList = function(that) {

  that.setData({
    arrayData: [{
        message: '分公司排行榜',
        imgurl: "../imgs/img01_05.png",
        id: 1
      }, {
        message: '服务中心排行榜',
        imgurl: "../imgs/img01_07.png",
        id: 2
      }, {
        message: '工作室排行榜',
        imgurl: "../imgs/img01_09.png",
        id: 3
      }, {
        message: '个人排行榜',
        imgurl: "../imgs/img01_11.png",
        id: 4
      }

    ]
  })
}

Page({

  /**
   * 页面的初始数据
   */
  data: {

    // 组件所需的参数
    nvabarData: {
      showCapsule: 1, //是否显示左上角图标
      title: '慧吃慧动100天', //导航栏 中间的标题
    },

    // 此页面 页面内容距最顶部的距离
    height: app.globalData.height * 2 + 40,
    show_centent: false,
    if_show: false,
    flag: true,
    radioCheckVal: 0,
    arrayData: [],
    userInfo: {},
    hasUserInfo: false,
    columnCanvasData: {
      canvasId: 'columnCanvas',
    },
    isDown: false,
    percent: 0,
    isDown1: false,
    percent1: 0,
    loginBool: 0,
    // banner
    imgUrls: [
      'http://7xnmrr.com1.z0.glb.clouddn.com/red.png',
      'http://7xnmrr.com1.z0.glb.clouddn.com/yellow.png',
      'http://7xnmrr.com1.z0.glb.clouddn.com/green.png'
    ],
    indicatorDots: true, //是否显示面板指示点
    autoplay: true, //是否自动切换
    interval: 1500, //自动切换时间间隔,3s
    duration: 1000, //  滑动动画时长1s
    display: '',
    display1: 'none',
    display2: 'block',
    integral1:"个人1 1000",
    integral2: "个人2 1000",
    integral3: "个人3 1000",
    company1: "无锡分公司1",
    company2: "无锡分公司2",
    company3: "无锡分公司3",
  


    // canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  touchHandler: function(e) {
    console.log(areaChart.getCurrentDataIndex(e));
    areaChart.showToolTip(e);
  },

  durationChange: function(e) {
    this.setData({
      duration: e.detail.value
    })
  },
  btn: function() {


  },
  radioCheckedChange: function(e) {
    console.log(e.detail.value)
    var that = this;

    this.setData({
      radioCheckVal: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */



  onLoad: function(e) {

    var windowWidth = 320;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }
    areaChart = new wxCharts({
      canvasId: 'areaCanvas',
      type: 'area',

      categories: ['杭州', '大连', '无锡'],
      animation: true,
      series: [{
        name: '总积分',
        data: [1114000, 111200, 12000, ],
        format: function(val) {
          return '' + val;
        }
      }],
      yAxis: {
        title: '',
        format: function(val) {
          return val;
        },
        min: 0,
        fontColor: '#666',
        gridColor: '#ec5d2a',
        titleFontColor: '#ec5d2a'
      },
      xAxis: {
        fontColor: '#ec5d2a',
        gridColor: '#666'
      },
      extra: {
        legendTextColor: '#ec5d2a'
      },
      width: windowWidth,
      height: 200
    });
    var that = this;
    if (e.id) {
      wx.showModal({
        title: "上传服务器",
        content: '来自' + e.id,
        showCancel: false,
      })
    }



  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {



  },
  // 动图实现方法
  animationFunc: function() {

    var animation = wx.createAnimation({
      duration: 1,
      timingFunction: 'ease',
    })
    this.animation = animation
    this.setData({
      animationData: animation.export()
    })
    var n = 0;
    var k = 0;
    var b = 0;
    var m = true;
    //连续动画需要添加定时器,所传参数每次+1就行
    setInterval(function() {
      b = b + 1;
      n = n + 1;
      k = k + 1;
      if (m) {
        this.setData({
          imgeUrlAni: "../imgs/gif1/" + n + ".jpg",
          imgeUrlAni1: "../imgs/gif2/" + k + ".png",
          imgeUrlAni2: "../imgs/gif3/" + b + ".png",

        })

        if (k > 6) {
          k = 0
        }
        if (n > 12) {
          n = 0
        }
        if (b > 4) {
          b = 0
        }
        m = !m;
      } else {
        m = !m;
      }
      this.setData({
        animationData: this.animation.export()
      })
    }.bind(this), 100)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    console.log("onShow")
    var that = this;
    that.animationFunc()
    that.slideupshowFun()
    GetList(that);
    // 逻辑判断用户是否登录，服务器返回排行榜前三名数据
    getApp().globalData.testid = 0


  },
  slideupshowFun: function() {
    var that = this;
    setTimeout(function() {
      app.show(that, 'slide1', 1)

    }.bind(this), 3000);
    wx.getSystemInfo({
      success: function(res) {
        setTimeout(function() {
          app.slideupshow(that, 'slide_up1', -res.windowHeight / 2.8, 1)

        }.bind(that), 200);
        setTimeout(function() {
          app.slideupshow(that, 'slide_up2', -res.windowHeight / 2.8, 1)
        }.bind(that), 400);
        setTimeout(function() {
          app.slideupshow(that, 'slide_up3', -res.windowHeight / 2.8, 1)
        }.bind(that), 600);
      },
    })
  },
  showview: function() {
    var that = this;
    this.setData({
      display: "block",
    })

  },
  hideview: function() {
    this.setData({
      display: "none",

    })
  },
  showfunc1: function () {
    var that = this;
    this.setData({
      display1: "block",
      display2: "none",
    })

  },
  backFunc: function () {
    this.setData({
      display1: "none",
      display2: "block",

    })
  },
  onReady: function() {


  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    var that = this
    app.show(that, 'slide1', 0)
    app.slideupshow(that, 'slide_up1', 200, 1)
    app.slideupshow(that, 'slide_up2', 200, 1)
    app.slideupshow(that, 'slide_up3', 300, 1)

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    var that = this;

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
  onShareAppMessage: function(res) {
    return {
      title: '慧吃慧动100天',
      // 分享时在路径后拼接参数，可拼接多个参数。 
      path: '/pages/share/share?id=13624249960',
      imageUrl: '../imgs/background1.png',
      success: function(res) {
        // 转发成功
        console.log("转发成功")
        wx.showToast({
          title: '转发成功',
          icon: 'success',
          duration: 2000,
        })
      },
      fail: function(res) { // 转发失败
        console.log("转发失败")
      }
    }
  },
  ToRankList: function(e) {
    console.log("id == " + e.currentTarget.id)
    wx.navigateTo({
      url: '../rankList/rankList?id=' + e.currentTarget.id
    })
  },
  ToRulesView: function(e) {


  },
  globalData: {
    userInfo: null,
    testid: 0
  },
  getUserInfo: function(e) {

    var that = this;
    if (getApp().globalData.testid != 1) {

      console.log("未登录")
      console.log('user的值是：' + getApp().globalData.testid)
      that.loginTrueOrFalse()

    } else {
      wx.showToast({
        title: '已经签到',
        icon: 'succes',
        duration: 1000,
        mask: true
      })
      console.log("已经登录")
      console.log('user的值是：' + getApp().globalData.testid)
    }

  },
  loginTrueOrFalse: function() {
    if (app.globalData.userInfo) {

      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
      wx.navigateTo({
        url: '../personal/personal'
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
          wx.navigateTo({
            url: '../personal/personal'
          })
        }
      })



    }
  },
  toPersonal: function(e) {


    console.log(e.target.id)

  },
  topfourbuttonaction: function(e) {
    console.log("顶部四个按钮点击排行榜" + e.target.id)
    wx.navigateTo({
      url: '../rankList/rankList?id=' + e.target.id
    })
  },
  show: function() {

    this.setData({
      flag: false
    })

  },
  //消失

  hide: function() {

    this.setData({
      flag: true
    })

  },
  paihangbang:function()
  {
    wx.navigateTo({
      url: '../rankList/rankList'
    })
  }
  ,
  backAction: function() {
    wx.navigateBack()
  },
  firstHome: function() {
    wx.navigateTo({
      url: '../home/home'
    })
  },
  mydataAction: function() {
    wx.navigateTo({
      url: '../my/myData'
    })
  },
  pensonalAction: function() {
    wx.navigateTo({
      url: '../personal/personal'
    })
  },
  //  网络申请
  httPrequest: function(type) {
    if (type == 0) {
      wx.showLoading({
        title: '加载中',
      })
    }
    wx.request({
      url: '',
      method: 'get',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {

      },
      fail: function() {

      },
      complete: function() {
        //关闭菊花
        if (type == 0) {
          wx.hideLoading()
        } else {
          wx.stopPullDownRefresh()
        }
      }

    })

  }


})
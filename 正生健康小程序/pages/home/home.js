// pages/home / home.js
var wxCharts = require('../../utils/wxcharts.js');
var app = getApp()
var rate = 0;
var canvasWidth = 0;
var canvasHeight = 0;
var areaChart = null;
var deviceHeight = false;
var imgeUrlAni = ""
var imgeUrlAni2 = ""
// 获取数据的方法，具体怎么获取列表数据大家自行发挥
var GetList = function (that) {

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
    imgeUrlAni: "../imgs/gif1/1.jpg",
    imgeUrlAni2: "../imgs/gif2/1.png",
    animationData: {},
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

    display: ''

    // canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  touchHandler: function (e) {
    console.log(areaChart.getCurrentDataIndex(e));
    areaChart.showToolTip(e);
  },

  durationChange: function (e) {
    this.setData({
      duration: e.detail.value
    })
  },
  btn: function () {


  },
  radioCheckedChange: function (e) {
    console.log(e.detail.value)
    var that = this;

    this.setData({
      radioCheckVal: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */



  onLoad: function (e) {


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
        data: [1114000, 111200, 12000,],
        format: function (val) {
          return '' + val.toFixed(2);
        }
      }],
      yAxis: {
        title: '',
        format: function (val) {
          return val.toFixed(2);
        },
        min: 0,
        fontColor: '#8085e9',
        gridColor: '#ec5d2a',
        titleFontColor: '#ec5d2a'
      },
      xAxis: {
        fontColor: '#ec5d2a',
        gridColor: '#7cb5ec'
      },
      extra: {
        legendTextColor: '#ec5d2a'
      },
      width: windowWidth,
      height: 200
    });



    var windowWidth = 320;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }


    var that = this;
    console.log("123456" + e.id)
    if (e.id) {
      wx.showModal({
        title: "上传服务器",
        content: '来自' + e.id,
        showCancel: false,
      })
    }

    // app.globalData.userInfo = e.detail.userInfo
    // this.setData({
    //   userInfo: e.detail.userInfo,
    //   hasUserInfo: true

    // })

    console.log(123456789)
    if (app.globalData.userInfo) {
      console.log(456)
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      console.log(456)
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
        }
      })
    }




  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log(123456789)


  },
  // 动图实现方法
  animationFunc:function()
  {
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
    var m = true;
    //连续动画需要添加定时器,所传参数每次+1就行
    setInterval(function () {
      n = n + 1;
      k = k + 1;
      console.log(k);
      if (m) {
        this.setData({
          imgeUrlAni: "../imgs/gif1/" + n + ".jpg",
          imgeUrlAni1: "../imgs/gif2/" + k + ".png",
        })
        if (k > 6) {
          k = 0
        }
        if (n > 12) {
          n = 0
        }
        m = !m;
      } else {
        m = !m;
      }
      this.setData({
        animationData: this.animation.export()
      })
    }.bind(this), 100)
  }
  ,
  
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

    
    var that = this;
    that.animationFunc()
    
    setTimeout(function () {
      app.show(that, 'slide1', 1)

    }.bind(this), 2000);

    wx.getSystemInfo({
      success: function (res) {

        console.log(res.windowHeight);
        setTimeout(function () {
          app.slideupshow(that, 'slide_up1', -res.windowHeight / 2.6, 1)

        }.bind(that), 200);
        setTimeout(function () {
          app.slideupshow(that, 'slide_up2', -res.windowHeight / 2.6, 1)
        }.bind(that), 400);
        setTimeout(function () {
          app.slideupshow(that, 'slide_up3', -res.windowHeight / 2.6, 1)
        }.bind(that), 600);
      },
    })

    //   
    //   GetList(that);

    //   setTimeout(function() {
    //     //要延时执行的代码
    //     that.startDown();
    //   }, 1000) //延迟)
    //   setTimeout(function() {
    //     //要延时执行的代码
    //     that.startDown1();
    //   }, 1500) //延迟)
    // },
    // startDown: function(e) {
    //   this.setData({
    //     isDown: true,
    //     percent: 2,
    //   })
    // },
    // startDown1: function(e) {
    //   this.setData({
    //     isDown1: true,
    //     percent1: 50,
    //   })
  },
  showview: function () {

    var that = this;
    this.setData({
      display: "block",


    })

  },
  hideview: function () {
    this.setData({
      display: "none",

    })
  },
  onReady: function () {

    // var context = wx.createContext();//创建并返回绘图上下文context对象。
    // context.beginPath();//开始一个新的路径
    // context.moveTo(50, 0);//路径的起点
    // context.lineTo(50, 150);//路径的起点
    // context.lineTo(350, 150);//路径的终点
    // context.stroke();//对当前路径进行描边
    // context.closePath();//关闭当前路径
    // wx.drawCanvas({//
    //   canvasId: 'canvasLine',//画布标识，对应的cavas-id
    //   actions: context.getActions()//导出context绘制的直线并显示到页面

    // });

  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    var that = this;

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    return {
      title: '慧吃慧动100天',
      // 分享时在路径后拼接参数，可拼接多个参数。 
      path: '/pages/home/home?id=13624249960',
      success: function (res) {
        // 转发成功
        console.log("转发成功")
        wx.showToast({
          title: '转发成功',
          icon: 'success',
          duration: 2000,
        })
      },
      fail: function (res) { // 转发失败
        console.log("转发失败")
      }
    }
  },
  ToRankList: function (e) {
    console.log("id == " + e.currentTarget.id)
    wx.navigateTo({
      url: '../rankList/rankList?id=' + e.currentTarget.id
    })
  },
  ToRulesView: function (e) {



  },
  getUserInfo: function (e) {


    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true

    })

  }

  ,
  toReport: function (e) {

    console.log(e.target.id)
    wx.navigateTo({
      url: '../report/report'
    })
  },
  show: function () {

    this.setData({
      flag: false
    })

  },
  //消失

  hide: function () {

    this.setData({
      flag: true
    })

  }



})
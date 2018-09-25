//index.js
//获取应用实例
var WxSearch = require('../../wxSearch/wxSearch.js')
const app = getApp()
var showAdverst = true
var showCamera = false
var showzhandui = false
var rate = 0;
var doubleColumnCanvasWidth = 0;
var doubleColumnCanvasHeight = 0;
var openidstring = ""
var GetTableVIewList = function (that) {

  that.setData({
    arrayTableData: [{
      message: '分公司排行榜',
      imgurl: "../imgs/img01_05.png",
      numberData: 16000,
      id: 1
    }, {
      message: '服务中心排行榜',
      imgurl: "../imgs/img01_07.png",
      numberData: 16000,
      id: 2
    }, {
      message: '工作室排行榜',
      imgurl: "../imgs/img01_09.png",
      numberData: 16000,
      id: 3
    }, {
      message: '个人排行榜',
      imgurl: "../imgs/img01_11.png",
      numberData: 16000,
      id: 4
    }

    ]
  })
}
var GetTableVIewList2 = function (that) {

  that.setData({

    arrayTableData: [{
      message: '服务在中心1排行榜',
      imgurl: "../imgs/img01_05.png",
      numberData: 17000,
      id: 1
    },
    {
      message: '服务在中心2排行榜',
      imgurl: "../imgs/img01_05.png",
      numberData: 17000,
      id: 2
    }, {
      message: '服务在中心3排行榜',
      imgurl: "../imgs/img01_05.png",
      numberData: 17000,
      id: 3
    }, {
      message: '服务在中心4排行榜',
      imgurl: "../imgs/img01_05.png",
      numberData: 17000,
      id: 4
    },
    {
      message: '服务在中心5排行榜',
      imgurl: "../imgs/img01_05.png",
      numberData: 17000,
      id: 4
    },
    {
      message: '服务在中心6排行榜',
      imgurl: "../imgs/img01_05.png",
      numberData: 17000,
      id: 4
    }

    ]
  })
}
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
  data: {
    dayNumber:1,
    allNumber:160000,
    allDay: 16,
    display1: 'none',
    display2: 'block',
    nvabarData: {
      showCapsule: 1, //是否显示左上角图标
      title: '慧吃慧动100天', //导航栏 中间的标题
    },

    // 此页面 页面内容距最顶部的距离
    height: app.globalData.height * 2 + 40,

    doubleColumnCanvasData: {
      canvasId: 'doubleColumn',
    },
    doubleColumnTitle: "总积分",
    doubleColumnUnit: [{
      color: "#13CE66",
      title: "展现量"
    },
    {
      color: "#FFA848",
      title: "点击率"
    },
    {
      color: "#FFA848",
      title: "点击率"
    }
    ],

    listData: [
      { "code": "我的工作室", "text": "10000" },
      { "code": "我的积分", "text": "9999" },
      { "code": "工作室积分", "text": "55555"},
      { "code": "服务中心积分", "text": "33333"},
      { "code": "分公司积分", "text": "44444" },
  
    ],
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    myCompanyName: "",
    myCompanyNumber: 0,

    myCenterName: "",
    myCenterNumber: 0,

    myStudionName: "",
    myStudioNumber: 0,

    myName: "",
    MyNUmber: 0,
    name: ""

  },
  //事件处理函数
  bindViewTap: function () {

  },
  onLoad: function (e) {
    var that = this
    //初始化的时候渲染wxSearchdata
    WxSearch.init(that, 43, ['weappdev', '小程序', 'wxParse', 'wxSearch', 'wxNotification']);
    WxSearch.initMindKeys(['weappdev.com', '微信小程序开发', '微信开发', '微信小程序']);
    this.zhuzhuangtu();
    this.setData({
      showAdverst: true,
      showCamera: false
    })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
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
        }
      })
    }
  },

  onShow: function (e) {
    var that = this;
    GetList(that);
    GetTableVIewList(that);
    that.MyData()
    that.MyPersional()
    that.MyListData('Branchrankings')
  },
  
  MyListData: function (name) {
    this.data.name = name
    const db = wx.cloud.database()
    // 查询当前用户所有的 counters
    console.log('[数据库] 签到成功===  ')
    db.collection(name).orderBy('number', 'desc').get({
      success: res => {
        this.setData({
          arrayTableData: res.data
        })

        console.log('[数据库] 签到成功===  ', res.data)

      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })

  },
  MyData: function () {
    const db = wx.cloud.database()
    // 查询当前用户所有的 counters
    console.log('[数据库] 签到成功===  ')
    db.collection('personal').get({
      success: res => {
        this.setData({
          dayNumber: res.data[0].day,
          allNumber: res.data[0].MyNumber,
          allDay: res.data[0].allDay,
          listData: [
            { "code": "我的工作室", "text": res.data[0].MyWorkRoom[1] },
            { "code": "我的积分", "text": res.data[0].MyNumber },
            { "code": "工作室积分", "text": res.data[0].MyWorkRoomNumber },
            { "code": "服务中心积分", "text": res.data[0].MyCenterNumber},
            { "code": "分公司积分", "text": res.data[0].MyCompanyNumber },

          ]

        })
        whetaher = res.data[0].whetaher
        qiandaoYes = res.data[0].whetaher
        console.log('[数据库] 签到成功===  ', res.data)
        
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })

    const _ = db.command
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        // 查询当前用户所有的 counters
        openidstring = res.result.openid
        
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
    })



  },
  panghangbang: function (e) {
    console.log(e.target.id)
    var that = this;
    if (e.target.id == 1) {
      that.MyListData('Branchrankings');
      const db = wx.cloud.database()
      // 查询当前用户所有的 counters
      db.collection('personal').get({
        success: res => {
          this.setData({
            myCompanyName: res.data[0].MyCompany[1],
            myCompanyNumber: res.data[0].MyCompanyNumber,

          })
          console.log(res.data)
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '查询记录失败'
          })
          console.error('[数据库] [查询记录] 失败：', err)
        }
      })
    }
    if (e.target.id == 2) {

      that.MyListData('ServiceCenterrankings');
      const db = wx.cloud.database()
      // 查询当前用户所有的 counters
      db.collection('personal').get({
        success: res => {
          this.setData({

            myCompanyName: res.data[0].MyCenter[1],
            myCompanyNumber: res.data[0].MyCenterNumber,

          })
          console.log(res.data)
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '查询记录失败'
          })
          console.error('[数据库] [查询记录] 失败：', err)
        }
      })
    }
    if (e.target.id == 3) {
      const db = wx.cloud.database()
      // 查询当前用户所有的 counters
      db.collection('personal').get({
        success: res => {
          this.setData({
            myCompanyName: res.data[0].MyWorkRoom[1],
            myCompanyNumber: res.data[0].MyWorkRoomNumber,
          })
          console.log(res.data)
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '查询记录失败'
          })
          console.error('[数据库] [查询记录] 失败：', err)
        }
      })
      that.MyListData('StudioRankings');
      this.setData({
        showzhandui: true,

      })

    }
    else {
      this.setData({
        showzhandui: false,

      })
    }
    if (e.target.id == 4) {
      const db = wx.cloud.database()
      // 查询当前用户所有的 counters
      db.collection('personal').get({
        success: res => {
          this.setData({
            myCompanyName: res.data[0].Name,
            myCompanyNumber: res.data[0].MyNumber

          })
          console.log(res.data)
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '查询记录失败'
          })
          console.error('[数据库] [查询记录] 失败：', err)
        }
      })
      that.MyListData('personal');
    }

  },
  MyPersional: function () {
    const db = wx.cloud.database()
    // 查询当前用户所有的 counters
    db.collection('personal').get({
      success: res => {
        this.setData({
          myCompanyName: res.data[0].MyCompany[1],
          myCompanyNumber: res.data[0].MyCompanyNumber,

        })
        console.log(res.data)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })
  },
  onShareAppMessage: function (res) {
    return {
      title: '慧吃慧动100天',
      // 分享时在路径后拼接参数，可拼接多个参数。 
      path: '/pages/home/home?id=' + openidstring,
      imageUrl: '../imgs/share.png',
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

  },
  
  zhuzhuangtu: function () {
    var imageWidth = wx.getSystemInfoSync().windowWidth
    rate = imageWidth / 750;
    var updateData = {};
    doubleColumnCanvasWidth = imageWidth - rate * 64;
    doubleColumnCanvasHeight = rate * 304 + rate * 20 + rate * 32 + rate * 24;
    var doubleColumnYMax = 0;
    var doubleColumnYMin = 0;
    updateData['doubleColumnCanvasData.canvasWidth'] = doubleColumnCanvasWidth;
    updateData['doubleColumnCanvasData.axisPadd'] = {
      left: rate * 10,
      top: rate * 20,
      right: rate * 10
    };
    updateData['doubleColumnCanvasData.axisMargin'] = {
      bottom: rate * 32,
      left: rate * 20,
      right: rate * 20
    };
    updateData['doubleColumnCanvasData.yAxis.fontSize'] = rate * 22;
    updateData['doubleColumnCanvasData.yAxis.fontColor'] = '#637280';
    updateData['doubleColumnCanvasData.yAxis.lineColor'] = '#DCE0E6';
    updateData['doubleColumnCanvasData.yAxis.lineWidth'] = rate * 2;
    updateData['doubleColumnCanvasData.yAxis.dataWidth'] = rate * 62;
    updateData['doubleColumnCanvasData.yAxis.isShow'] = true;
    updateData['doubleColumnCanvasData.yAxis.isDash'] = true;
    updateData['doubleColumnCanvasData.yAxis.minData'] = doubleColumnYMin;
    updateData['doubleColumnCanvasData.yAxis.maxData'] = doubleColumnYMax;
    updateData['doubleColumnCanvasData.yAxis.padd'] = rate * 304 / (doubleColumnYMax - doubleColumnYMin);

    updateData['doubleColumnCanvasData.xAxis.dataHeight'] = rate * 26;
    updateData['doubleColumnCanvasData.xAxis.fontSize'] = rate * 22;
    updateData['doubleColumnCanvasData.xAxis.fontColor'] = '#637280';
    updateData['doubleColumnCanvasData.xAxis.lineColor'] = '#DCE0E6';
    updateData['doubleColumnCanvasData.xAxis.lineWidth'] = rate * 2;
    updateData['doubleColumnCanvasData.xAxis.padd'] = rate * 132;
    updateData['doubleColumnCanvasData.xAxis.dataWidth'] = rate * 48;
    updateData['doubleColumnCanvasData.xAxis.leftOffset'] = rate * 48;


    updateData['doubleColumnCanvasData.canvasHeight'] = doubleColumnCanvasHeight;
    updateData['doubleColumnCanvasData.enableScroll'] = false;


    updateData['doubleColumnCanvasData.point'] = {
      bColor: "#FFA848",
      sClor: "#FFFFFF",
      size: rate * 4,
      isShow: true
    };
    updateData['doubleColumnCanvasData.touchDetail.width'] = rate * 144;
    updateData['doubleColumnCanvasData.touchDetail.height'] = rate * 149;
    updateData['doubleColumnCanvasData.touchDetail.fontSize'] = rate * 20;
    updateData['doubleColumnCanvasData.touchDetail.fontColor'] = '#ffffff';
    updateData['doubleColumnCanvasData.touchDetail.padd'] = rate * 12;
    updateData['doubleColumnCanvasData.touchDetail.bgColor'] = "#637280";
    updateData['doubleColumnCanvasData.touchDetail.lineSpacingExtra'] = rate * 12;
    let doubleCloumnRightYAxisData = [];
    let doubleCloumnRightYMax = 0;
    let doubleCloumnRightYMin = 0;
    let doubleCloumnRatio = 1;

    let doubleColumnSeries = {
      cloumnData: {
        data: [{
          axis: [{
            x: "搜索类",
            y: "100",
            columnStartColor: "#3DB2FF",
            columnEndColor: "#0077FF"
          },
          {
            x: "搜索类",
            y: "80",
            columnStartColor: "#2BE99F",
            columnEndColor: "#13CE66"
          }
            ,
          {
            x: "搜索类",
            y: "180",
            columnStartColor: "#2BE99F",
            columnEndColor: "#13CE66"
          }
          ],
          x: '搜索类',
          y: 100,
          title: "搜索类|展现量10000|点击量:1000|点击率:10%"
        },
        {
          axis: [{
            x: "资讯类",
            y: "930",
            columnStartColor: "#3DB2FF",
            columnEndColor: "#0077FF"
          },
          {
            x: "资讯类",
            y: "730",
            columnStartColor: "#2BE99F",
            columnEndColor: "#13CE66"
          }
          ],
          x: '资讯类',
          y: 930,
          title: "资讯类|展现量:10000|点击量:1000|点击率:10%"
        },
        {
          axis: [{
            x: "社交类",
            y: "430",
            columnStartColor: "#3DB2FF",
            columnEndColor: "#0077FF"
          },
          {
            x: "社交类",
            y: "530",
            columnStartColor: "#2BE99F",
            columnEndColor: "#13CE66"
          }
          ],
          x: '社交类',
          y: 430,
          title: "社交类|展现量:10000|点击量:1000|点击率:10%"
        },

        ],
        columnStartColor: "#2BE99F",
        columnEndColor: "#13CE66"
      }
    };
    let doubleColumnXAxisData = [{
      x: '搜索类',
      y: 0,
      title: "搜索类"
    },
    {
      x: '资讯类',
      y: 0,
      title: "资讯类"
    },
    {
      x: '社交类',
      y: 0,
      title: "社交类"
    },
    ];
    let doubleColumnYAxisData = [];
    doubleColumnYMax = 1000;
    doubleColumnYMin = 0;
    doubleColumnYMax = this.getYMax(doubleColumnYMax);
    doubleColumnYAxisData = this.getYAxiss(doubleColumnYMax);

    doubleCloumnRightYMax = this.getYMax(6.0 * 100);
    doubleCloumnRatio = doubleColumnYMax / doubleCloumnRightYMax;

    updateData['doubleColumnCanvasData.yAxis.minData'] = doubleColumnYMin;
    updateData['doubleColumnCanvasData.yAxis.maxData'] = doubleColumnYMax;
    updateData['doubleColumnCanvasData.series'] = doubleColumnSeries;
    updateData['doubleColumnCanvasData.xAxis.data'] = doubleColumnXAxisData;
    updateData['doubleColumnCanvasData.yAxis.data'] = doubleColumnYAxisData;
    updateData['doubleColumnCanvasData.yAxis.rightData'] = doubleCloumnRightYAxisData;
    updateData['doubleColumnCanvasData.yAxis.padd'] = rate * 304 / (doubleColumnYMax - doubleColumnYMin);
    this.setData(updateData);


  },
  /**
   * 获得y轴最大值
   * @param  {[type]} yMax 当前最大值
   * @return {[type]}      [description]
   */
  getYMax: function (yMax) {
    let maxInt = Math.floor(yMax);
    let maxLength = maxInt.toString().length;
    let interval = 0;
    if (maxInt == 0) {
      interval = 3 * Math.pow(10, 1);
    } else {
      if (maxLength > 3) {
        interval = 3 * Math.pow(10, maxLength - 2);
      } else {
        interval = 3 * Math.pow(10, maxLength - 1);
      }
    }

    let remainder = maxInt % interval;
    let conversionMax = ((maxInt - remainder) / interval + 1) * interval;
    return conversionMax;
  },

  /**
   * 获得y轴数组
   * @param  {[type]} yMax y轴最大值
   * @return {[type]}      [description]
   */
  getYAxiss: function (yMax) {
    let yAxisData = [];

    let avg = yMax / 3;

    let point = {};
    point.x = 0;
    point.y = 0;
    point.title = '0'
    yAxisData.push(point);

    let point1 = {};
    point1.x = 0;
    point1.y = Math.floor(avg);
    point1.title = Math.floor(avg);
    yAxisData.push(point1);

    let point2 = {};
    point2.x = 0;
    point2.y = Math.floor(avg) * 2;;
    point2.title = Math.floor(avg) * 2;
    yAxisData.push(point2);

    let point3 = {};
    point3.x = 0;
    point3.y = Math.floor(avg) * 3;
    point3.title = Math.floor(avg) * 3;
    yAxisData.push(point3);
    return yAxisData;
  }
  ,
  backAction: function () {
    wx.navigateBack()
  },
  firstHome: function () {
    wx.navigateTo({
      url: '../home/home'
    })
  }
  ,
  mydataAction: function () {
    wx.navigateTo({
      url: '../my/myData'
    })
  }
  ,
  pensonalAction: function () {
    wx.navigateTo({
      url: '../personal/personal'
    })
  }
  ,

  paihangbang: function () {
    wx.navigateTo({
      url: '../rankList/rankList'
    })
  },
  wxSearchFn: function (e) {
    var that = this
    const db = wx.cloud.database()
    // 查询当前用户所有的 counters
    db.collection(this.data.name).where({
      Name: that.data.wxSearchData.value

    }).get({
      success: res => {
        this.setData({
          arrayTableData: res.data
        })
        if (res.data.length == 0) {
          wx.showToast({
            icon: 'none',
            title: '查询数据为空，请检查查询条件'
          })
        }
        console.log('[数据库] 签到成功===  ', res.data)

      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })


  },
  wxSearchInput: function (e) {
    var that = this
    WxSearch.wxSearchInput(e, that);
    console.log("搜索框" + that.data.wxSearchData.value)
    if (that.data.wxSearchData.value == "") {
      console.log("无数据")
      that.MyListData(this.data.name)
    }

  },
  wxSerchFocus: function (e) {
    var that = this
    WxSearch.wxSearchFocus(e, that);
  },
  wxSearchBlur: function (e) {
    var that = this
    WxSearch.wxSearchBlur(e, that);
  },
  wxSearchKeyTap: function (e) {
    var that = this
    WxSearch.wxSearchKeyTap(e, that);
  },
  wxSearchDeleteKey: function (e) {
    var that = this
    WxSearch.wxSearchDeleteKey(e, that);
  },
  wxSearchDeleteAll: function (e) {
    var that = this;
    WxSearch.wxSearchDeleteAll(that);
  },
  wxSearchTap: function (e) {
    var that = this
    WxSearch.wxSearchHiddenPancel(that);
  }
  ,
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
  }


})
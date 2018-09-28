//获取应用实例
var WxSearch = require('../../wxSearch/wxSearch.js')
const app = getApp()
var showAdverst = true
var showCamera = false
var showzhandui = false
var rate = 0;
var arrayMydata = [];
var arrayMyCenter = [];
var arrayMyCompany = [];

var doubleColumnCanvasWidth = 0;
var doubleColumnCanvasHeight = 0;
var openidstring = ""

var workroomName = ""
var workroomNumber = 0
var centerNumber = 0
var companyNumber = 0
var shareOpenId =""
var timestamp =
  Date.parse(new Date());
//返回当前时间毫秒数
timestamp = timestamp / 1000;
//获取当前时间
var n = timestamp *
  1000;
var date = new Date(n);
//年
var Y =
  date.getFullYear();
//月
var M = (date.getMonth() +
  1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
//日
var D = date.getDate() <
  10 ? '0' + date.getDate() :
  date.getDate();

var GetTableVIewList = function(that) {

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
var GetTableVIewList2 = function(that) {

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
var GetList = function(that) {

  that.setData({
    arrayData1: [{
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
    dayNumber: 0,
    allNumber: 0,
    allDay: 0,
    arrayData: [],
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

    listData: [{
        "code": "我的工作室",
        "text": 0
      },
      {
        "code": "我的积分",
        "text": 0
      },
      {
        "code": "工作室积分",
        "text": 0
      },
      {
        "code": "服务中心积分",
        "text": 0
      },
      {
        "code": "分公司积分",
        "text": 0
      },

    ],
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    myCompanyName: "",
    Myimage: "",
    myCompanyNumber: 0,

    myCenterName: "",
    myCenterNumber: 0,

    myStudionName: "",
    myStudioNumber: 0,

    myName: "",
    MyNUmber: 0,
    name: "",
    showPersonal: false

  },
  //事件处理函数
  bindViewTap: function() {

  },
  onLoad: function(options) {
    shareOpenId = options.shareOpenId
   
    console.log("shareOpenId == " + shareOpenId.length)
    

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

  onShow: function(e) {
    var that = this;
    GetList(that);
    GetTableVIewList(that);
    that.MyData()
    that.MyListData('Branchrankings')
  },
  MyListData: function(name) {
    this.data.name = name
    const db = wx.cloud.database()
    db.collection(name).orderBy('number', 'desc').get({
      success: res => {
        this.setData({
          arrayTableData: res.data

        })
        console.log('[数据库] 签到成功===  ', res.data)
        arrayMydata = res.data;
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
      }
    })

  },
  MyData: function() {

    const db = wx.cloud.database()
    const _ = db.command
    console.log('[云] ')
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函]', res.result.openid)
        // 查询当前用户所有的 counters
        openidstring = res.result.openid
        this.MyPersional(openidstring)
        db.collection('personal').where({
          _openid: res.result.openid
        }).get({
          success: res => {

            this.setData({
              dayNumber: res.data[0].day,
              allNumber: res.data[0].MyNumber,
              allDay: res.data[0].allDay,
              listData: [{
                  "code": "我的工作室",
                  "text": res.data[0].MyWorkRoom[1]
                },
                {
                  "code": "我的积分",
                  "text": res.data[0].MyNumber
                },
                {
                  "code": "工作室积分",
                  "text": res.data[0].MyWorkRoomNumber
                },
                {
                  "code": "服务中心积分",
                  "text": res.data[0].MyCenterNumber
                },
                {
                  "code": "分公司积分",
                  "text": res.data[0].MyCompanyNumber
                },

              ],
              arrayData: res.data[0].imageArray
            })
            console.log('[数据库] res.data[0].imageArray ：', res.data[0].imageArray)
            whetaher = res.data[0].whetaher
            qiandaoYes = res.data[0].whetaher
            myCompanyId = res.data[0].MyCompany[0]
            myCenterId = res.data[0].MyCenter[0]
            myStudioId = res.data[0].MyWorkRoom[0]
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
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
    })

  },

  addTeam: function(e) {
    const db = wx.cloud.database()
    const _ = db.command
    db.collection('personal').where({
      _openid: openidstring
    }).get({
      success: res => {
        console.log(res.data)
        if (res.data[0] != null) {
          wx.showToast({
            title: '不能重复加入战队',
            icon: 'succes',
            duration: 1000,
            mask: true
          })
        } else {

          var workroom = []

          if (arrayMydata.length > 1) {

            workroom = [arrayMydata[e.target.id]._id, arrayMydata[e.target.id].Name]
            this.searchCenter(arrayMydata[e.target.id].centerID, workroom)
            workroomName = arrayMydata[e.target.id].Name
            workroomNumber = arrayMydata[e.target.id].number

            console.log("工作室 == " + arrayMydata[e.target.id].number)

          } else {
            workroom = [arrayMydata[0]._id, arrayMydata[0].Name]
            this.searchCenter(arrayMydata[0].centerID, workroom)
            workroomName = arrayMydata[0].Name
            workroomNumber = arrayMydata[0].number
            console.log("工作室 == " + arrayMydata[e.target.id].number)
          }

        }

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
  searchCenter: function(centerid, workroom) {
    var myCenterArray = [];
    var that = this
    const db = wx.cloud.database()
    // 查询当前用户所有的 counters
    db.collection("ServiceCenterrankings").where({
      _id: centerid

    }).get({
      success: res => {
        myCenterArray = [res.data[0]._id, res.data[0].Name]
        console.log("中心 == " + res.data[0].number)
        centerNumber = res.data[0].number

        this.myCompanyData(res.data[0].companyID, workroom, myCenterArray)
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
  myCompanyData: function(companyID, workroom, centerArray) {
    var that = this
    const db = wx.cloud.database()
    var myCompanyArray = [];

    // 查询当前用户所有的 counters
    db.collection("Branchrankings").where({
      _id: companyID

    }).get({
      success: res => {

        myCompanyArray = [res.data[0]._id, res.data[0].Name]
        console.log("公司 == " + res.data[0].number)
        companyNumber = res.data[0].number
        this.addPensonal(workroom, centerArray, myCompanyArray)
        if (res.data.length == 0) {
          wx.showToast({
            icon: 'none',
            title: '查询数据为空，请检查查询条件'
          })
        }
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
  addPensonal: function(workroom, centerArray, myCompanyArray) {
    wx.showToast({
      title: '加入中',
      icon: 'loading',
      duration: 10000
    })
    var enddate = Y + "-" + M + "-" + D
    console.log("res", workroom, centerArray, myCompanyArray, workroomName, workroomNumber, centerNumber, companyNumber, enddate)
    var numberdata = 0
    const db = wx.cloud.database()
    db.collection('personal').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        MyCompanyNumber: companyNumber,
        MyNumber: 0,
        MyCenterNumber: centerNumber,
        MyWorkRoom: workroom,
        MyCompany: myCompanyArray,
        MyCenter: centerArray,
        MyWorkRoomNumber: workroomNumber,
        Name: app.globalData.userInfo.nickName,
        allDay: 0,
        day: 0,
        image: app.globalData.userInfo.avatarUrl,
        myStudio: [workroomName,
          numberdata,
          workroomNumber,
          centerNumber,
          companyNumber
        ],
        imageArray:[],
        number: 0,
        time: enddate,
        whetaher: 0
      },
      success: function(res) {
        // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
       
        wx.showToast({
          title: '加入战队成功',
          icon: 'success',
          duration: 2000,
        })
        if (shareOpenId.length  == 0)
        {
          wx.navigateTo({
            url: '../home/home'
          })
          console.log("不是分享")
        }
        else
        {
          console.log("是分享") 
          this.jifeng(shareOpenId)
        }
       

      },
      fail: console.error
    })

  },
  jifeng: function (shareid) {
    const db = wx.cloud.database()
    const _ = db.command
    db.collection('personal').doc(shareid).update({
      // data 传入需要局部更新的数据
      data: {
        MyCenterNumber: _.inc(5),
        MyCompanyNumber: _.inc(5),
        MyWorkRoomNumber: _.inc(5),
        MyNumber: _.inc(5),
        number: _.inc(5),

      }

    }).then
    {
      console.log("分享增加积分")
      that.MyBranchrankings()
      that.MyServiceCenterrankings()
      that.MyStudioRankings()
      wx.navigateTo({
        url: '../home/home'
      })
    }
  },
  MyBranchrankings: function () {
    var that = this
    const db = wx.cloud.database()
    const _ = db.command
    db.collection('Branchrankings').doc(myCompanyId).update({
      // data 传入需要局部更新的数据
      data: {
        // 表示将 done 字段置为 true
        number: _.inc(5),
      },
      success: function (res) {
        console.log(res.data)
      }
    })
  },
  MyServiceCenterrankings: function () {
    var that = this
    console.log("myCenterId === " + myCenterId)
    const db = wx.cloud.database()
    const _ = db.command
    db.collection('ServiceCenterrankings').doc(myCenterId).update({
      // data 传入需要局部更新的数据
      data: {
        number: _.inc(5),
      },
      success: function (res) {
        console.log("MyServiceCenterrankings === " + res.data)
      }
    })

  },
  MyStudioRankings: function () {
    var that = this
    const db = wx.cloud.database()
    const _ = db.command
    db.collection('StudioRankings').doc(myStudioId).update({
      // data 传入需要局部更新的数据
      data: {
        // 表示将 done 字段置为 true
        number: _.inc(5),
      },
      success: function (res) {
        console.log(res.data)
      }
    })
  },
  panghangbang: function(e) {
    console.log(e.target.id)
    var that = this;
    if (e.target.id == 1) {
      that.MyListData('Branchrankings');
      const db = wx.cloud.database()
      // 查询当前用户所有的 counters
      db.collection('personal').where({
        _openid: openidstring
      }).get({
        success: res => {
          this.setData({
            myCompanyName: res.data[0].MyCompany[1],
            myCompanyNumber: res.data[0].MyCompanyNumber,
            Myimage: res.data[0].image

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
      db.collection('personal').where({
        _openid: openidstring
      }).get({
        success: res => {
          this.setData({

            myCompanyName: res.data[0].MyCenter[1],
            myCompanyNumber: res.data[0].MyCenterNumber,
            Myimage: res.data[0].image

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
      db.collection('personal').where({
        _openid: openidstring
      }).get({
        success: res => {
          this.setData({
            myCompanyName: res.data[0].MyWorkRoom[1],
            myCompanyNumber: res.data[0].MyWorkRoomNumber,
            Myimage: res.data[0].image
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

    } else {
      this.setData({
        showzhandui: false,

      })
    }
    if (e.target.id == 4) {
      const db = wx.cloud.database()
      // 查询当前用户所有的 counters
      db.collection('personal').where({
        _openid: openidstring
      }).get({
        success: res => {
          this.setData({
            myCompanyName: res.data[0].Name,
            myCompanyNumber: res.data[0].MyNumber,
            Myimage: res.data[0].image

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
  MyPersional: function(openidstr) {
    const db = wx.cloud.database()
    // 查询当前用户所有的 counters
    db.collection('personal').where({
      _openid: openidstr
    }).get({
      success: res => {
        this.setData({
          myCompanyName: res.data[0].MyCompany[1],
          myCompanyNumber: res.data[0].MyCompanyNumber,
          Myimage: res.data[0].image,
          showPersonal: true

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
  onShareAppMessage: function(res) {
    return {
      title: '慧吃慧动100天',
      // 分享时在路径后拼接参数，可拼接多个参数。 
      path: '/pages/home/home?id=' + openidstring,
      imageUrl: '../imgs/share.png',
      success: function(res) {
        // 转发成功
        console.log("转发成功" + openidstring)
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

  zhuzhuangtu: function() {
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
              },
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
  getYMax: function(yMax) {
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
  getYAxiss: function(yMax) {
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
  },
  backAction: function() {
    wx.navigateBack()
  },
  firstHome: function() {
    wx.navigateTo({
      url: '../home/home'
    })
  },
  mydataAction: function() {

    const db = wx.cloud.database()
    const _ = db.command
    db.collection('personal').where({
      _openid: openidstring
    }).get({
      success: res => {
        if (res.data[0] != null) {
          wx.navigateTo({
            url: '../my/myData'
          })
        } else {
          wx.showToast({
            icon: 'none',
            title: '尚未加入战队'
          })

        }

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
  pensonalAction: function() {
    const db = wx.cloud.database()
    const _ = db.command
    db.collection('personal').where({
      _openid: openidstring
    }).get({
      success: res => {
        if (res.data[0] != null) {
          wx.navigateTo({
            url: '../personal/personal'
          })
        } else {
          wx.showToast({
            icon: 'none',
            title: '尚未加入战队'
          })

        }
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

  paihangbang: function() {
    wx.navigateTo({
      url: '../rankList/rankList'
    })
  },
  wxSearchFn: function(e) {
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
        arrayMydata = res.data
        if (res.data.length == 0) {
          wx.showToast({
            icon: 'none',
            title: '查询数据为空，请检查查询条件'
          })
        }

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
  wxSearchInput: function(e) {
    var that = this
    WxSearch.wxSearchInput(e, that);
    console.log("搜索框" + that.data.wxSearchData.value)
    if (that.data.wxSearchData.value == "") {
      console.log("无数据")
      that.MyListData(this.data.name)
    }

  },
  wxSerchFocus: function(e) {
    var that = this
    WxSearch.wxSearchFocus(e, that);
  },
  wxSearchBlur: function(e) {
    var that = this
    WxSearch.wxSearchBlur(e, that);
  },
  wxSearchKeyTap: function(e) {
    var that = this
    WxSearch.wxSearchKeyTap(e, that);
  },
  wxSearchDeleteKey: function(e) {
    var that = this
    WxSearch.wxSearchDeleteKey(e, that);
  },
  wxSearchDeleteAll: function(e) {
    var that = this;
    WxSearch.wxSearchDeleteAll(that);
  },
  wxSearchTap: function(e) {
    var that = this
    WxSearch.wxSearchHiddenPancel(that);
  },
  showfunc1: function() {
    var that = this;
    this.setData({
      display1: "block",
      display2: "none",
    })

  },
  backFunc: function() {
    this.setData({
      display1: "none",
      display2: "block",

    })
  }


})
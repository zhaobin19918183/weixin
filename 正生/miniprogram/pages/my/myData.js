//获取应用实例
var WxSearch = require('../../wxSearch/wxSearch.js')
const app = getApp()
var showAdverst = true
var showCamera = false
var showzhandui = false
var shareNumberWx = 0
var rate = 0;
var arrayMydata = [];
var arrayMyCenter = [];
var arrayMyCompany = [];
var mytimeString =""
var doubleColumnCanvasWidth = 0;
var doubleColumnCanvasHeight = 0;
var openidstring = ""
var tagValue = 1
var workroomName = ""
var workroomNumber = 0
var centerNumber = 0
var companyNumber = 0
var shareOpenIdString =""
var arrayTableDataWork = []
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
    arrayTableDataWork: [],
    arrayTableDataCenter: [],
    arrayTableDataCompany: [],
    arrayTableDataPersion: [],
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
    showPersonal: false,
    buttonshow:true,
    searchString: "请输入分公司全称进行搜索",
    btuBottom:"90px"
  },
  //事件处理函数
  bindViewTap: function() {

  },
  onLoad: function(options)
   {
    // wx.hideShareMenu()
    shareOpenIdString = options.openidstring
    openidstring = options.openidstring
    this.phb1(1)
    tagValue = 1
    var that = this
    //初始化的时候渲染wxSearchdata
    WxSearch.init(that, 43, ['weappdev', '小程序', 'wxParse', 'wxSearch', 'wxNotification']);
    WxSearch.initMindKeys(['weappdev.com', '微信小程序开发', '微信开发', '微信小程序']);
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
    wx.getSystemInfo({
      success: function (res) {
        //model中包含着设备信息
        console.log(res.model)
        var model = res.model
        if (model.search('iPhone X') != -1) {
          that.setData({
            btuBottom: "90px"
          })
        } else {
          that.setData({
            btuBottom: "60px",
          })
        }
        if (model.search('iPad') != -1) {
          console.log("iPad Pro 10.5-inch ===ffff= ")
        }
      }
    })
    

  },

  onShow: function(e) {
    var that = this;
    GetList(that);
    GetTableVIewList(that);
    that.MyData()
  },
  MyData: function() {
    wx.showToast({
      title: '数据载入中....... ',
      icon: 'loading',
      duration: 2000,
    })
    console.log("shareOpenIdString +===" + openidstring)
    app.postAction('https://hchd.zeacen.com/zeacen/wechatapplet/myInfo', {
      "openId": openidstring,
    }).then((res) => {
     
      console.log("res.data.imageArray图片 == =" + res.data)
      if (res.data.memberInfo.joinDate!=null)
      {
        
        this.setData({
          arrayData: res.data.imageArray,
          dayNumber: res.data.memberInfo.joinDate,
          allNumber: res.data.memberInfo.totalIntegral,
          allDay: res.data.memberInfo.continuitySigninDate,
          listData: [{
            "code": "我的工作室",
            "text": res.data.myStudio.studioName
          },
          {
            "code": "我的积分",
            "text": res.data.myStudio.totalIntegral,
          },
          {
            "code": "工作室积分",
            "text": res.data.myStudio.studioIntegral
          },
          {
            "code": "服务中心积分",
            "text": res.data.myStudio.serviceCentreIntegral
          },
          {
            "code": "分公司积分",
            "text": res.data.myStudio.companyIntegral
          },

          ],

        })
      }

      if (res.data.memberInfo.shareNumber == 3) {
        shareNumberWx = 3
        this.setData({
          buttonshow: true,
        })
      }
      else {
        this.setData({
          buttonshow: false
        })
      }
      wx.hideLoading();
    }).catch((errMsg) => {
      console.log("错误提示信息joinDate === " + errMsg); //错误提示信息wx.hideLoading();
    });

  },

  addTeam: function(e) {
    wx.showToast({
      title: '加入中.......',
      icon: 'loading',
      duration: 5000,
    })
    wx.setStorage({
      key: "goSingIn",
      data: "每日签到"
    })
  
    var enddate = Y + "-" + M + "-" + D
    app.postAction('https://hchd.zeacen.com/zeacen/wechatapplet/addMemberInfo', {
      "openId": openidstring,
      "studioId": this.data.arrayTableDataWork[e.target.id].studioId,
      "memberName": app.globalData.userInfo.nickName,
      "memberImage": app.globalData.userInfo.avatarUrl
    }).then((res) => {
      console.log('加入战队   ====== ', res.data)
      wx.setStorage({
        key: "disable",
        data: true
      })
      if (res.data === "不能重复加入张队")
     {
        wx.showToast({
          title: '不能重复加入战队',
          icon: 'error',
          duration: 2000,
        })
     }
     else
      {
        wx.showToast({
          title: '加入战队成功',
          icon: 'success',
          duration: 2000,
        })
        wx.navigateTo({
          url: '../home/home'
        })
     }
      
      wx.hideLoading();
    }).catch((errMsg) => {
      wx.showToast({
        title: '不能重复加入战队',
        icon: 'error',
        duration: 2000,
      })
      console.log("错误提示信息 === " + errMsg); //错误提示信息wx.hideLoading();
    });
   
  },
 

  panghangbang: function(e) {
    var data = e.target.id
    this.phb1(data)
  },
  phb1: function (data) {
    wx.showToast({
      title: '数据载入中....... ',
      icon: 'loading',
      duration: 5000,
    })
    var that = this;
    if (data == 1) {
      tagValue = 1
      //https://hchd.zeacen.com/zeacen/wechatapplet/rankingList
      console.log("openidstring" + openidstring)
      app.postAction('https://hchd.zeacen.com/zeacen/wechatapplet/rankingList', {
        "openId": openidstring,
        "tagValue": tagValue
      }).then((res) => {

        var data = res.data.companyRankingList;

        // var personal = JSON.parse(res.json_personalData);

        wx.hideLoading();
        this.setData({
          searchString: "请输入分公司全称进行搜索",
          isShowCompany: true,
          isShowWorkRoom: false,
          isShowCenter: false,
          isShowPersion: false,
          arrayTableDataCompany: data,


        })
        if (res.data.memberCompanyInfo != null) {
          var dataimgae = res.data.memberCompanyInfo;
          this.setData({
            myCompanyName: res.data.memberCompanyInfo.companyName,
            myCompanyNumber: res.data.memberCompanyInfo.companyIntegral,
            Myimage: res.data.memberCompanyInfo.companyImage,
            showPersonal: true
          })
        }
        wx.hideLoading();
      }).catch((errMsg) => {
        console.log("错误提示信息 === " + errMsg); //错误提示信息wx.hideLoading();
      });


    }
    if (data == 2) {
      tagValue = 2
      app.postAction('https://hchd.zeacen.com/zeacen/wechatapplet/rankingList', {
        "openId": openidstring,
        "tagValue": tagValue
      }).then((res) => {
        var data = res.data.centreRankingList;

        console.log('[云函数] dataimgae ', res.data.memberCentreInfo)
        this.setData({
          searchString: "请输入服务中心名称进行搜索",
          isShowCompany: false,
          isShowWorkRoom: false,
          isShowCenter: true,
          isShowPersion: false,
          arrayTableDataCenter: data,


        })

        if (res.data.memberCentreInfo != null) {

          this.setData({
            myCompanyName: res.data.memberCentreInfo.serviceCentreName,
            myCompanyNumber: res.data.memberCentreInfo.serviceCentreIntegral,
            Myimage: res.data.memberCentreInfo.servicecentreImage,
            showPersonal: true
          })
        }



        wx.hideLoading();
      }).catch((errMsg) => {
        console.log("错误提示信息 === " + errMsg); //错误提示信息wx.hideLoading();
      });

    }
    if (data == 3) {
      tagValue = 3
      app.postAction('https://hchd.zeacen.com/zeacen/wechatapplet/rankingList', {
        "openId": openidstring,
        "tagValue": tagValue
      }).then((res) => {
        var data = res.data.studioRankingList;
        arrayTableDataWork = data
        this.setData({
          searchString: "请输入工作室名称进行搜索",
          isShowCompany: false,
          isShowWorkRoom: true,
          isShowCenter: false,
          isShowPersion: false,
          arrayTableDataWork: data,


        })
        if (res.data.memberStudioInfo != null) {
          var dataimgae = res.data.memberStudioInfo.studioImage;
          this.setData({
            myCompanyName: res.data.memberStudioInfo.studioName,
            myCompanyNumber: res.data.memberStudioInfo.studioIntegral,
            Myimage: dataimgae,
            showPersonal: true
          })
        }


        wx.hideLoading();
      }).catch((errMsg) => {
        console.log("错误提示信息 === " + errMsg); //错误提示信息wx.hideLoading();
      });


      this.setData({
        showzhandui: true,
      })

    } else {
      this.setData({
        showzhandui: false,

      })
    }
    if (data == 4) {
      tagValue = 4
      app.postAction('https://hchd.zeacen.com/zeacen/wechatapplet/rankingList', {
        "openId": openidstring,
        "tagValue": tagValue
      }).then((res) => {
        console.log('[云函数]  ', res)
        var data = res.data.memberRankingList;
        this.setData({
          searchString: "请输入昵称进行搜索",
          isShowCompany: false,
          isShowWorkRoom: false,
          isShowCenter: false,
          isShowPersion: true,
          arrayTableDataPersion: data,
        })

        if (res.data.memberInfo != null) {
          this.setData({
            myCompanyName: res.data.memberInfo.memberName,
            myCompanyNumber: res.data.memberInfo.memberIntegral,
            Myimage: res.data.memberInfo.memberImage,
            showPersonal: true
          })
        }


        wx.hideLoading();
      }).catch((errMsg) => {
        console.log("错误提示信息 === " + errMsg); //错误提示信息wx.hideLoading();
      });
      // that.MyListData('personal');
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
          // myCompanyName: res.data[0].MyCompany[1],
          // myCompanyNumber: res.data[0].MyCompanyNumber,
          // Myimage: res.data[0].image,
          // showPersonal: true

        })
        mytimeString = res.data[0].time
        console.log("是否分享" + res.data[0].share)
        
        if (res.data[0].share == 3) {
         
          this.setData({
            buttonshow: true,
          })
        }
        else {
          this.setData({
            buttonshow: false
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
  }
  ,

  onShareAppMessage: function(res) {
    this.shareAppMessage(openidstring)
    return {
      title: '慧吃慧动100天' + "（第" + this.data.dayNumber + "天)",
      // 分享时在路径后拼接参数，可拼接多个参数。 
      path: '/pages/home/home?id=' + openidstring,
      imageUrl: '../imgs/share.png',
      success: function(res) {
        // 转发成功

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
  }
  ,
  shareAppMessage:function(openid)
  {

    app.postAction('https://hchd.zeacen.com/zeacen/wechatapplet/share', {
      "openId": openidstring,
    }).then((res) => {
      console.log('分享完成1   ====== ', res.data)
      this.MyData()
      if (res.data === "分享完成") {
        console.log('分享完成2   ====== ', res.data)
      }
      else {

        
      }

      wx.hideLoading();
    }).catch((errMsg) => {
      console.log("错误提示信息 分享完成=== " + errMsg); //错误提示信息wx.hideLoading();
    });


  }
  ,

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

  backAction: function() {
    wx.navigateBack()
  },
  firstHome: function() {
    wx.navigateTo({
      url: '../home/home'
    })
  },
  pensonalAction: function() {
  
    wx.navigateTo({
      url: '../personal/personal?id=' + openidstring
    })
  },

  paihangbang: function() {
    wx.navigateTo({
      url: '../rankList/rankList?shareOpenId=' + openidstring
    })
  },
  wxSearchFn: function (e) {
    var enddate = Y + "-" + M + "-" + D
    app.postAction('https://hchd.zeacen.com/zeacen/wechatapplet/queryInfo', {
      "openId": openidstring,
      "tagValue": tagValue,
      "queryValue": this.data.wxSearchData.value,

    }).then((res) => {


      if (tagValue == 1) {
        var data = res.data.companyRankingList;
        this.setData({
          arrayTableDataCompany: data,
        })
      }
      if (tagValue == 2) {
        var data = res.data.serviceCentreRankingList;
        this.setData({
          arrayTableDataCenter: data,
        })
      }
      if (tagValue == 3) {
        var data = res.data.studioRankingList;
        this.setData({
          arrayTableDataWork: data,
        })
      }
      if (tagValue == 4) {
        var data = res.data.memberRankingList;
        this.setData({
          arrayTableDataPersion: data,
        })
      }

      wx.hideLoading();
    }).catch((errMsg) => {
      console.log("错误提示信息 === " + errMsg); //错误提示信息wx.hideLoading();
    });

 


  },
  wxSearchInput: function(e) {
    var that = this
    WxSearch.wxSearchInput(e, that);
    console.log("搜索框" + that.data.wxSearchData.value)
    if (that.data.wxSearchData.value == "") {
      console.log("无数据")
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
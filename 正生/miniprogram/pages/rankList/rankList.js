// pages/rankList/rankList.js
// pages/home/home.js

var app = getApp()
var showzhandui = false
var openidstring = ""
var arrayMydata = [];
var arrayTableDataWork = []
var workroomName = ""
var workroomNumber = 0
var centerNumber = 0
var companyNumber = 0
var tagValue = 1
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
//
var WxSearch = require('../../wxSearch/wxSearch.js')
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
    arrayTableDataWork: [],
    arrayTableDataCenter: [],
    arrayTableDataCompany: [],
    arrayTableDataPersion: [],
    // 此页面 页面内容距最顶部的距离
    height: app.globalData.height * 2 + 40,
    display1: 'none',
    display2: 'block',
    myCompanyName: "",
    Myimage: "",
    myCompanyNumber: 0,
    myCompanyNumber: 0,
    myRownum:"",
    myCenterName: "",
    myCenterNumber: 0,

    myStudionName: "",
    myStudioNumber: 0,

    myName: "",
    MyNUmber: 0,

    name: "",

    showPersonal: false,
    searchString: "请输入分公司全称进行搜索",

    isShowCompany: false,
    isShowWorkRoom: false,
    isShowCenter: false,
    isShowPersion: false,
    btuBottom: "20%;",

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        //model中包含着设备信息
        console.log(res.model)
        var model = res.model
        if (model.search('iPhone X') != -1) {
          that.setData({
            btuBottom: "30%;"
          })
        } else {
          that.setData({
            btuBottom: "20%;",
          })
        }
        if (model.search('iPad') != -1) {
          console.log("iPad Pro 10.5-inch ===ffff= ")
        }
      }
    })

    var data = options.id;
    openidstring = options.shareOpenId
    console.log("mmmp == " + openidstring, data)
    var that = this
    if (data != null) {
      tagValue = data
      this.phb1(data)
    } else {
      tagValue = 1
      this.phb1(1)
    }

    //初始化的时候渲染wxSearchdata
    WxSearch.init(that, 43, ['weappdev', '小程序', 'wxParse', 'wxSearch', 'wxNotification']);
    WxSearch.initMindKeys(['weappdev.com', '微信小程序开发', '微信开发', '微信小程序']);
  },
  addTeam: function(e) {
    wx.showToast({
      title: '加入中.......',
      icon: 'loading',
      duration: 2000,
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

  phb1: function(data) {
    wx.showLoading({
      title: '加载中...',
    })

    var that = this;
    if (data == 1) {

     
      tagValue = 1
      //http://192.168.8.87:8082/wechatapplet/rankingList
      //http://192.168.8.87:8082/wechatapplet/rankingList
      console.log("openidstring" + openidstring)
      app.postAction('http://192.168.8.87:8082/wechatapplet/rankingList', {
        "openId": openidstring ,
        "tagValue": tagValue
      }).then((res) => {
       
        var data = res.data.companyRankingList;
        console.log("==========="+data)
        // var personal = JSON.parse(res.json_personalData);
       
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
            myRownum: res.data.memberCompanyInfo.rownum,
            showPersonal: true
          })
        }
        wx.hideLoading();
      }).catch((errMsg) => {
        console.log("错误提示信息 === " + errMsg);
      });


    }
    if (data == 2) {
      tagValue = 2
      app.postAction('http://192.168.8.87:8082/wechatapplet/rankingList', {
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
            showPersonal: true,
            myRownum: res.data.memberCentreInfo.rownum,
          })
        }

      

        wx.hideLoading();
      }).catch((errMsg) => {
        console.log("错误提示信息 === " + errMsg); //错误提示信息wx.hideLoading();
      });
   
    }
    if (data == 3) {
      tagValue = 3
      app.postAction('http://192.168.8.87:8082/wechatapplet/rankingList', {
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
            showPersonal: true,
            myRownum: res.data.memberStudioInfo.rownum,
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
      app.postAction('http://192.168.8.87:8082/wechatapplet/rankingList', {
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
       
        if (res.data.memberInfo != null)
        {
          this.setData({
            myCompanyName: res.data.memberInfo.memberName,
            myCompanyNumber: res.data.memberInfo.memberIntegral,
            Myimage: res.data.memberInfo.memberImage,
            showPersonal: true,
            myRownum: res.data.memberInfo.rownum,
          })
       }
 

        wx.hideLoading();
      }).catch((errMsg) => {
        console.log("错误提示信息 === " + errMsg); //错误提示信息wx.hideLoading();
      });
      // that.MyListData('personal');
    }

  },

  phb: function(data) {
    if (data == 3) {
      const db = wx.cloud.database()
      // 查询当前用户所有的 counters
      console.log(openidstring, data)
      db.collection('personal').where({
          _openid: openidstring
        })
        .get({
          success: res => {
            console.log(res.data)
            // this.setData({
            //   myCompanyName: res.data[0].MyWorkRoom[1],
            //   myCompanyNumber: res.data[0].MyWorkRoomNumber,
            //   Myimage: res.data[0].image
            // })

          },
          fail: err => {
            wx.showToast({
              icon: 'none',
              title: '查询记录失败'
            })
            console.error('[数据库] [查询记录] 失败：', err)
          }
        })

      this.MyListData('StudioRankings');

      this.setData({
        showzhandui: true,

      })

    } else {
      this.setData({
        showzhandui: false,

      })
    }
  },
  wxSearchFn: function (e) {
    var enddate = Y + "-" + M + "-" + D
   
    app.postAction('http://192.168.8.87:8082/wechatapplet/queryInfo', {
      "openId": openidstring,
      "tagValue":tagValue,
      "queryValue": this.data.wxSearchData.value,

    }).then((res) => {
      
      
      if (tagValue == 1)
      {
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

    // var that = this
    // const db = wx.cloud.database()
    // // 查询当前用户所有的 counters
    // db.collection(this.data.name).where({
    //   Name: that.data.wxSearchData.value

    // }).get({
    //   success: res => {
    //     this.setData({
    //       arrayTableData: res.data
    //     })
    //     if (res.data.length == 0) {
    //       wx.showToast({
    //         icon: 'none',
    //         title: '查询数据为空，请检查查询条件'
    //       })
    //     }
    //     console.log('[数据库] 签到成功===  ', res.data)

    //   },
    //   fail: err => {
    //     wx.showToast({
    //       icon: 'none',
    //       title: '查询记录失败'
    //     })
    //     console.error('[数据库] [查询记录] 失败：', err)
    //   }
    // })


  },
  wxSearchInput: function(e) {


   
    var that = this
    WxSearch.wxSearchInput(e, that);
   console.log("搜索框" + that.data.wxSearchData.value)
    // if (that.data.wxSearchData.value == "") {
    //   console.log("无数据")
    //   that.MyListData(this.data.name)
    // }

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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function(e) {
    var that = this;
    GetList(that);
    that.MyData()
    // that.MyListData('Branchrankings');

  },
  jiaruzhandui: function() {
    const db = wx.cloud.database()
    const _ = db.command
    db.collection('personal').where({
      _openid: openidstring
    }).get({
      success: res => {
        if (res.data[0] != null) {
          wx.showToast({
            title: '不能重复加入战队',
            icon: 'succes',
            duration: 1000,
            mask: true
          })
        } else {

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
  MyPersionald: function(openidstr) {
    console.log("我的排行榜 === " + openidstr)
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
        console.log("我的排行榜数据 ===  " + res.data)
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
  MyListData: function(name) {
    const db = wx.cloud.database()
    this.data.name = name
    // 查询当前用户所有的 counters

    db.collection(name).orderBy('number', 'desc').get({
      success: res => {
        this.setData({
          // arrayTableData: res.data
        })
        arrayMydata = res.data
        console.log('[ssssssss] 签到成功===  ', res.data)

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
  panghangbang: function(e) {
    console.log(e.target.id)
    var data = e.target.id
    this.phb1(data)

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
  // onShareAppMessage: function () {

  // }
  // , 
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
      url: '../my/myData?openidstring=' + openidstring
    })
  },
  MyData: function() {

    const db = wx.cloud.database()
    const _ = db.command
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        // 查询当前用户所有的 counters
        openidstring = res.result.openid
        // this.MyPersionald(openidstring)
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
    })

  },
  pensonalAction: function() {
    wx.navigateTo({
      url: '../personal/personal?id=' + openidstring
    })
  },
  paihangbang: function() {
    wx.navigateTo({
      url: '../rankList/rankList'
    })
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
  },

})
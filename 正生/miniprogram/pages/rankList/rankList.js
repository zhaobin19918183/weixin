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

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var data = options.id;
    openidstring = options.shareOpenId
    console.log("mmmp == " + openidstring, data)
    var that = this
    if (data != null) {
      this.phb1(data)
    } else {
      
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
      duration: 5000,
    })
    wx.setStorage({
      key: "goSingIn",
      data: "每日签到"
    })
    wx.setStorage({
      key: "disable",
      data: true
    })
   



    var enddate = Y + "-" + M + "-" + D
    app.postAction1('http://127.0.0.1:8000/zhengsheng/addPersonal/', {
      "openid": openidstring,
      "time": enddate,
      "studioName": arrayTableDataWork[e.target.id].fields.studioName,
      "memberName": app.globalData.userInfo.nickName,
      "memberImage": app.globalData.userInfo.avatarUrl
    }).then((res) => {
      console.log('加入战队   ====== ', res.data)
     
      if (res.data === "不能重复加入张队")
     {
        wx.showToast({
          title: '不能重复加入战队',
          icon: 'success',
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

     }
      wx.navigateTo({
        url: '../home/home'
      })
      wx.hideLoading();
    }).catch((errMsg) => {
      console.log("错误提示信息 === " + errMsg); //错误提示信息wx.hideLoading();
    });
    console.log(arrayTableDataWork[e.target.id].fields.studioName)
    // const db = wx.cloud.database()
    // const _ = db.command
    // db.collection('personal').where({
    //   _openid: openidstring
    // }).get({
    //   success: res => {
    //     if (res.data[0] != null) {
    //       wx.showToast({
    //         title: '不能重复加入战队',
    //         icon: 'succes',
    //         duration: 1000,
    //         mask: true
    //       })
    //     } else {

    //       var workroom = []

    //       if (arrayMydata.length > 1) {

    //         workroom = [arrayMydata[e.target.id]._id, arrayMydata[e.target.id].Name]

    //         this.searchCenter(arrayMydata[e.target.id].centerID, workroom)
    //         workroomName = arrayMydata[e.target.id].Name
    //         workroomNumber = arrayMydata[e.target.id].number



    //       } else {

    //         workroom = [arrayMydata[0]._id, arrayMydata[0].Name]
    //         this.searchCenter(arrayMydata[0].centerID, workroom)
    //         workroomName = arrayMydata[0].Name
    //         workroomNumber = arrayMydata[0].number

    //       }

    //     }

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

  searchCenter: function(centerid, workroom) {
    console.log("searchCenter ==== " + centerid, workroom)
    var myCenterArray = [];
    var that = this
    const db = wx.cloud.database()
    // 查询当前用户所有的 counters
    db.collection("ServiceCenterrankings").where({
      _id: centerid

    }).get({
      success: res => {
        myCenterArray = [res.data[0]._id, res.data[0].Name]
        console.log("中心1 == " + res.data[0].number)
        centerNumber = res.data[0].number

        this.myCompanyData(res.data[0].companyID, workroom, myCenterArray)
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
  myCompanyData: function(companyID, workroom, centerArray) {
    var that = this
    const db = wx.cloud.database()
    var myCompanyArray = [];
    console.log("myCompanyData == " + companyID, workroom, centerArray)
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
    console.log("res === ", workroom, centerArray, myCompanyArray, workroomName, workroomNumber, centerNumber, companyNumber, enddate)
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
        imageArray: [],
        number: 0,
        time: enddate,
        whetaher: 0,
        share: 0
      },
      success: function(res) {
        console.log("成功")

        wx.navigateTo({
          url: '../home/home'
        })
        wx.showToast({
          title: '加入战队成功',
          icon: 'success',
          duration: 2000,
        })
      },
      fail: console.error
    })
    setTimeout(function() {
      wx.showToast({
        title: '服务器开小差了......',
        icon: 'error',
        duration: 5000,
      })
      wx.navigateTo({
        url: '../home/home'
      })
    }, 10000)


  },
  phb1: function(data) {
    var that = this;
    if (data == 1) {
      app.getAction1('http://127.0.0.1:8000/zhengsheng/companyJson/', {
        "openid": openidstring,
      }).then((res) => {
        var data = JSON.parse(res.data.json_data);
        // var personal = JSON.parse(res.json_personalData);
        console.log('[分公司排行版]  ', res)
        this.setData({

          isShowCompany: true,
          isShowWorkRoom: false,
          isShowCenter: false,
          isShowPersion: false,
          arrayTableDataCompany: data,
         

        })
        if (res.data.json_personalData != null) {
          this.setData({
            myCompanyName: res.data.json_personalData.companyName,
            myCompanyNumber: res.data.json_personalData.companyIntegral,
            // Myimage: res.data[0].image
            showPersonal: true
          })
        }
        

        wx.hideLoading();
      }).catch((errMsg) => {
        console.log("错误提示信息 === " + errMsg); //错误提示信息wx.hideLoading();
      });


    }
    if (data == 2) {
      app.getAction1('http://127.0.0.1:8000/zhengsheng/centerJson/', {
        "openid": openidstring,
      }).then((res) => {
        var data = JSON.parse(res.data.json_data);
        //
        this.setData({

          isShowCompany: false,
          isShowWorkRoom: false,
          isShowCenter: true,
          isShowPersion: false,
          arrayTableDataCenter: data,
       

        })

        if (res.data.json_personalData != null) {
          this.setData({
            myCompanyName: res.data.json_personalData.serviceCentreName,
            myCompanyNumber: res.data.json_personalData.serviceCentreIntegral,
            // Myimage: res.data[0].image
            showPersonal: true
          })
        }

        console.log('[云函数]  ', data)

        wx.hideLoading();
      }).catch((errMsg) => {
        console.log("错误提示信息 === " + errMsg); //错误提示信息wx.hideLoading();
      });
   
    }
    if (data == 3) {

      app.getAction1('http://127.0.0.1:8000/zhengsheng/workroomJson/', {
        "openid": openidstring,
      }).then((res) => {
        console.log('[云函数] workroomJson ', res)
        var data = JSON.parse(res.data.json_data);
       
        arrayTableDataWork = data
        this.setData({
          isShowCompany: false,
          isShowWorkRoom: true,
          isShowCenter: false,
          isShowPersion: false,
          arrayTableDataWork: data,
       

        })
        if (res.data.json_personalData != null) {
          this.setData({
            myCompanyName: res.data.json_personalData.studioName,
            myCompanyNumber: res.data.json_personalData.studioIntegral,
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
      app.getAction1('http://127.0.0.1:8000/zhengsheng/personalJson/', {
        "openid": openidstring,
      }).then((res) => {
        console.log('[云函数]  ', res)
        var data = JSON.parse(res.data.json_data);
        //
        this.setData({

          isShowCompany: false,
          isShowWorkRoom: false,
          isShowCenter: false,
          isShowPersion: true,
          arrayTableDataPersion: data,
        })
       
        if (res.data.persion != null)
        {
          this.setData({
          myCompanyName: res.data.persion.memberName,
          myCompanyNumber: res.data.persion.memberIntegral,
              Myimage: res.data.persion.memberImage,
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
      url: '../my/myData'
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
        this.MyPersionald(openidstring)
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
    })

  },
  pensonalAction: function() {
    wx.navigateTo({
      url: '../personal/personal'
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
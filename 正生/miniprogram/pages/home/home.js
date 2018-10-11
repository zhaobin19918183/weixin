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
var myCompanyId = ""
var myCenterId = ""
var myStudioId = ""
var whetaher = 0
var shareOpenId = ""
var openidstring = ""
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

var dateString = ""



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
    modalFlag : true,
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
    imgUrls: [],
    imageA:"",
    indicatorDots: true, //是否显示面板指示点
    autoplay: true, //是否自动切换
    interval: 1500, //自动切换时间间隔,3s
    duration: 1000, //  滑动动画时长1s
    display: '',
    display1: 'none',
    display2: 'block',

    integral1: "",
    integral2: "",
    integral3: "",

    company1: "",
    company2: "",
    company3: "",

    company1Number: "",
    company2Number: "",
    company3Number: "",

    center1: "",
    center2: "",
    center3: "",

    studio1: "",
    studio2: "",
    studio3: "",
    // 个人数据
    whetaher: 0,
    myCompanyName: "",
    myCompanyId: "",
    myCompanyNumber: 0,

    myCenterName: "",
    myCenterNumber: 0,

    myStudionName: "",
    myStudioNumber: 0,

    myName: "",
    MyNUmber: 0,
    name: "",
    goSingIn: "我要参与",
    disable:false


  },
  goSingIn:function(e)
  {
    
   console.log(e)
    var disable = wx.getStorageSync('disable')
    if(disable == false)
    {
      console.log("shareOpenId === " + openidstring)
      wx.navigateTo({
        url: '../rankList/rankList?id=' + e.currentTarget.id + '&shareOpenId=' + openidstring
      })
     
    }
    else
    {
      wx.navigateTo({
        url: '../personal/personal'
      })

    }

    this.setData({
      goSingIn: "每日签到",
    })
  }
  ,
  Myopenid: function() {
    const db = wx.cloud.database()
    const _ = db.command
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid:1111 ', res.result.openid)
        // 查询当前用户所有的 counters
        openidstring = res.result.openid
        this.mydetaildata(res.result.openid)

      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
    })

  },
  num_data: function(time) {
    console.log("签到 ")
    console.log(time)
    var startdate = time
    var enddate = Y +"-" + M + "-" + D
    var start_date = new Date(startdate.replace(/-/g, "/"));
    var end_date = new Date(enddate.replace(/-/g, "/"));
    var days = end_date.getTime() - start_date.getTime();
    var day = parseInt(days / (1000 * 60 * 60 * 24));
    const db = wx.cloud.database()
    const _ = db.command
   if (day > 1)
   {
     console.log("签到中断")

     wx.cloud.callFunction({
       name: 'login',
       data: {},
       success: res => {
      
         db.collection('personal').where({
           _openid: res.result.openid
         })
           .get({
             success: function (res) {
               db.collection('personal').doc(res.data.id).update({
                 // data 传入需要局部更新的数据
                 data: {
                   allDay: 0,
                 }

               })
             }
           })
       },
       fail: err => {
         console.error('[云函数] [login] 调用失败', err)
       }
     })
   }

    if (day > 0) {
      
      wx.cloud.callFunction({
        name: 'login',
        data: {},
        success: res => {
          console.log("当天签到 ")
          db.collection('personal').where({
              _openid: res.result.openid
            })
            .get({
              success: function(res) {
                db.collection('personal').doc(res.data.id).update({
                  // data 传入需要局部更新的数据
                  data: {
                    whetaher: 0,
                    share:0
                
                  }

                })
              }
            })


        },
        fail: err => {
          console.error('[云函数] [login] 调用失败', err)
        }
      })
    } else {
      console.log("同一天签到 ")

    }
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
    var that = this;
    if (e.id) {
      shareOpenId = e.id
      
    }

    wx.getSetting({
      success: (res) => {
        console.log("授权 ==== " + res.authSetting["scope.userInfo"])
        if (res.authSetting["scope.userInfo"] == true)
         {
         this.setData({
          modalFlag: true
            })
          }
          else
          {

          this.setData({
             modalFlag: false
            })

          wx.removeStorage({
            key: 'goSingIn',
            success: function (res) {
              console.log(res.data)
            }
          })
          wx.removeStorage({
            key: 'disable',
            success: function (res) {
              console.log(res.data)
            }
          })



          }


      }
      
    })

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
          // imgeUrlAni: "../imgs/gif1/" + n + ".jpg",
          imgeUrlAni1: "../imgs/gif2/" + k + ".png",
          // imgeUrlAni2: "../imgs/gif3/" + b + ".png",

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


    var goSingIn = wx.getStorageSync('goSingIn')
    var disable = wx.getStorageSync('disable')
    console.log("disable ==== "+disable)
    if(disable != true)
    {
      this.setData({
        goSingIn: "我要参与",
        disable: false
      })
    }
    else
    {
      this.setData({
        goSingIn: goSingIn,
      })
    }

    wx.cloud.init()
    var that = this;
    that.Myopenid()
    that.bannerImage()
    that.MyData()
    that.Mycenter()
    that.Mystudio()
    that.Mycompany()
    that.animationFunc()
    that.slideupshowFun()
    that.ruleImage()
    // GetList(that);
    // 逻辑判断用户是否登录，服务器返回排行榜前三名数据
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] 登录: ', res.result.openid)
        app.globalData.openid = res.result.openid

      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
    })


  },
  ruleImage:function()
  {
    const db = wx.cloud.database()
    // 查询当前用户所有的 counters
    db.collection('ruleImage').get({
      success: res => {
        console.log("+++ruleImage+++" + res.data[0].ruleImage)
        this.setData({
          queryResult: JSON.stringify(res.data, null, 2),
          imageA: res.data[0].ruleImage
         
        })


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
  Mycenter:function()
  {
    const db = wx.cloud.database()
    // 查询当前用户所有的 counters
    const _ = db.command
    db.collection('ServiceCenterrankings').orderBy('number', 'desc').limit(3).get({
      success: res => {
        console.log("Mycenter === "+res.data[0].number)
        this.setData({
          queryResult: JSON.stringify(res.data, null, 2),
          center1: res.data[0].Name,
          center2: res.data[1].Name,
          center3: res.data[2].Name,
        })
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

          categories: [this.data.company1, this.data.company2, this.data.company3],
          animation: true,
          series: [{
            name: '总积分',
            data: [this.data.company1Number, this.data.company2Number, this.data.company3Number,],
            format: function (val) {
              return '' + val;
            }
          }],
          yAxis: {
            title: '',
            format: function (val) {
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
        console.log('res.data ===  ', res.data)
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
  Mystudio: function () {
    const db = wx.cloud.database()
    // 查询当前用户所有的 counters
    const _ = db.command
    db.collection('StudioRankings').orderBy('number', 'desc').limit(3).get({
      success: res => {
        console.log("StudioRankings === " + res.data)
        this.setData({
          queryResult: JSON.stringify(res.data, null, 2),
          
          studio1: res.data[0].Name,
          studio2: res.data[1].Name,
          studio3: res.data[2].Name,
        })
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

          categories: [this.data.company1, this.data.company2, this.data.company3],
          animation: true,
          series: [{
            name: '总积分',
            data: [this.data.company1Number, this.data.company2Number, this.data.company3Number,],
            format: function (val) {
              return '' + val;
            }
          }],
          yAxis: {
            title: '',
            format: function (val) {
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
        console.log('res.data ===  ', res.data)
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
  Mycompany: function () {
    const db = wx.cloud.database()
    // 查询当前用户所有的 counters
    const _ = db.command
    db.collection('Branchrankings').orderBy('number', 'desc').limit(3).get({
      success: res => {
        console.log("Branchrankings === " + res.data)
        this.setData({
          queryResult: JSON.stringify(res.data, null, 2),

          company1: res.data[0].Name,
          company2: res.data[1].Name,
          company3: res.data[2].Name,

          company1Number: res.data[0].number,
          company2Number: res.data[1].number,
          company3Number: res.data[2].number,


        })
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

          categories: [this.data.company1, this.data.company2, this.data.company3],
          animation: true,
          series: [{
            name: '总积分',
            data: [this.data.company1Number, this.data.company2Number, this.data.company3Number,],
            format: function (val) {
              return '' + val;
            }
          }],
          yAxis: {
            title: '',
            format: function (val) {
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
        console.log('res.data ===  ', res.data)
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
  MyData: function() {
    const db = wx.cloud.database()
    // 查询当前用户所有的 counters
    const _ = db.command
    db.collection('personal').orderBy('MyNumber', 'desc').limit(3).get({
      success: res => {
          this.setData({
            queryResult: JSON.stringify(res.data, null, 2),
            integral1: res.data[0].Name + " 积分 " + res.data[0].MyNumber,
            integral2: res.data[1].Name + " 积分 " + res.data[1].MyNumber,
            integral3: res.data[2].Name + " 积分 " + res.data[2].MyNumber,

            // center1: res.data[0].MyCenter[1],
            // center2: res.data[1].MyCenter[1],
            // center3: res.data[2].MyCenter[1],

            // studio1: res.data[0].MyWorkRoom[1],
            // studio2: res.data[1].MyWorkRoom[1],
            // studio3: res.data[2].MyWorkRoom[1],

            // company1: res.data[0].MyCompany[1],
            // company2: res.data[1].MyCompany[1],
            // company3: res.data[2].MyCompany[1],

            // company1Number: res.data[0].MyCompanyNumber,
            // company2Number: res.data[1].MyCompanyNumber,
            // company3Number: res.data[2].MyCompanyNumber,


          })
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

          categories: [this.data.company1, this.data.company2, this.data.company3],
          animation: true,
          series: [{
            name: '总积分',
            data: [this.data.company1Number, this.data.company2Number, this.data.company3Number, ],
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
        console.log('res.data ===  ', res.data)
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
  bannerImage: function() {

    const db = wx.cloud.database()
    // 查询当前用户所有的 counters
    db.collection('bannerImage').get({
      success: res => {
        this.setData({
          queryResult: JSON.stringify(res.data, null, 2),
          imgUrls: res.data[0].imgUrls,
     
        })

        
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
  // onShareAppMessage: function(res) {
  //   return {
  //     title: '慧吃慧动100天',
  //     // 分享时在路径后拼接参数，可拼接多个参数。 
  //     path: '/pages/home/home',
  //     imageUrl: '../imgs/share.png',
  //     success: function(res) {
  //       // 转发成功
  //       console.log("转发成功")
  //       wx.showToast({
  //         title: '转发成功',
  //         icon: 'success',
  //         duration: 2000,
  //       })
  //     },
  //     fail: function(res) { // 转发失败
  //       console.log("转发失败")
  //     }
  //   }
  // },
  mydetaildata: function(openidstr) {
    console.log("获取openid")
    const db = wx.cloud.database()
    const _ = db.command
    db.collection('personal').where({
      _openid: openidstr
    }).get({
      success: res => {
        console.log("获取time",res.data[0].time)
        dateString = res.data[0].time
        this.num_data(dateString)

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
  jifeng: function(openid) {
    const db = wx.cloud.database()
    const _ = db.command
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        db.collection('personal').where({
            _openid: openid
          })
          .get({
            success: function(res) {
              db.collection('personal').doc(res.data.id).update({
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
                that.MyBranchrankings()
                that.MyServiceCenterrankings()
                that.MyStudioRankings()
              }
            }
          })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
    })
  },
  MyBranchrankings: function() {
    var that = this
    const db = wx.cloud.database()
    const _ = db.command
    db.collection('Branchrankings').doc(myCompanyId).update({
      // data 传入需要局部更新的数据
      data: {
        // 表示将 done 字段置为 true
        number: _.inc(5),
      },
      success: function(res) {
        console.log(res.data)
      }
    })
  },
  MyServiceCenterrankings: function() {
    var that = this
    console.log("myCenterId === " + myCenterId)
    const db = wx.cloud.database()
    const _ = db.command
    db.collection('ServiceCenterrankings').doc(myCenterId).update({
      // data 传入需要局部更新的数据
      data: {
        number: _.inc(5),
      },
      success: function(res) {
        console.log("MyServiceCenterrankings === " + res.data)
      }
    })

  },
  MyStudioRankings: function() {
    var that = this
    const db = wx.cloud.database()
    const _ = db.command
    db.collection('StudioRankings').doc(myStudioId).update({
      // data 传入需要局部更新的数据
      data: {
        // 表示将 done 字段置为 true
        number: _.inc(5),
      },
      success: function(res) {
        console.log(res.data)
      }
    })
  },

  ToRankList: function(e) {
    console.log("id == " + e.currentTarget.id)
    wx.navigateTo({
      url: '../rankList/rankList?id=' + e.currentTarget.id
    })
  },
  ToRulesView: function(e) {


  },
  modalOk:function()
  {
  
   
  
  },
  globalData: {
    userInfo: null,
    testid: 1,
    encryptedData: null,
    iv: null,
    code: null
  },
  getUserInfo: function(e) {
    wx.setStorage({
      key: "goSingIn",
      data: "我要参与"
    })
    wx.setStorage({
      key: "disable",
      data: false
    })
    this.setData({
      modalFlag: true
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
        withCredentials: true,
        success: res => {
          console.log(" encryptedData 是 " + res.encryptedData)
          console.log("iv 是" + res.iv)
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })

        }
      })

    }


    

  },
  everyDay:function()
  {
    const db = wx.cloud.database()
    const _ = db.command
    db.collection('personal').where({
      _openid: openidstring
    }).get({
      success: res => {
        if (res.data[0] != null) {
          console.log('[数据库] [查询记录] ：', res.data)
          var that = this;
          if (whetaher != 1) {
            that.loginTrueOrFalse()

          } else {
            wx.showToast({
              title: '已经签到',
              icon: 'succes',
              duration: 1000,
              mask: true
            })
          }
        } else {
          wx.showToast({
            title: '点击我要参与，加入战队',
            icon: 'none',
            duration: 1000,
            mask: true
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
  loginTrueOrFalse: function() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
      wx.navigateTo({
        url: '../personal/personal?id=' + openidstring
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
      wx.login({
        success: function(res) {
          console.log('获取id===' + res.code)

          app.globalData.code = res.code
        }
      })
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        withCredentials: true,
        success: res => {
          console.log(" encryptedData 是 " + res.encryptedData)
          console.log("iv 是" + res.iv)
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
  getPhoneNumber: function(e) {
      console.log(e.detail.errMsg)
      console.log(e.detail.iv)
      console.log(e.detail.encryptedData)
      if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {
        wx.showModal({
          title: '提示',
          showCancel: false,
          content: '未授权',
          success: function(res) {}
        })
      } else {
        wx.showModal({
          title: '提示',
          showCancel: false,
          content: '同意授权',
          success: function(res) {}
        })
      }
    }

    ,
  toPersonal: function(e) {


    console.log(e.target.id)

  },
  topfourbuttonaction: function(e) {
   
    console.log(e.currentTarget.id, openidstring)
    const db = wx.cloud.database()
    const _ = db.command
  
    db.collection('personal').where({
      _openid: openidstring
    }).get({
      success: res => {
        if (res.data[0] != null) {
          wx.navigateTo({
      
            url: '../rankList/rankList?id=' + e.currentTarget.id + '&shareOpenId=' + openidstring
          })
        } else {
          wx.showToast({
            icon: 'none',
            title: '点击我要参与，加入战队',
            duration: 1000,
            mask: true
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
  paihangbang: function() {

    const db = wx.cloud.database()
    const _ = db.command
    db.collection('personal').where({
      _openid: openidstring
    }).get({
      success: res => {
        if (res.data[0] != null) {
          wx.navigateTo({
            url: '../rankList/rankList'
          })
        } else {
          wx.showToast({
            icon: 'none',
            title: '点击我要参与，加入战队',
            duration: 1000,
            mask: true
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
  backAction: function() {
    wx.navigateBack()
  },
  firstHome: function() {
    wx.navigateTo({
      url: '../home/home'
    })
  },
  mydataAction: function() {
    console.log("shareOpenId == "+shareOpenId)
    wx.navigateTo({
      url: '../my/myData?openidstring=' + openidstring + '&shareOpenId=' + shareOpenId
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
          console.log('[数据库] [查询记录] ：', res.data)
          var that = this;
          if (whetaher != 1) {
            wx.navigateTo({
              url: '../personal/personal'
            })

          } else {
            wx.showToast({
              title: '已经签到',
              icon: 'succes',
              duration: 1000,
              mask: true
            })
          }
        } else {
          wx.showToast({
            title: '点击我要参与，加入战队',
            icon: 'none',
            duration: 1000,
            mask: true
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
        console.log(res.data)
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
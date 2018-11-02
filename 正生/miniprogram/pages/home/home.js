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
    modalFlag: true,
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
    imageA: "",
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
    disable: false,
    btuBottom: "0%",
    joinBoll: false,
    continuitySigninDate: 0,
    joinDate: 0,
    showpersonal1:false,
    showpersonal2: false,
    showpersonal3: false,

    top:"20px"


  },
  goSingIn: function(e) {
    console.log(e)
    if (this.data.joinBoll == false) {
      wx.navigateTo({
        url: '../rankList/rankList?id=' + e.currentTarget.id + '&shareOpenId=' + openidstring
      })
    } else {
      wx.navigateTo({
        url: '../personal/personal?id=' + openidstring
      })
    }

  },
  Myopenid: function() {
    // https://hchd.zeacen.com
      wx.login({
        success: res => {
          console.log('获取id===' + res.code)
          app.postAction('https://hchd.zeacen.com/zeacen/wechatapplet/oauthCallbak', {
            "code": res.code
          }).then((res) => {
            console.log("openid 获取 === " + res.data); //
            openidstring = res.data
            console.log("+===" + openidstring)
            var enddate = Y + "-" + M + "-" + D
            app.postAction('https://hchd.zeacen.com/zeacen/wechatapplet/index', {
              "openId": res.data,
              "time": enddate
            }).then((res) => {
              console.log("首页信息" + res.data.companyRankingList)
              
              var serviceCentreRankingList = res.data.serviceCentreRankingList;
              var companyRankingList = res.data.companyRankingList;
              var studioRankingList = res.data.studioRankingList;
              if (res.data.memberInfo != null) {
          
                ;
                // this.updateTime(res.data.memberInfo.time)
                this.setData({
                  continuitySigninDate: res.data.memberInfo.totalIntegral,
                  joinDate: res.data.memberInfo.joinDate,
                  joinBoll: true
                })

              }
              var data = res.data.memberRankingList
              if (data.length == 1) {
                this.setData({
                  showpersonal1: true,
                  showpersonal2: false,
                  showpersonal3: false,
                  integral1: data[0].memberName + " 积分 " + data[0].memberIntegral,
                })
              }
              if (data.length == 2) {
                this.setData({
                  showpersonal1: true,
                  showpersonal2: true,
                  showpersonal3: false,
                  integral1: data[0].memberName + " 积分 " + data[0].memberIntegral,
                  integral2: data[1].memberName + " 积分 " + data[1].memberIntegral,
                })
              }
              if (data.length == 3) {
                this.setData({
                  showpersonal1: true,
                  showpersonal2: true,
                  showpersonal3: true,
                  integral1: data[0].memberName + " 积分 " + data[0].memberIntegral,
                  integral2: data[1].memberName + " 积分 " + data[1].memberIntegral,
                  integral3: data[2].memberName + " 积分 " + data[2].memberIntegral,
                })
              }

              this.setData({
               
                studio1: studioRankingList[0].studioName,
                studio2: studioRankingList[1].studioName,
                studio3: studioRankingList[2].studioName
              })
              this.setData({

                center1: serviceCentreRankingList[0].serviceCentreName,
                center2: serviceCentreRankingList[1].serviceCentreName,
                center3: serviceCentreRankingList[2].serviceCentreName,

              })



              this.setData({


                company1: companyRankingList[0].companyName,
                company2: companyRankingList[1].companyName,
                company3: companyRankingList[2].companyName,

                company1Number: companyRankingList[0].companyIntegral,
                company2Number: companyRankingList[1].companyIntegral,
                company3Number: companyRankingList[2].companyIntegral,


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


              wx.hideLoading();
            }).catch((errMsg) => {
              console.log("错误提示信息 === " + errMsg); //错误提示信息wx.hideLoading();
            });
            wx.setStorage({
              key: "openidstring",
              data: openidstring
            })
            wx.hideLoading();
          }).catch((errMsg) => {
            console.log("错误提示信息 === " + errMsg); //错误提示信息
            wx.hideLoading();
          });
        }
      })
    
    
  


  },
  updateTime: function(time) {
    var startdate = time
    var enddate = Y + "-" + M + "-" + D
    var start_date = new Date(startdate.replace(/-/g, "/"));
    var end_date = new Date(enddate.replace(/-/g, "/"));
    var days = end_date.getTime() - start_date.getTime();
    var day = parseInt(days / (1000 * 60 * 60 * 24));
    if (day > 1) {
      var enddate = Y + "-" + M + "-" + D
      app.postAction1('http://192.168.8.67:8000/zhengsheng/updateAllDay/', {
        "openid": openidstring,
        "time": enddate,
      }).then((res) => {

        console.log("更新联系签到时间" + res)
        wx.hideLoading();
      }).catch((errMsg) => {
        console.log("错误提示信息 === " + errMsg); //错误提示信息wx.hideLoading();
      });

    }
    if (day > 0) {
      var enddate = Y + "-" + M + "-" + D
      app.postAction1('http://192.168.8.67:8000/zhengsheng/updatePersonal/', {
        "openid": openidstring,
        "time": enddate,
      }).then((res) => {

        console.log("更新个人数据" + res)
        wx.hideLoading();
      }).catch((errMsg) => {
        console.log("错误提示信息 === " + errMsg); //错误提示信息wx.hideLoading();
      });
    }
  },
  imageslect: function(openid) {
    console.log("正确返回结果 openid === " + openid); //
    var that = this;
    wx.chooseImage({
      count: 1, //最多可以选择的图片总数  
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有  
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
      success: function(res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片  
        var tempFilePaths = res.tempFilePaths;
        //启动上传等待中...  
        wx.showToast({
          title: '正在上传...',
          icon: 'loading',
          mask: true,
          duration: 10000
        })
        var uploadImgCount = 0;
        for (var i = 0, h = tempFilePaths.length; i < h; i++) {
          wx.uploadFile({
            url: 'http://192.168.8.118:8082/zeacen/wechatapplet/signIn',
            filePath: tempFilePaths[i],
            name: 'uploadfile',
            formData: {
              'openId': openid
            },
            header: {
              "Content-Type": "multipart/form-data"
            },
            success: function(res) {
              uploadImgCount++;
              var data = JSON.parse(res.data);
              //服务器返回格式: { "Catalog": "testFolder", "FileName": "1.jpg", "Url": "https://test.com/1.jpg" }  
              //如果是最后一张,则隐藏等待中  
              if (uploadImgCount == tempFilePaths.length) {
                wx.hideToast();
              }
            },
            fail: function(res) {
              wx.hideToast();
              wx.showModal({
                title: '错误提示',
                content: '上传图片失败',
                showCancel: false,
                success: function(res) {}
              })
            }
          });
        }
      }
    });

  },
  num_data: function(time) {
    var startdate = time
    var enddate = Y + "-" + M + "-" + D
    var start_date = new Date(startdate.replace(/-/g, "/"));
    var end_date = new Date(enddate.replace(/-/g, "/"));
    var days = end_date.getTime() - start_date.getTime();
    var day = parseInt(days / (1000 * 60 * 60 * 24));
    const db = wx.cloud.database()
    const _ = db.command

    if (day > 1) {


      wx.cloud.callFunction({
        name: 'login',
        data: {},
        success: res => {

          db.collection('personal').where({
              _openid: res.result.openid
            })
            .get({
              success: function(res) {
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
                    share: 0

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
  btn: function() {},
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
        if (res.authSetting["scope.userInfo"] == true) {
          this.setData({
            modalFlag: true
          })
        } else {

          this.setData({
            modalFlag: false
          })

          wx.removeStorage({
            key: 'goSingIn',
            success: function(res) {
              console.log(res.data)
            }
          })
          wx.removeStorage({
            key: 'disable',
            success: function(res) {
              console.log(res.data)
            }
          })

        }
      }

    })

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
    var that = this
    wx.getSystemInfo({
      success: function(res) {
        //model中包含着设备信息
        console.log(res.model)
        var model = res.model 
        if (model.search('iPhone X') != -1) {
          that.setData({
            btuBottom: "16%",
            top: "100px"
          })
        } else {
          that.setData({
            btuBottom: "10%",
            top: "20px"
          })
        }
        if (model.search('iPad') != -1) {
          console.log("iPad Pro 10.5-inch ===ffff= ")
        }
      }
    })
    var goSingIn = wx.getStorageSync('goSingIn')
    var disable = wx.getStorageSync('disable')
    console.log("disable ==== " + disable)
    if (disable != true) {
      this.setData({
        goSingIn: "我要参与",
        disable: false
      })
    } else {
      this.setData({
        goSingIn: goSingIn,
      })
    }

    wx.cloud.init()
    var that = this;
    that.Myopenid()
    that.animationFunc()
    that.slideupshowFun()
    that.ruleImage()
    // 逻辑判断用户是否登录，服务器返回排行榜前三名数据
    // // 调用云函数
    // wx.cloud.callFunction({
    //   name: 'login',
    //   data: {},
    //   success: res => {
    //     console.log('[云函数] 登录: ', res.result.openid)
    //     app.globalData.openid = res.result.openid

    //   },
    //   fail: err => {
    //     console.error('[云函数] [login] 调用失败', err)
    //   }
    // })


  },
  ruleImage: function() {
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
    var enddate = Y + "-" + M + "-" + D
    wx.login({
      success: res => {
        console.log('获取id===' + res.code)
        // app.postAction('http://192.168.8.118:8082/zeacen/wechatapplet/oauthCallbak', {
        //   "code": res.code
        // }).then((res) => {
        //   console.log("正确返回结果 === " + res.data); //
        //   this.imageslect(res.data)
        //   // app.globalData.openid = res.data
        //   // app.postAction('首页接口', { "openId": res.data, "time": enddate }).then((res) => {
        //   //   wx.hideLoading();
        //   // }).catch((errMsg) => {
        //   //   console.log("错误提示信息 === " + errMsg);//错误提示信息
        //   //   wx.hideLoading();
        //   // });


        //   wx.hideLoading();
        // }).catch((errMsg) => {
        //   console.log("错误提示信息 === " + errMsg); //错误提示信息
        //   wx.hideLoading();
        // });

      }
    })
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
  onReady: function() {},
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    var that = this
    app.show(that, 'slide1', 0)
    app.slideupshow(that, 'slide_up1', 200, 1)
    app.slideupshow(that, 'slide_up2', 200, 1)
    app.slideupshow(that, 'slide_up3', 200, 1)

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
  mydetaildata: function(openidstr) {

    console.log("获取openid")
    const db = wx.cloud.database()
    const _ = db.command
    db.collection('personal').where({
      _openid: openidstr
    }).get({
      success: res => {
        console.log("获取time", res.data[0].time)
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
  ToRankList: function(e) {
    console.log("id == " + e.currentTarget.id)
    wx.navigateTo({
      url: '../rankList/rankList?id=' + e.currentTarget.id
    })
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
            url: '../personal/personal?id=' + openidstring
          })
        }
      })



    }
  },

  toPersonal: function(e) {


    console.log(e.target.id)

  },
  // 排行榜
  topfourbuttonaction: function(e) {

    console.log(e.currentTarget.id, openidstring)
    wx.navigateTo({

      url: '../rankList/rankList?id=' + e.currentTarget.id + '&shareOpenId=' + openidstring
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
    var openid = wx.getStorageSync('openidstring')
    console.log("mmmp == " + openid)
    wx.navigateTo({
      url: '../rankList/rankList?shareOpenId=' + openidstring
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
    console.log("shareOpenId == " + shareOpenId)
    wx.navigateTo({
      url: '../my/myData?openidstring=' + openidstring + '&shareOpenId=' + shareOpenId
    })
  },
  pensonalAction: function() {

    if (this.data.joinBoll) {
      wx.navigateTo({
        url: '../personal/personal?id=' + openidstring
      })

    } else {
      wx.showToast({
        icon: 'none',
        title: '点击我要参与，加入战队',
        duration: 1000,
        mask: true
      })
    }




  }

})
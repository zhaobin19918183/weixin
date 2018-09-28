// pages/rankList/rankList.js
// pages/home/home.js

var app = getApp()
var showzhandui = false
var openidstring =""
var WxSearch = require('../../wxSearch/wxSearch.js')
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
var openidstring =""
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
    arrayTableData:[],
    // 此页面 页面内容距最顶部的距离
    height: app.globalData.height * 2 + 40,
    display1: 'none',
    display2: 'block',
    myCompanyName:"",
    Myimage: "",
    myCompanyNumber:0,
    myCompanyNumber:0,

    myCenterName: "",
    myCenterNumber: 0,

    myStudionName: "",
    myStudioNumber: 0,
  
    myName:"",
    MyNUmber:0,

    name:"",

    showPersonal:false
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var data = options.id;
    console.log('onLoad===' + data)
    var that = this
    //初始化的时候渲染wxSearchdata
    WxSearch.init(that, 43, ['weappdev', '小程序', 'wxParse', 'wxSearch', 'wxNotification']);
    WxSearch.initMindKeys(['weappdev.com', '微信小程序开发', '微信开发', '微信小程序']);
  },
  wxSearchFn: function (e) {
    var that = this
    const db = wx.cloud.database()
    console.log(that.data.wxSearchData.value)
    // 查询当前用户所有的 counters
    db.collection(this.data.name).where({
      Name: that.data.wxSearchData.value

    }).get({
      success: res => {
        this.setData({
          arrayTableData: res.data
        })
        if (res.data.length == 0 )
        {
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
    console.log("搜索框"+that.data.wxSearchData.value)
    if (that.data.wxSearchData.value == "")
   {
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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (e) {
    var that = this;
     GetList(that);
    // GetTableVIewList(that);
    // that.MyPersionald()
    that.MyData()
    that.MyListData('Branchrankings');
   
  },
   jiaruzhandui: function () {
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
        }
        else {

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
  MyPersionald: function (openidstr)
  {
    console.log("我的排行榜 === " + openidstr)
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
          showPersonal:true

        })
      console.log("我的排行榜数据 ===  "+res.data)
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
  MyListData:function(name)
  {
    const db = wx.cloud.database()
    this.data.name = name
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

  }
  ,
  panghangbang: function (e) {
    console.log(e.target.id)
    var that = this;
    if (e.target.id == 1) {
      that.MyListData('Branchrankings');
      const db = wx.cloud.database()
      // 查询当前用户所有的 counters
      db.collection('personal').where({
        _openid: openidstring
      })
        .get({
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
      })
        .get({
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
      })
        .get({
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

    }
    else
    {
      this.setData({
        showzhandui: false,

      })
    }
    if (e.target.id == 4) {
      const db = wx.cloud.database()
      // 查询当前用户所有的 counters
      db.collection('personal').where({
        _openid: openidstring
      })
        .get({
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

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
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
  onShareAppMessage: function () {
  
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
  MyData: function () {

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

  }
  ,
  pensonalAction: function () {
    wx.navigateTo({
      url: '../personal/personal'
    })
  },
    paihangbang: function () {
    wx.navigateTo({
      url: '../rankList/rankList'
    })
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
  },

})
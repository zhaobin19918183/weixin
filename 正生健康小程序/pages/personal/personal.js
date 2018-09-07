//index.js
//获取应用实例
const app = getApp()
var showAdverst = true
var showCamera = false

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
        message: '服务在中心4排行榜',
        imgurl: "../imgs/img01_05.png",
        numberData: 17000,
        id: 4
      },
      {
        message: '服务在中心4排行榜',
        imgurl: "../imgs/img01_05.png",
        numberData: 17000,
        id: 4
      }

    ]
  })
}
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
  data: {
    nvabarData: {
      showCapsule: 1, //是否显示左上角图标
      title: '慧吃慧动100天', //导航栏 中间的标题
    },
    // 此页面 页面内容距最顶部的距离
    height: app.globalData.height * 2 + 40,
    motto: 'Hello World',
    length: 1,
    show1 : 1,
    flag: true,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {

  },
  onLoad: function(e) {
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
  },
  onShareAppMessage: function(res) {
    return {
      title: '成都多普力-新能源交通领域专业配套服务商',
      // 分享时在路径后拼接参数，可拼接多个参数。 
      path: '/pages/index/index?id=13624249960',
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
  qiandao: function() {
    console.log("签到")
    var that = this;
    if (that.data.show1 == 1)
    {
      that.data.show1 = 2,
      this.setData({
        showAdverst: false,
        showCamera: true
      })
    }
    else
    {
      that.data.show1 = 1,
      this.setData({
  
        showAdverst: true,
        showCamera: false
      })
    }
    
  },
  panghangbang: function(e) {
    console.log(e.target.id)

    if (e.target.id == 1)
   {
     var that = this;
     GetTableVIewList(that);
   }
    if (e.target.id == 2) {
      var that = this;
      GetTableVIewList2(that);
    }

  },
  yiqiandao:function()
  {
    wx.navigateTo({
      url: '../my/myData'
    })

  },
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



})
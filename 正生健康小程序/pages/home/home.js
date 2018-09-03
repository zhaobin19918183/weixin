// pages/home/home.js
var app = getApp()
var rate = 0;
var canvasWidth = 0;
var canvasHeight = 0;
// 获取数据的方法，具体怎么获取列表数据大家自行发挥
var GetList = function (that) {
 
  that.setData({
    arrayData: [{
      message: '分公司排行榜',
      imgurl:"../imgs/img01_05.png",
      id:1
    }, {
      message: '服务中心排行榜',
        imgurl: "../imgs/img01_07.png",
        id: 2
    }
      , {
      message: '工作室排行榜',
        imgurl: "../imgs/img01_09.png",
        id: 3
    }
      , {
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
    show_centent: false,
    if_show: false,
    flag: true,
    radioCheckVal: 0,
    arrayData:[],
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


    // canIUse: wx.canIUse('button.open-type.getUserInfo')
  }
,

  durationChange: function (e) {
    this.setData({
      duration: e.detail.value
    })
  },
  btn: function () {
    var that = this;
    if (!this.data.show_centent) {
      this.setData({
        if_show: true,
        show_centent: true,
      })
    } else {
      that.setData({
         show_centent: false,
         if_show: false,
      })
      
    }

  }
,
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

     
    var that = this;
    console.log("123456"+e.id)
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
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log(23456789)
    var that = this;
    GetList(that);


    setTimeout(function () {
      //要延时执行的代码
      that.startDown();
    }, 1000) //延迟)
    setTimeout(function () {
      //要延时执行的代码
      that.startDown1();
    }, 1500) //延迟)
  },
  startDown: function (e) {
    this.setData({
      isDown: true,
      percent: 2,
    })
  }
  ,
  startDown1: function (e) {
    this.setData({
      isDown1: true,
      percent1: 50,
    })
  }
,
  onReady: function () {

    
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
        wx.showToast(
          { title: '转发成功', icon: 'success', duration: 2000, })
      },
      fail: function (res) { // 转发失败
        console.log("转发失败")
      }
    }
  },
  ToRankList:function(e)
  {
    console.log("id == " + e.currentTarget.id)
    wx.navigateTo({
      url: '../rankList/rankList?id=' + e.currentTarget.id
    })
  }
  ,
  ToRulesView:function(e)
  {
    

   
  },
  getUserInfo: function (e) {
   
  
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true

    })
      
  }
  
  ,
  toReport:function(e)
  {

    console.log(e.target.id)
    wx.navigateTo({
      url: '../report/report'
    })
  }
  ,
  show: function () {

    this.setData({ flag: false })

  },
  //消失

  hide: function () {

    this.setData({ flag: true })

  }
  
  
 
})
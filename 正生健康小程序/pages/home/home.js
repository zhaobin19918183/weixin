// pages/home/home.js
var wxCharts = require('../../utils/wxcharts.js');
var lineChart = null;
var startPos = null;
var app = getApp()
var url = "https://hchd.zeacen.com";
var page = 0;
var page_size = 20;
var sort = "last";
var is_easy = 0;
var lange_id = 0;
var pos_id = 0;
var unlearn = 0;

var rate = 0;
var canvasWidth = 0;
var canvasHeight = 0;

import drawQrcode from '../../utils/weapp.qrcode.esm.js'
// 获取数据的方法，具体怎么获取列表数据大家自行发挥


var GetList = function (that) {
 
  that.setData({
    arrayData: [{
      message: '分公司排行榜',
      imgurl:"../imgs/公司.png",
      id:1
    }, {
      message: '服务中心排行榜',
        imgurl: "../imgs/公司.png",
        id: 2
    }
      , {
      message: '工作室排行榜',
        imgurl: "../imgs/公司.png",
        id: 3
    }
      , {
      message: '个人排行榜',
        imgurl: "../imgs/公司.png",
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
    }

    // canIUse: wx.canIUse('button.open-type.getUserInfo')
  }
,

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
    
    if (app.globalData.userInfo) {
      
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
    
  

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    GetList(that);
    this.rawCircle(2)
  },
  rawCircle: function (step) {
    var context = wx.createCanvasContext('canvasProgress');
    // 设置渐变
    var gradient = context.createLinearGradient(200, 100, 100, 200);
    gradient.addColorStop("0", "#2661DD");
    gradient.addColorStop("0.5", "#40ED94");
    gradient.addColorStop("1.0", "#5956CC");

    context.setLineWidth(10);
    context.setStrokeStyle(gradient);
    context.setLineCap('round')
    context.beginPath();
    // 参数step 为绘制的圆环周长，从0到2为一周 。 -Math.PI / 2 将起始角设在12点钟位置 ，结束角 通过改变 step 的值确定
    context.arc(160, 80, 50, -Math.PI / 2, step * Math.PI - Math.PI / 2, false);
    context.stroke();
    context.draw()
  },
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
   
    if (app.globalData.userInfo)
    {
       wx.navigateTo({
        url: '../personal/personal'
       })
    }
    else
    {
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
        
      })
      wx.navigateTo({
        url: '../personal/personal'
      })
    }
    
  }
  
  ,
  toReport:function(e)
  {

    console.log(e.target.id)
    // wx.navigateTo({
    //   url: '../report/report'
    // })
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
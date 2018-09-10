// pages/rankList/rankList.js
// pages/home/home.js

var app = getApp()
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

    // 此页面 页面内容距最顶部的距离
    height: app.globalData.height * 2 + 40,

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
    console.log(that.data.wxSearchData.value)
    WxSearch.wxSearchAddHisKey(that);

  },
  wxSearchInput: function (e) {
    var that = this
    WxSearch.wxSearchInput(e, that);
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
    GetTableVIewList(that);

   
  }
  ,
  panghangbang: function (e) {
    console.log(e.target.id)

    if (e.target.id == 1) {
      var that = this;
      GetTableVIewList(that);
    }
    if (e.target.id == 2) {
      var that = this;
      GetTableVIewList2(that);
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
    console.log(11111111111111111111111)
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
 //index.js
//获取应用实例
var WxSearch = require('../../wxSearch/wxSearch.js')
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
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    display1: 'none',
    display2: 'block',

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

  onShow: function(e) {
    
    var that = this;
    GetList(that);
    GetTableVIewList(that);
  },
  onShareAppMessage: function (res) {
    wx.login({
      success: function (res) {
        
        var code = res.code; //返回code
        console.log("code === " + code );

      }
    })
    console.log(app.globalData.userInfo)
    return {
      title: '慧吃慧动100天',
      // 分享时在路径后拼接参数，可拼接多个参数。 
      path: '/pages/share/share?id=',
      imageUrl: '../imgs/share.png',
      success: function (res) {
        // 转发成功

        console.log("转发成功")
        wx.showToast({
          title: '转发成功',
          icon: 'success',
          duration: 2000,
        })
      },
      fail: function (res) { // 转发失败
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
    // wx.navigateTo({
    //   url: '../my/myData'
    // })
    var that = this;
    this.bindChooiceProduct()
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
  paihangbang: function () {
    wx.navigateTo({
      url: '../rankList/rankList'
    })
  },
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
  ,
  //  网络申请
  httPrequest: function (type) {
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
      success: function (res) {

      },
      fail: function () {

      }
      ,
      complete: function () {
        //关闭菊花
        if (type == 0) {
          wx.hideLoading()
        } else {
          wx.stopPullDownRefresh()
        }
      }

    })

  }
,
  bindChooiceProduct: function () {
    var that = this;
    wx.chooseImage({
      count: 3,  //最多可以选择的图片总数  
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有  
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
      success: function (res) {
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
            url: '',
            filePath: tempFilePaths[i],
            name: 'uploadfile_ant',
            formData: {
              'imgIndex': i
            },
            header: {
              "Content-Type": "multipart/form-data"
            },
            success: function (res) {
              uploadImgCount++;
              var data = JSON.parse(res.data);
              //服务器返回格式: { "Catalog": "testFolder", "FileName": "1.jpg", "Url": "https://test.com/1.jpg" }  
              //如果是最后一张,则隐藏等待中  
              if (uploadImgCount == tempFilePaths.length) {
                wx.hideToast();
              }
            },
            fail: function (res) {
              wx.hideToast();
              wx.showModal({
                title: '错误提示',
                content: '上传图片失败',
                showCancel: false,
                success: function (res) { }
              })
            }
          });
        }
      }
    });  
    
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
  }

})
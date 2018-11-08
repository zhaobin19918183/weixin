 //index.js
 //获取应用实例
 var WxSearch = require('../../wxSearch/wxSearch.js')
 const app = getApp()
 var showAdverst = true
 var showCamera = false
 var showzhandui = false
var shareNumberWx = 0
 var whetaher = 0
 var qiandaoYes = ""
 var myCompanyId = ""
 var myCenterId = ""
 var myStudioId = ""
 var openidstring = ""
 var arrayTableDataWork = []
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
     dayNumber: 0,
     allNumber: 0,
     allDay: 0,
     nvabarData: {
       showCapsule: 1, //是否显示左上角图标
       title: '慧吃慧动100天', //导航栏 中间的标题
     },
     // 此页面 页面内容距最顶部的距离
     height: app.globalData.height * 2 + 40,
     motto: 'Hello World',
     length: 1,
     show1: 1,
     show2: 1,
     flag: true,
     userInfo: {},
     hasUserInfo: false,
     canIUse: wx.canIUse('button.open-type.getUserInfo'),
     display1: 'none',
     display2: 'block',
     myCompanyName: "",
     Myimage: "",
     myCompanyId: "",
     myCompanyNumber: 0,

     myCenterName: "",
     myCenterNumber: 0,

     myStudionName: "",
     myStudioNumber: 0,

     myName: "",
     MyNUmber: 0,
     name: "",
     showPersonal: false,
     buttonshow: true,
     searchString: "请输入分公司全称进行搜索",
     arrayTableDataWork: [],
     arrayTableDataCenter: [],
     arrayTableDataCompany: [],
     arrayTableDataPersion: [],
     showBool: false,

     startCompany: "",
     startworkroom: "",
     startcenter: "",
     btuBottom: "60px",
     img: [],
     jumpBool:false,
     sharehide:true,


   },
   addTeam: function(e) {
     wx.showToast({
       title: '已经加入战队',
       icon: 'none',
       duration: 2000,
     })

   },
   //事件处理函数
   bindViewTap: function() {

   },
   onLoad: function(options) {
     var that = this
     wx.hideShareMenu()
     wx.getSystemInfo({
       success: function(res) {
         //model中包含着设备信息
         console.log(res.model)
         var model = res.model
         if (model.search('iPhone X') != -1) {
           that.setData({
             btuBottom: "100px"
           })
         } else {
           that.setData({
             btuBottom: "60px",
           })
         }
         if (model.search('iPad') != -1) {
           console.log("iPad Pro 10.5-inch ===ffff= ")
         }
       }
     })

     openidstring = options.id
     this.phb1(1)
     tagValue = 1
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

   wxSearchFn: function(e) {
     var enddate = Y + "-" + M + "-" + D
     app.postAction('https://hchd.zeacen.com/zeacen/wechatapplet/queryInfo', {
       "openId": openidstring,
       "tagValue": tagValue,
       "queryValue": this.data.wxSearchData.value,

     }).then((res) => {


       if (tagValue == 1) {
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

   onShow: function(e) {

     var that = this;
     GetList(that);

     that.MyData()

     that.MyListData('Branchrankings');

   },

   MyData: function() {

     wx.showToast({
       title: '数据载入中....... ',
       icon: 'loading',
       duration: 2000,
     })
     
     app.postAction('https://hchd.zeacen.com/zeacen/wechatapplet/signInQuery', {
       "openId": openidstring,
     }).then((res) => {
       console.log("companyName == =" + res.data.memberRankingList)


       if (res.data.memberInfo.shareNumber == 3) {
         shareNumberWx = 3
         this.setData({
           buttonshow: true,
         })
       } else {
         this.setData({
           buttonshow: false
         })
       }

       if (res.data.memberInfo.joinDate != null) {
         this.setData({
           dayNumber: res.data.memberInfo.joinDate,
           allNumber: res.data.memberInfo.totalIntegral,
           allDay: res.data.memberInfo.continuitySigninDate,
         })
       }

       this.setData({

         startCompany: res.data.memberInfo.companyName,
         startworkroom: res.data.memberInfo.studioName ,
         startcenter: res.data.memberInfo.serviceCentreName
       })
       qiandaoYes = res.data.memberInfo.isWhetaher


       wx.hideLoading();
     }).catch((errMsg) => {
       console.log("错误提示信息joinDate === " + errMsg); //错误提示信息wx.hideLoading();
     });


   },
   showview: function () {
     var that = this;
     this.setData({
       display: "block",
     })

   },
   hideview: function () {
     this.setData({
       display: "none",

     })
   },
   onShareAppMessage: function (res) {
    
     this.shareAppMessage(openidstring)
     return {
       title: '慧吃慧动100天' + "（第" + this.data.dayNumber+"天)",
       // 分享时在路径后拼接参数，可拼接多个参数。 
       path: '/pages/home/home?id=' + openidstring,
       imageUrl: '../imgs/share.png',
       success: function (res) {
        
         console.log("转发成功")
       },
       fail: function (res) { // 转发失败
         
         console.log("转发失败")
       }
     }
   },
   shareAppMessage: function(openid) {

     app.postAction('https://hchd.zeacen.com/zeacen/wechatapplet/share',                                                                                                                                                               {
       "openId": openidstring,
     }).then((res) => {
       console.log('分享完成1   ====== ', res.data)
       this.MyData()
       if (res.data === "分享完成") {
         console.log('分享完成2   ====== ', res.data)
       } else {

         console.log('分享完成3   ====== ', res.data)
       }

       wx.hideLoading();
     }).catch((errMsg) => {
       console.log("错误提示信息 分享完成=== " + errMsg); //错误提示信息wx.hideLoading();
     });

   },
   shareAction: function(openidstr) {
     this.jifeng(openidstr)
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
     
     if (qiandaoYes == "1") {

       wx.showToast({
         title: '已经签到',
         icon: 'succes',
         duration: 1000,
         mask: true
       })
     } else {
       this.setData({
         showAdverst: false,
         showCamera: true
       })

     }
     if (this.data.showBool) {
       console.log("签到", openidstring)
      //  this.setData({
      //    jumpBool: true
      //  })
       var enddate = Y + "-" + M + "-" + D
       app.postAction('https://hchd.zeacen.com/zeacen/wechatapplet/signIn', {
         "openId": openidstring,
         "time": enddate,
       }).then((res) => {

         wx.showToast({
           title: '签到成功',
           icon: 'success',
           duration: 2000,
         })

         wx.navigateTo({
           url: '../home/home'
         })

         wx.hideLoading();
       }).catch((errMsg) => {
         console.log("错误提示信息joinDate === " + errMsg); //错误提示信息wx.hideLoading();
       });

     }


     if (this.data.showBool == false) {
       if (qiandaoYes == "0") {
         this.data.showBool = true
       }

     }


    //  if (!this.data.jumpBool)
    //  {
       
      
    //  }
    //  else
    //  {
    //    wx.showToast({
    //      icon: 'none',
    //      title: '请勿重复点击'
    //    })
    //  }




   },

   MyListData: function(name) {
       this.data.name = name
       const db = wx.cloud.database()
       // 查询当前用户所有的 counters
       console.log('[数据库] 签到成功===  ', name, )
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
   panghangbang: function(e) {
     var data = e.target.id
     this.phb1(data)
   },
   phb1: function(data) {
     wx.showToast({
       title: '数据载入中....... ',
       icon: 'loading',
       duration: 5000,
     })
     var that = this;
     if (data == 1) {
       tagValue = 1
       //https://hchd.zeacen.com/zeacen/wechatapplet/rankingList
       console.log("openidstring" + openidstring)
       app.postAction('https://hchd.zeacen.com/zeacen/wechatapplet/rankingList', {
         "openId": openidstring,
         "tagValue": tagValue
       }).then((res) => {

         var data = res.data.companyRankingList;

         // var personal = JSON.parse(res.json_personalData);

         wx.hideLoading();
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
             showPersonal: true
           })
         }
         wx.hideLoading();
       }).catch((errMsg) => {
         console.log("错误提示信息 === " + errMsg); //错误提示信息wx.hideLoading();
       });


     }
     if (data == 2) {
       tagValue = 2
       app.postAction('https://hchd.zeacen.com/zeacen/wechatapplet/rankingList', {
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
             showPersonal: true
           })
         }



         wx.hideLoading();
       }).catch((errMsg) => {
         console.log("错误提示信息 === " + errMsg); //错误提示信息wx.hideLoading();
       });

     }
     if (data == 3) {
       tagValue = 3
       app.postAction('https://hchd.zeacen.com/zeacen/wechatapplet/rankingList', {
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
       tagValue = 4
       app.postAction('https://hchd.zeacen.com/zeacen/wechatapplet/rankingList', {
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

         if (res.data.memberInfo != null) {
           this.setData({
             myCompanyName: res.data.memberInfo.memberName,
             myCompanyNumber: res.data.memberInfo.memberIntegral,
             Myimage: res.data.memberInfo.memberImage,
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


   MyPersional: function(openidstr) {
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
           showPersonal: true

         })
         console.log(res.data[0].share)
         if (res.data[0].share == 3) {

           this.setData({
             buttonshow: true,
           })
         } else {
           this.setData({
             buttonshow: false
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
   paihangbang: function() {
     wx.navigateTo({
       url: '../rankList/rankList?shareOpenId=' + openidstring
     })
   },
   mydataAction: function() {
     console.log("我的 1111== " + openidstring)
     wx.navigateTo({
       url: '../my/myData?openidstring=' + openidstring
     })
   },
   pensonalAction: function() {
     wx.navigateTo({
       url: '../personal/personal'
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
   imageslect: function(openid) {

    
       wx.showLoading({
         title: '加载中...',
       })
       var that = this;
       wx.chooseImage({
         count: 1, //最多可以选择的图片总数  
         sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有  
         sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
         success: function (res) {
           // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片  
           var tempFilesSize = res.tempFiles[0].size; //获取图片的大小，单位B
           console.log("tempFilesSize" + tempFilesSize)
           if (tempFilesSize <= 1000000) { //图片小于或者等于2M时 1可以执行获取图片
             var tempFilePaths = res.tempFilePaths[0]; //获取图片
             that.data.img.push(tempFilePaths); //添加到数组
             that.setData({
               img: that.data.img
             })
           } else { //图片大于2M，弹出一个提示框
             wx.showToast({
               title: '上传图片不能大于1M!', //标题
               icon: 'none' //图标 none不使用图标，详情看官方文档
             })
           }
           //启动上传等待中...  
           var uploadImgCount = 0;
           var enddate = Y + "-" + M + "-" + D
           for (var i = 0, h = that.data.img.length; i < h; i++) {
             wx.uploadFile({
               url: 'https://hchd.zeacen.com/zeacen/wechatapplet/pictureSignIn',
               filePath: that.data.img[i],
               name: 'uploadfile',
               formData: {
                 "openId": openidstring,
                 'time': enddate,
               },
               header: {
                 "Content-Type": "multipart/form-data",
               },
               success: function (res) {

                 var data = JSON.parse(res.data);
                 console.log(data.resultcode)
                 if (data.resultcode == 0) {
                   wx.showToast({
                     title: '图片上传失败',
                     icon: 'error',
                     duration: 2000,
                   })
                 } else {
                   wx.showToast({
                     title: '签到成功',
                     icon: 'success',
                     duration: 2000,
                   })

                 }
                 wx.navigateTo({
                   url: '/pages/home/home'
                 })

               },
               fail: function (res) {
                 console.log(res)
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
   

    

   },

 })
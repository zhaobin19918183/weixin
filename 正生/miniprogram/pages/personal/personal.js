 //index.js
 //获取应用实例
 var WxSearch = require('../../wxSearch/wxSearch.js')
 const app = getApp()
 var showAdverst = true
 var showCamera = false
 var showzhandui = false
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

     startCompany:"",
     startworkroom: "",
     startcenter: "",
     btuBottom: "60px",


   },
   //事件处理函数
   bindViewTap: function() {

   },
   onLoad: function(options) {
  var that = this
   wx.getSystemInfo({
       success: function (res) {
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

   wxSearchFn: function (e) {
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

     // var that = this
     // const db = wx.cloud.database()
     // // 查询当前用户所有的 counters
     // db.collection(this.data.name).where({
     //   Name: that.data.wxSearchData.value

     // }).get({
     //   success: res => {
     //     this.setData({
     //       arrayTableData: res.data
     //     })
     //     if (res.data.length == 0) {
     //       wx.showToast({
     //         icon: 'none',
     //         title: '查询数据为空，请检查查询条件'
     //       })
     //     }
     //     console.log('[数据库] 签到成功===  ', res.data)

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

         this.setData({
           buttonshow: true,
         })
       }
       else {
         this.setData({
           buttonshow: false
         })
       }
      
       if (res.data.memberInfo.joinDate!=null)
      {
         this.setData({
           dayNumber: res.data.memberInfo.joinDate,
           allNumber: res.data.memberInfo.totalIntegral,
           allDay: res.data.memberInfo.continuitySigninDate,
         })
      }

       this.setData({

         startCompany: res.data.memberInfo.companyName,
         startworkroom: res.data.memberInfo.serviceCentreName,
         startcenter: res.data.memberInfo.studioName
       })
       qiandaoYes = res.data.memberInfo.isWhetaher


       wx.hideLoading();
     }).catch((errMsg) => {
       console.log("错误提示信息joinDate === " + errMsg); //错误提示信息wx.hideLoading();
     });


   },
   onShareAppMessage: function(res) {
     this.shareAppMessage(openidstring)
     return {
       title: '慧吃慧动100天',
       // 分享时在路径后拼接参数，可拼接多个参数。 
       path: '/pages/home/home?id=' + openidstring,
       imageUrl: '../imgs/share.png',
       success: function(res) {
         // 转发成功

         console.log("转发成功")
         wx.showToast({
           title: "转发成功",
           icon: 'success',
           duration: 2000,
         })
       },
       fail: function(res) { // 转发失败
         console.log("转发失败")

       }
     }
   },
   shareAppMessage: function (openid) {

     app.postAction('https://hchd.zeacen.com/zeacen/wechatapplet/share', {
       "openId": openidstring,
     }).then((res) => {
       console.log('分享完成1   ====== ', res.data)
       this.MyData()
       if (res.data === "分享完成") {
         console.log('分享完成2   ====== ', res.data)
       }
       else {

         console.log('分享完成3   ====== ', res.data)
       }

       wx.hideLoading();
     }).catch((errMsg) => {
       console.log("错误提示信息 分享完成=== " + errMsg); //错误提示信息wx.hideLoading();
     });

   }
   ,
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
       if (qiandaoYes == "0")
       {
         this.data.showBool = true
       }
      
     }
     
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
   phb1: function (data) {
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
   bindChooiceProduct: function() {
     var random = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z');
     var code = ""
     var codeLength = 4;
     for (var i = 0; i < codeLength; i++) {

       //设置随机数范围,这设置为0 ~ 36

       var index = Math.floor(Math.random() * 36);

       //字符串拼接 将每次随机的字符 进行拼接

       code += random[index];

     }

     wx.chooseImage({
       count: 1, // 最多可以选择的图片张数，默认9
       sizeType: ['compressed'], // original 原图，compressed 压缩图，默认二者都有
       sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
       success: chooseResult => {
         // 将图片上传至云存储空间
         wx.cloud.uploadFile({
           // 指定上传到的云路径
           cloudPath: code + '.png',
           // 指定要上传的文件的小程序临时文件路径
           filePath: chooseResult.tempFilePaths[0],
           // 成功回调
           success: res => {
             console.log('上传成功', res.fileID)
             var imageurl = res.fileID
             const db = wx.cloud.database()
             const _ = db.command
             wx.showToast({
               title: '图片上传中',
               icon: 'loading',
               duration: 10000
             })
             wx.cloud.callFunction({
               name: 'login',
               data: {},
               success: res => {
                 console.log('[云函数] [login] user openid: ', res.result.openid)
                 db.collection('personal').where({
                     _openid: res.result.openid
                   })
                   .get({
                     success: function(res) {
                       var enddate = Y + "-" + M + "-" + D
                       var allday = res.data[0].allDay
                       var updateNumber = 20 + allday * 20
                       db.collection('personal').doc(res.data[0]._id).update({
                         // data 传入需要局部更新的数据
                         data: {
                           whetaher: 1,
                           MyCenterNumber: _.inc(updateNumber),
                           MyCompanyNumber: _.inc(updateNumber),
                           MyWorkRoomNumber: _.inc(updateNumber),
                           MyNumber: _.inc(updateNumber),
                           imageArray: _.push(imageurl),
                           number: _.inc(updateNumber),
                           day: _.inc(1),
                           allDay: _.inc(1),
                           time: enddate

                         }

                       }).then 
                       {
                         that.MyBranchrankings()
                         that.MyServiceCenterrankings()
                         that.MyStudioRankings()

                       }
                     }
                   })
                 wx.navigateTo({
                   url: '../home/home'
                 })


               },
               fail: err => {
                 console.error('[云函数] [login] 调用失败', err)
               }
             })

           },
         })
       },
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
         var enddate = Y + "-" + M + "-" + D
         // 'content-type': 'application/json'
         for (var i = 0, h = tempFilePaths.length; i < h; i++) {
           wx.uploadFile({
             url: 'https://hchd.zeacen.com/zeacen/wechatapplet/pictureSignIn',
             filePath: tempFilePaths[i],
             name: 'uploadfile',
             formData: {
               "openId": openidstring,
               'time': enddate,
             },
             header: {
               
               "Content-Type": "multipart/form-data",

             },
             success: function(res) {
               wx.showToast({
                 title: '签到成功',
                 icon: 'success',
                 duration: 2000,
               })

               wx.navigateTo({
                 url: '/pages/home/home'
               })
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

 })
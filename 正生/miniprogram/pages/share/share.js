// miniprogram/pages/share/share.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shareOpenId : "",
    joinDate: 0,
    totalIntegral: 0,
    continuitySigninDate: 0,
    avatarUrl:"../imgs/img01_38.png",
    nickName:"小四爷",
    nvabarData: {
      showCapsule: 1, //是否显示左上角图标
      title: '慧吃慧动100天', //导航栏 中间的标题
    },
    rownum:"",

    workroomName:"",
    workroomRowNum: "",
    workroomNumber: "",

    centerName: "",
    centerRowNum: "",
    centerNumber: "",

    companyName: "",
    companyRowNum: "",
    companyNumber: "",
    dayNumber: 0,
    allNumber: 0,
    allDay: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    if (options.id) {
      that.setData({
        shareOpenId : options.id
      })
      this.shareData(options.id)
      console.log("onLoad share")
    
    }
   
  },
  shareData:function(openid)
  {
    console.log("openid=== " + openid)
    wx.showLoading({
      title: "数据加载中",
      mask: true
    });
    app.postAction('http://192.168.8.87:8082/wechatapplet/sharingDetail', {
      "openId": openid,
    }).then((res) => {

      console.log("sharingDetail=== " + res.data.memberSharingDetail.memberName)
      if (res.data.memberSharingDetail.joinDate != null) {

        this.setData({
          avatarUrl: res.data.memberSharingDetail.memberImage,
          nickName: res.data.memberSharingDetail.memberName,
          joinDate: res.data.memberSharingDetail.joinDate,
          totalIntegral: res.data.memberSharingDetail.totalIntegral,
          continuitySigninDate: res.data.memberSharingDetail.continuitySigninDate,
          rownum: res.data.memberSharingDetail.rownum,

          workroomName: res.data.myRecord.studioName,
          workroomRowNum: res.data.myRecord.studioRowNum,
          workroomNumber: res.data.myRecord.studioIntegral,

          centerName: res.data.myRecord.serviceCentreName,
          centerRowNum: res.data.myRecord.serviceCentreRowNum,
          centerNumber: res.data.myRecord.serviceCentreIntegral,

          companyName: res.data.myRecord.companyName,
          companyRowNum: res.data.myRecord.companyRowNum,
          companyNumber: res.data.myRecord.companyIntegral,
        })
      }
      setTimeout(() => {
        wx.hideLoading();
      }, 100);

    }).catch((errMsg) => {
      console.log("错误提示信息 === " + errMsg); //错误提示信息wx.hideLoading();
    });
  }
  ,
  backToHome:function()
  {
    wx.redirectTo({
      url: '/pages/home/home?share='+"分享"
    })
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
  onShow: function () {
    //o8AIv5e98JLhxTAIcEhIAbT0rDlA
    // this.shareData("o8AIv5e98JLhxTAIcEhIAbT0rDlA")
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

})
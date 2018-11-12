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
    avatarUrl:"",
    nickName:"",
    nvabarData: {
      showCapsule: 1, //是否显示左上角图标
      title: '慧吃慧动100天', //导航栏 中间的标题
    },

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
      // that.shareData(options.id)
      console.log("shareOpenId=== " + this.data.shareOpenId)
    }
   
  },
  shareData:function(openid)
  {
    wx.showLoading({
      title: "数据加载中",
      mask: true
    });
    app.postAction('https://hchd.zeacen.com/zeacen/wechatapplet/myInfo', {
      "openId": openid,
    }).then((res) => {

      if (res.data.memberInfo.joinDate != null) {

        this.setData({
          joinDate: res.data.memberInfo.joinDate,
          totalIntegral: res.data.memberInfo.totalIntegral,
          continuitySigninDate: res.data.memberInfo.continuitySigninDate,
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
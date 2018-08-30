//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    length:1,
    flag:true,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function () {

  },
  onLoad: function (e) {

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
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
  ,

  onShareAppMessage: function (res) {
    return {
      title: '成都多普力-新能源交通领域专业配套服务商',
      // 分享时在路径后拼接参数，可拼接多个参数。 
      path: '/pages/index/index?id=13624249960',
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
  }
  , show: function () {

    this.setData({ flag: false })

  },
  //消失

  hide: function () {

    this.setData({ flag: true })

  }





})

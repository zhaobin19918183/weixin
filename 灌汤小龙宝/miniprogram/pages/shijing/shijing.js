// miniprogram/pages/shijing/shijing.js
var count1 = 0;
var count2 = 0;
var count3 = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    queryResult: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  searchGF: function () {
    count1 = count1 + 10
    console.log("count == " + count1)
    const db = wx.cloud.database()
    // 查询当前用户所有的 counters
    db.collection('shijing').where({
      chapter: '国风'
    })
      .skip(count1) // 跳过结果集中的前 10 条，从第 11 条开始返回
      .limit(10) // 限制返回数量为 10 条  
      .get({
        success: res => {
          this.setData({
            queryResult: JSON.stringify(res.data, null, 2)
          })
          console.log('[数据库] [查询记录] 成功: ', res)
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
  searchXY: function () {
    count2 = count2 + 10
    console.log("count == " + count2)
    const db = wx.cloud.database()
    // 查询当前用户所有的 counters
    db.collection('shijing').where({
      chapter: '小雅'
    })
      .skip(count2) // 跳过结果集中的前 10 条，从第 11 条开始返回
      .limit(10) // 限制返回数量为 10 条  
      .get({
        success: res => {
          this.setData({
            queryResult: JSON.stringify(res.data, null, 2)
          })
          console.log('[数据库] [查询记录] 成功: ', res)
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
  searchLS: function () {
    count3 = count3 + 10
    console.log("count3 == " + count3)
    const db = wx.cloud.database()
    // 查询当前用户所有的 
    db.collection('shijing').where({
      chapter: '周颂'
    })
      .skip(count3) // 跳过结果集中的前 10 条，从第 11 条开始返回
      .limit(10) // 限制返回数量为 10 条  
      .get({
        success: res => {
          this.setData({
            queryResult: JSON.stringify(res.data, null, 2)
          })
          console.log('[数据库] [查询记录] 成功: ', res)
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
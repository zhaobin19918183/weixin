// gongzi/gongzi.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dates: [
          { "data_name": "30", "name": "十三" },
          { "data_name": "1", "name": "十四" },
          { "data_name": "2", "name": "十五" },
          { "data_name": "3", "name": "十六" },
          { "data_name": "4", "name": "十七" },
          { "data_name": "5", "name": "十八" },
          { "data_name": "6", "name": "十九" },
          { "data_name": "7", "name": "二十" },
          { "data_name": "8", "name": "廿一" },
          { "data_name": "9", "name": "廿二" },
          { "data_name": "10", "name": "廿三" },
           { "data_name": "11", "name": "廿四" },
           { "data_name": "12", "name": "廿五" },
           { "data_name": "13", "name": "廿六" },
           { "data_name": "14", "name": "廿七" }
],
array:[
  { "key": "养老保险", "value1": "1000","value2": "2000", "value3": "3000" },
  { "key": "医疗保险", "value1": "1000", "value2": "2000", "value3": "3000" },
  { "key": "工伤保险", "value1": "1000", "value2": "2000", "value3": "3000" },
  { "key": "失业保险", "value1": "1000", "value2": "2000", "value3": "3000" },
  { "key": "生育保险", "value1": "1000", "value2": "2000", "value3": "3000" },
],


       state: ''
  },

  select_date: function (e) {
    this.setData({
           state: e.currentTarget.dataset.key,
          });
    
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
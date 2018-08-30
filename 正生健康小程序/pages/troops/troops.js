// pages/troops/troops.js
var GetList = function (that) {
  console.log("asdfgyj")
  that.setData({
    arrayData: [{
      message: 'foo1111',
    }, {
      message: 'bar22222'
    }
      , {
      message: 'bar22222'
    }
      , {
      message: 'bar22222'
    }
      , {
      message: 'bar22222'
    }
      , {
      message: 'bar22222'
    }
      , {
      message: 'bar22222'
    }
      , {
      message: 'bar22222'
    }, {
      message: 'bar22222'
    }
      , {
      message: 'bar22222'
    }
      , {
      message: 'bar22222'
    }
      , {
      message: 'bar22222'
    }
      , {
      message: 'bar22222'
    }
      , {
      message: 'bar22222'
    }
      , {
      message: 'bar22222'
    }, {
      message: 'bar22222'
    }, {
      message: 'bar22222'
    }, {
      message: 'bar22222'
    }, {
      message: 'bar22222'
    }, {
      message: 'bar22222'
    }, {
      message: 'bar22222'
    }, {
      message: 'bar22222'
    }, {
      message: 'bar22222'
    }, {
      message: 'bar22222'
    }, {
      message: 'bar22222'
    }, {
      message: 'bar22222'
    }


    ]
  })
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag: true,
    radioCheckVal: 0,
    arrayData: []
  },
  
  radioCheckedChange: function (e) {
    console.log(e.detail.value)
    var that = this;
    GetList(that);
    this.setData({
      radioCheckVal: e.detail.value
    })
  },
  toClock:function()
  {
    wx.navigateTo({
      url: '../clockIn/clockIn'
    })
  }
  ,
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
    var that = this;
    GetList(that);
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
  show: function () {

    this.setData({ flag: false })

  },
  //消失

  hide: function () {

    this.setData({ flag: true })

  }
})
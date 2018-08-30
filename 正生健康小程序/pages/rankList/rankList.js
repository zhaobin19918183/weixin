// pages/rankList/rankList.js
// pages/home/home.js
var app = getApp()
var url = "http://www.imooc.com/course/ajaxlist";
var page = 0;
var page_size = 20;
var sort = "last";
var is_easy = 0;
var lange_id = 0;
var pos_id = 0;
var unlearn = 0;
11
import drawQrcode from '../../utils/weapp.qrcode.esm.js'
// 获取数据的方法，具体怎么获取列表数据大家自行发挥
var GetLis1t = function (that) {
  that.setData({
    hidden: false
  });
  wx.request({
    url: url,
    data: {
      page: page,
      page_size: page_size,
      sort: sort,
      is_easy: is_easy,
      lange_id: lange_id,
      pos_id: pos_id,
      unlearn: unlearn

    },
    success: function (res) {
      //console.info(that.data.list);
      var list = that.data.list;
      for (var i = 0; i < res.data.list.length; i++) {
        list.push(res.data.list[i]);

      }
      that.setData({
        list: list

      });
      page++;
      that.setData({
        hidden: true

      });
    }

  });

}
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
    title: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      title: options.id
    }) 
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
})
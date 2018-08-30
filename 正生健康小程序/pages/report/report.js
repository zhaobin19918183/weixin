var wxCharts = require('../../utils/wxcharts.js');
var ringChart = null;
var lineChart = null;
const app = getApp();
var rate = 0;
var doubleColumnCanvasWidth = 0;
var doubleColumnCanvasHeight = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    doubleColumnCanvasData: {
      canvasId: 'doubleColumn',
    },
    doubleColumnTitle: "广告统计",
    doubleColumnUnit: [{
      color: "#13CE66",
      title: "展现量"
    },
    {
      color: "#FFA848",
      title: "点击率"
      },
      {
        color: "#FFA848",
        title: "点击率"
      }
    ]
  },
  createSimulationData: function () {
    var categories = [];
    var data = [];
    for (var i = 0; i < 10; i++) {
      categories.push('2016-' + (i + 1));
      data.push(Math.random() * (20 - 10) + 10);
    }
    // data[4] = null;
    return {
      categories: categories,
      data: data
    }
  },

  touchHandler: function (e) {
    console.log(ringChart.getCurrentDataIndex(e));
  },

  onReady: function (e) {
  this.kongxintu();
  }
  ,

  kongxintu:function()
  {
      var windowWidth = 320;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }

    ringChart = new wxCharts({
      animation: true,
      canvasId: 'ringCanvas',
      type: 'ring',
      extra: {
        ringWidth: 25,
        pie: {
          offsetAngle: -45
        }
      },
      title: {
        name: '70%',
        color: '#7cb5ec',
        fontSize: 25
      },
      subtitle: {
        name: '收益率',
        color: '#666666',
        fontSize: 15
      },
      series: [{
        name: '成交量1',
        data: 15,
        stroke: false
      }, {
        name: '成交量2',
        data: 35,
        stroke: false
      }, {
        name: '成交量3',
        data: 78,
        stroke: false
      }, {
        name: '成交量4',
        data: 63,
        stroke: false
      }],
      disablePieStroke: true,
      width: windowWidth,
      height: 200,
      dataLabel: false,
      legend: false,
      background: '#f5f5f5',
      padding: 0
    });
    ringChart.addEventListener('renderComplete', () => {
      console.log('renderComplete');
    });
    setTimeout(() => {
      ringChart.stopAnimation();
    }, 500);
  }
  ,

  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
    this.zhexiantu(options);
    this.zhuzhuangtu();
    this.bingzhuangtu();
  },
  zhexiantu:function(e)
  {
    var windowWidth = 320;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }

    var simulationData = this.createSimulationData();
    lineChart = new wxCharts({
      canvasId: 'lineCanvas',
      type: 'line',
      categories: simulationData.categories,
      animation: true,
      // background: '#f5f5f5',
      series: [{
        name: '成交量1',
        data: simulationData.data,
        format: function (val, name) {
          return val.toFixed(2) + '万';
        }
      }, {
        name: '成交量2',
        data: [2, 0, 0, 3, 6, 4, 0, 0, 2, 0],
        format: function (val, name) {
          return val.toFixed(2) + '万';
        }
      },
        {
          name: '成交量3',
          data: [3, 4, 60, 5, 8, 2, 1, 1, 4, 5],
          format: function (val, name) {
            return val.toFixed(2) + '万';
          }
        }
        ,
        {
          name: '成交量4',
          data: [1, 2, 3, 4, 5, 20, 10, 10, 40, 50],
          format: function (val, name) {
            return val.toFixed(2) + '万';
          }
        }
      
      ],
      xAxis: {
        disableGrid: true
      },
      yAxis: {
        title: '成交金额 (万元)',
        format: function (val) {
          return val.toFixed(2);
        },
        min: 0
      },
      width: windowWidth,
      height: 200,
      dataLabel: false,
      dataPointShape: true,
      extra: {
        lineStyle: 'curve'
      }
    });
  }
  ,
  zhuzhuangtu:function()
  {
    var imageWidth = wx.getSystemInfoSync().windowWidth
    rate = imageWidth / 750;
    var updateData = {};
    doubleColumnCanvasWidth = imageWidth - rate * 64;
    doubleColumnCanvasHeight = rate * 304 + rate * 20 + rate * 32 + rate * 24;
    var doubleColumnYMax = 0;
    var doubleColumnYMin = 0;
    updateData['doubleColumnCanvasData.canvasWidth'] = doubleColumnCanvasWidth;
    updateData['doubleColumnCanvasData.axisPadd'] = {
      left: rate * 10,
      top: rate * 20,
      right: rate * 10
    };
    updateData['doubleColumnCanvasData.axisMargin'] = {
      bottom: rate * 32,
      left: rate * 20,
      right: rate * 20
    };
    updateData['doubleColumnCanvasData.yAxis.fontSize'] = rate * 22;
    updateData['doubleColumnCanvasData.yAxis.fontColor'] = '#637280';
    updateData['doubleColumnCanvasData.yAxis.lineColor'] = '#DCE0E6';
    updateData['doubleColumnCanvasData.yAxis.lineWidth'] = rate * 2;
    updateData['doubleColumnCanvasData.yAxis.dataWidth'] = rate * 62;
    updateData['doubleColumnCanvasData.yAxis.isShow'] = true;
    updateData['doubleColumnCanvasData.yAxis.isDash'] = true;
    updateData['doubleColumnCanvasData.yAxis.minData'] = doubleColumnYMin;
    updateData['doubleColumnCanvasData.yAxis.maxData'] = doubleColumnYMax;
    updateData['doubleColumnCanvasData.yAxis.padd'] = rate * 304 / (doubleColumnYMax - doubleColumnYMin);

    updateData['doubleColumnCanvasData.xAxis.dataHeight'] = rate * 26;
    updateData['doubleColumnCanvasData.xAxis.fontSize'] = rate * 22;
    updateData['doubleColumnCanvasData.xAxis.fontColor'] = '#637280';
    updateData['doubleColumnCanvasData.xAxis.lineColor'] = '#DCE0E6';
    updateData['doubleColumnCanvasData.xAxis.lineWidth'] = rate * 2;
    updateData['doubleColumnCanvasData.xAxis.padd'] = rate * 132;
    updateData['doubleColumnCanvasData.xAxis.dataWidth'] = rate * 48;
    updateData['doubleColumnCanvasData.xAxis.leftOffset'] = rate * 48;


    updateData['doubleColumnCanvasData.canvasHeight'] = doubleColumnCanvasHeight;
    updateData['doubleColumnCanvasData.enableScroll'] = false;


    updateData['doubleColumnCanvasData.point'] = {
      bColor: "#FFA848",
      sClor: "#FFFFFF",
      size: rate * 4,
      isShow: true
    };
    updateData['doubleColumnCanvasData.touchDetail.width'] = rate * 144;
    updateData['doubleColumnCanvasData.touchDetail.height'] = rate * 149;
    updateData['doubleColumnCanvasData.touchDetail.fontSize'] = rate * 20;
    updateData['doubleColumnCanvasData.touchDetail.fontColor'] = '#ffffff';
    updateData['doubleColumnCanvasData.touchDetail.padd'] = rate * 12;
    updateData['doubleColumnCanvasData.touchDetail.bgColor'] = "#637280";
    updateData['doubleColumnCanvasData.touchDetail.lineSpacingExtra'] = rate * 12;
    let doubleCloumnRightYAxisData = [];
    let doubleCloumnRightYMax = 0;
    let doubleCloumnRightYMin = 0;
    let doubleCloumnRatio = 1;

    let doubleColumnSeries = {
      cloumnData: {
        data: [{
          axis: [{
            x: "搜索类",
            y: "100",
            columnStartColor: "#3DB2FF",
            columnEndColor: "#0077FF"
          },
          {
            x: "搜索类",
            y: "80",
            columnStartColor: "#2BE99F",
            columnEndColor: "#13CE66"
          }
            ,
          {
            x: "搜索类",
            y: "180",
            columnStartColor: "#2BE99F",
            columnEndColor: "#13CE66"
          }
          ],
          x: '搜索类',
          y: 100,
          title: "搜索类|展现量10000|点击量:1000|点击率:10%"
        },
        {
          axis: [{
            x: "资讯类",
            y: "930",
            columnStartColor: "#3DB2FF",
            columnEndColor: "#0077FF"
          },
          {
            x: "资讯类",
            y: "730",
            columnStartColor: "#2BE99F",
            columnEndColor: "#13CE66"
          }
          ],
          x: '资讯类',
          y: 930,
          title: "资讯类|展现量:10000|点击量:1000|点击率:10%"
        },
        {
          axis: [{
            x: "社交类",
            y: "430",
            columnStartColor: "#3DB2FF",
            columnEndColor: "#0077FF"
          },
          {
            x: "社交类",
            y: "530",
            columnStartColor: "#2BE99F",
            columnEndColor: "#13CE66"
          }
          ],
          x: '社交类',
          y: 430,
          title: "社交类|展现量:10000|点击量:1000|点击率:10%"
        },

        ],
        columnStartColor: "#2BE99F",
        columnEndColor: "#13CE66"
      }
    };
    let doubleColumnXAxisData = [{
      x: '搜索类',
      y: 0,
      title: "搜索类"
    },
    {
      x: '资讯类',
      y: 0,
      title: "资讯类"
    },
    {
      x: '社交类',
      y: 0,
      title: "社交类"
    },
    ];
    let doubleColumnYAxisData = [];
    doubleColumnYMax = 1000;
    doubleColumnYMin = 0;
    doubleColumnYMax = this.getYMax(doubleColumnYMax);
    doubleColumnYAxisData = this.getYAxiss(doubleColumnYMax);

    doubleCloumnRightYMax = this.getYMax(6.0 * 100);
    doubleCloumnRatio = doubleColumnYMax / doubleCloumnRightYMax;

    updateData['doubleColumnCanvasData.yAxis.minData'] = doubleColumnYMin;
    updateData['doubleColumnCanvasData.yAxis.maxData'] = doubleColumnYMax;
    updateData['doubleColumnCanvasData.series'] = doubleColumnSeries;
    updateData['doubleColumnCanvasData.xAxis.data'] = doubleColumnXAxisData;
    updateData['doubleColumnCanvasData.yAxis.data'] = doubleColumnYAxisData;
    updateData['doubleColumnCanvasData.yAxis.rightData'] = doubleCloumnRightYAxisData;
    updateData['doubleColumnCanvasData.yAxis.padd'] = rate * 304 / (doubleColumnYMax - doubleColumnYMin);
    this.setData(updateData);
  },
  bingzhuangtu:function()
  {

    var context = wx.createCanvasContext('Canvas');
    var array = [50, 50, 60];
    var colors = ["#228B22", "#008B8B", "#ADFF2F"];
    var total = 0;
    for (var val = 0; val < array.length; val++) {
      total += array[val];
    }
    var point = { x: 160, y: 120 };
    var radius = 100;
    for (var i = 0; i < array.length; i++) {
      context.beginPath();
      var start = 0;
      if (i > 0) {
        for (var j = 0; j < i; j++) {
          start += array[j] / total * 2 * Math.PI;
        }
      }
      context.arc(point.x, point.y, radius, start, start + array[i] / total * 2 * Math.PI, false);
      context.setLineWidth(2)
      context.lineTo(point.x, point.y);
      context.setStrokeStyle('#F5F5F5');
      context.setFillStyle(colors[i]);
      context.fill();
      context.closePath();
      context.stroke();
    }
  
     context.draw();
    
  }
  
,
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log("22222");
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

  },

  /**
   * 获得y轴最大值
   * @param  {[type]} yMax 当前最大值
   * @return {[type]}      [description]
   */
  getYMax: function (yMax) {
    let maxInt = Math.floor(yMax);
    let maxLength = maxInt.toString().length;
    let interval = 0;
    if (maxInt == 0) {
      interval = 3 * Math.pow(10, 1);
    } else {
      if (maxLength > 3) {
        interval = 3 * Math.pow(10, maxLength - 2);
      } else {
        interval = 3 * Math.pow(10, maxLength - 1);
      }
    }

    let remainder = maxInt % interval;
    let conversionMax = ((maxInt - remainder) / interval + 1) * interval;
    return conversionMax;
  },

  /**
   * 获得y轴数组
   * @param  {[type]} yMax y轴最大值
   * @return {[type]}      [description]
   */
  getYAxiss: function (yMax) {
    let yAxisData = [];

    let avg = yMax / 3;

    let point = {};
    point.x = 0;
    point.y = 0;
    point.title = '0'
    yAxisData.push(point);

    let point1 = {};
    point1.x = 0;
    point1.y = Math.floor(avg);
    point1.title = Math.floor(avg);
    yAxisData.push(point1);

    let point2 = {};
    point2.x = 0;
    point2.y = Math.floor(avg) * 2;;
    point2.title = Math.floor(avg) * 2;
    yAxisData.push(point2);

    let point3 = {};
    point3.x = 0;
    point3.y = Math.floor(avg) * 3;
    point3.title = Math.floor(avg) * 3;
    yAxisData.push(point3);
    return yAxisData;
  }

})
















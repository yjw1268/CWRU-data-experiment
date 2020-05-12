import * as echarts from '../../ec-canvas/echarts.min.js';
import Toast from '../../dist/toast/toast';

const app = getApp();
function initChart(canvas, width, height, dpr) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);
  var option = {
    background: 'none',
    color: ["#37A2DA", "#32C5E9", "#67E0E3", "#91F2DE", "#FFDB5C", "#FF9F7F"],
    series: [{
      label: {
        normal: {
          show: true,
          fontSize: 14,
          formatter:'{b}\n{c}'
        }
      },
      grid: {
        left:0,
        top:0,
        right:0,
        bottom:0
      },
      type: 'pie',
      radius: '70%',
      data: [{
          value: app.globalData.list.num_label0,
          name: 'Normal'
        }, {
          value: app.globalData.list.num_label1,
          name: 'Ball'
        }, {
          value: app.globalData.list.num_label2,
          name: 'OuterRace'
        }, {
          value: app.globalData.list.num_label3,
          name: 'InnerRace'
        }
      ]
    }]
  };
  chart.setOption(option);
  chart.on('click',  function(param) {
    if(param.data.name=='Normal'){app.globalData.active=0};
    if(param.data.name=='Ball'){app.globalData.active=1};
    if(param.data.name=='OuterRace'){app.globalData.active=2};
    if(param.data.name=='InnerRace'){app.globalData.active=3};
  });
  return chart;
};
Page({
  data: {
    email: '',
    warning: true,
    stars: app.globalData.stars,
    popup_show: false,
    info_show: false,
    echarts_show: false,
    nums: [app.globalData.list.num_label0,app.globalData.list.num_label1,app.globalData.list.num_label2,app.globalData.list.num_label3],
    ec: {
      onInit: initChart
    },
    active: 0,
    bearing_list: app.globalData.list,
  },
  onLoad(){
    var bearing_list0 = app.globalData.list.list_label0;
    var bearing_list1 = app.globalData.list.list_label1;
    var bearing_list2 = app.globalData.list.list_label2;
    var bearing_list3 = app.globalData.list.list_label3;
    var key = 0;
    for(key in bearing_list0){
      if(app.globalData.stars[bearing_list0[key]]=='star'){
        var value = bearing_list0[key];
        bearing_list0.splice(key,1);
        bearing_list0.unshift(value);
      }
    };
    var key = 0;
    for(key in bearing_list1){
      if(app.globalData.stars[bearing_list1[key]]=='star'){
        var value = bearing_list1[key];
        bearing_list1.splice(key,1);
        bearing_list1.unshift(value);
      }
    };
    var key = 0;
    for(key in bearing_list2){
      if(app.globalData.stars[bearing_list2[key]]=='star'){
        var value = bearing_list2[key];
        bearing_list2.splice(key,1);
        bearing_list2.unshift(value);
      }
    };
    var key = 0;
    for(key in bearing_list3){
      if(app.globalData.stars[bearing_list3[key]]=='star'){
        var value = bearing_list3[key];
        bearing_list3.splice(key,1);
        bearing_list3.unshift(value);
      }
    };
    app.globalData.list.list_label0 = bearing_list0;
    app.globalData.list.list_label1 = bearing_list1;
    app.globalData.list.list_label2 = bearing_list2;
    app.globalData.list.list_label3 = bearing_list3;
    this.setData({
      stars: app.globalData.stars
    });
    setTimeout(() => {
      this.setData({
        bearing_list: app.globalData.list
      });
    }, 500);
  },
  pie_click(){
    setTimeout(() => {
      this.setData({
        active: app.globalData.active
      });
    }, 10);
  },
  onShow(){
  },
  onChange(event) {
    // wx.showToast({
    //   title: `切换到标签 ${event.detail.name}`,
    //   icon: 'none'
    // });
  },
  next: function (e) {
    wx.navigateTo({
      url: '/pages/info/info?item='+ e.currentTarget.dataset.item + '&from=index',
    })
  },
  collect: function(e){
    var index = parseInt(e.currentTarget.dataset.item);
    var star = app.globalData.stars[index];
    if(star=='star-o'){
      app.globalData.stars[index]='star';
      Toast("收藏成功");
    }else{
      app.globalData.stars[index]='star-o';
      Toast("已取消收藏");
    };
    this.onLoad();
  },
  mail() {this.setData({ popup_show: true });},
  infos() {this.setData({ info_show: true });},
  onClose() {
    this.setData({ popup_show: false, info_show: false });
  },
  setEmail(e) {
    this.setData({
      email: e.detail
    });
  },
  sendEmail() {
    console.log("准备发送邮件");
    wx.cloud.callFunction({
      name: 'sendEmail',
      data: {
        email: this.data.email
      },
      success:res=>{
        this.onClose();
        console.log(res,"邮件发送成功");
        Toast('文件已向\n'+this.data.email+'发送');
      },
      fail:res=>{
        this.setData({
          warning: false
        });
        console.log("邮件发送失败");
      }
    })
  },
  input_focus(){
    this.setData({
      warning: true
    });
  },
  stars(){
    wx.navigateTo({
      url: '/pages/stars/stars',
    })
  }
})
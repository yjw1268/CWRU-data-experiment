import * as echarts from '../../ec-canvas/echarts.min.js';
import Toast from '../../dist/toast/toast';

const app = getApp();
var barec = null;
Page({
  data: {
    k: 0,
    star_position: '',
    stars: app.globalData.stars,
    interval: null,
    item: '',
    kind: '',
    from: '',
    data: '',
    rpm: '',
    de_rt: '',
    fe_rt: '',
    de_ave: '',
    fe_ave: '',
    features_DE: [
      "freq_min","time_smr","freq_max","time_var","freq_f5",
      "time_margin","ener_cD3","ratio_cA5","time_median","time_amp",
      "time_ptp","ener_cA5","time_mean","freq_f3","ener_cD1",
      "freq_f7","time_wavefactor","ener_cD4","time_kurtosis","freq_f8",
      "freq_f4","time_skew","freq_iqr","freq_f2","freq_rms",
      "freq_median","ener_cD2","time_pulse","freq_f6","time_std",
      "ratio_cD5","freq_mean","freq_std","ratio_cD1","ratio_cD4",
      "time_pr","time_max","ratio_cD3","freq_pr","ener_cD5",
      "time_peakfactor","time_iqr","ratio_cD2","time_min","time_rms"
    ],
    features_FE: [
      "time_mean","freq_mean","freq_f2","freq_iqr","ratio_cD2",
      "time_skew","time_pr","time_var","time_kurtosis","time_min",
      "freq_f7","freq_f5","ener_cD1","freq_std","freq_f8",
      "ener_cD4","time_pulse","freq_f4","freq_median","ratio_cA5",
      "ener_cA5","time_std","freq_min","time_ptp","freq_f6",
      "time_max","freq_pr","ratio_cD3","ener_cD5","time_amp",
      "time_wavefactor","time_margin","freq_f3","time_peakfactor","time_smr",
      "ener_cD3","freq_rms","ratio_cD4","time_rms","freq_max",
      "ratio_cD1","time_iqr","ener_cD2","time_median"
    ],
    ec: {
      onInit: function (canvas, width, height) {
        barec = echarts.init(canvas, null, {
          width: width,
          height: height
        });
        canvas.setChart(barec);
        return barec;
      }
    }
  },
  onReady() {
    this.data.interval = setInterval(() => {
      this.getData()
    }, 1000);
    this.getFeature();
  },
  onShow(){
    this.setData({
      stars: app.globalData.stars
    })
  },
  getData(){
    this.setData({
      k: this.data.k+1
    });
    var itemforchart = this.data.item+'.csv&start='+String(this.data.k-1)+'&end='+String(this.data.k+15);
    wx.request({
      url: 'https://api.bupt404.cn/phm/getdata.php?file=test2/TEST'+itemforchart,
      herder:{
        "content-type":"json"
      },
      success:res=>{
        barec.setOption({
          background: 'none',
          animation: false,
          color: ["#37A2DA", "#67E0E3", "#9FE6B8"],
          grid: {
            // containLabel: true,
            left:30,
            top:30,
            right:10,
            bottom:20
          },
          tooltip: {
            show: true,
            trigger: 'axis',
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
          },
          yAxis: {
            x: 'center',
            type: 'value',
            splitLine: {
              lineStyle: {
                type: 'dashed'
              }
            }
          },
          legend: {
            data: ['DE_time','FE_time'],
          },
          series: [{
            name: 'DE_time',
            type: 'line',
            smooth: true,
            data: res.data.DE_time.map(function(num){return num.toFixed(3)})
          }, {
            name: 'FE_time',
            type: 'line',
            smooth: true,
            data: res.data.FE_time.map(function(num){return num.toFixed(3)})
          }]
        });
        var arr = res.data.DE_time;
        var sum=0;
        for(var i = 0; i < arr.length; i++){
          sum += arr[i];
        }
        var mean1  = sum / arr.length;
        var arr = res.data.FE_time;
        var sum=0;
        for(var i = 0; i < arr.length; i++){
          sum += arr[i];
        }
        var mean2  = sum / arr.length;
        this.setData({
          rpm: res.data.RPM,
          de_rt: res.data.DE_time[13].toFixed(3),
          fe_rt: res.data.FE_time[13].toFixed(3),
          de_ave: mean1.toFixed(3),
          fe_ave: mean2.toFixed(3),
        });
      },
      fail: function (res) { },
      complete: function (res) { },
    });
  },
  getFeature(){
    wx.showLoading({
      title: '加载中...',
    });
    var itemforchart = this.data.item;
    wx.request({
      url: 'https://api.bupt404.cn/phm/getfeature.php?type=test2&test='+itemforchart,
      herder:{
        "content-type":"json"
      },
      success:res=>{
        var data_res = res.data;
        delete data_res.status;
        delete data_res.success;
        this.setData({
          data: data_res,
        });
        wx.hideLoading(); 
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  onLoad:function(options){
    var list_label0 = app.globalData.list.list_label0;
    var list_label1 = app.globalData.list.list_label1;
    var list_label2 = app.globalData.list.list_label2;
    var list_label3 = app.globalData.list.list_label3;
    var kind = '';
    if (list_label0.indexOf(parseInt(5))>-1){kind='Normal'};
    if (list_label1.indexOf(parseInt(5))>-1){kind='Ball类报错'};
    if (list_label2.indexOf(parseInt(5))>-1){kind='OuterRace类报错'};
    if (list_label3.indexOf(parseInt(5))>-1){kind='InnerRace类报错'};
    this.setData({
      // item: options.item,
      // from: options.from,
      item: 5,
      from: 'index',
      kind: kind
    });
    if(this.data.from=='stars'){
      this.setData({
        star_position: 'stars'
      });
    };
    if(this.data.from=='index'){
      this.setData({
        star_position: 'infos'
      });
    };
  },
  collect: function(e){
    var index = parseInt(this.data.item);
    var star = app.globalData.stars[index];
    if(star=='star-o'){
      app.globalData.stars[index]='star';
      Toast("收藏成功");
    }else{
      app.globalData.stars[index]='star-o';
      Toast("已取消收藏");
    };
    this.onShow();
  },
  info_detail(e){
    var item = e.currentTarget.dataset.kind+e.currentTarget.dataset.item;
    Toast(item+'\n'+ this.data.data[item][0]);
  },
  back: function (e) {
    clearInterval(this.data.interval);
    if(this.data.from=='stars'){
      wx.redirectTo({
        url: '/pages/stars/stars',
      })
    };
    if(this.data.from=='index'){
      wx.redirectTo({
        url: '/pages/index/index',
      })
    };
    
  },
  index: function (e) {
    clearInterval(this.data.interval);
    wx.redirectTo({
      url: '/pages/index/index',
    })
  }
})
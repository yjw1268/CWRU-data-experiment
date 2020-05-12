// pages/stars/stars.js
import Toast from '../../dist/toast/toast';

const app = getApp();
Page({
  data: {
    stars: app.globalData.stars,
    bearing_list: [],
    none_flag: false
  },
  onLoad(){
    var bearing_list = [];
    var stars = app.globalData.stars
    for (var key in stars) {
      var item = stars[key];
      if(item=='star'){
        bearing_list.push(key);
      }
    };
    if(bearing_list.length==0){
      this.setData({
        none_flag: false
      })
    }else{
      this.setData({
        none_flag: true
      })
    };
    this.setData({
      bearing_list: bearing_list
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
  next: function (e) {
    wx.navigateTo({
      url: '/pages/info/info?item='+ e.currentTarget.dataset.item + '&from=stars',
    })
  },
  back: function (e) {
    wx.redirectTo({
      url: '/pages/index/index',
    })
  }
})
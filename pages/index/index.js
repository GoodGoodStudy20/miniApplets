import ajax from "../../utils/ajax.js"
//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    recommendList: [],
    banners: [],
    topList: [],
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  toRecommendSong(){
    wx.navigateTo({
      url: '/pages/recommendSong/recommendSong',
    })
  },
  onLoad: function() {
    //推荐歌单数据
    let promise1 = ajax("/banner", {
      type: 2
    });
    promise1.then((result) => {
      // console.log(result)
      this.setData({
        banners: result.banners
      })
    })
    //推荐歌单数据
    let promise2 = ajax("/personalized");
    promise2.then((result) => {
      this.setData({
        recommendList: result.result
      })
    })

    let arr = [12, 5, 10,6]
    let index = 0;
    let topList = [];
    while (index < arr.length) {
      let promise3 = ajax("/top/list", {
        idx: arr[index++]
      })
      // console.log(promise3)
      promise3.then((result) => {
        // console.log(result)
        let obj = {
          name: result.playlist.name,
          list: result.playlist.tracks
        }
        topList.push(obj)
        this.setData({
          topList
        })
      })
      // console.log(topList)
    }
    //   //推荐歌单数据
    //   wx.request({
    //     url: 'http://localhost:3000/personalized',
    //     success: (res) => {
    //       this.setData({
    //         recommendList: res.data.result
    //       })
    //       // console.log(res.data.result)
    //     }
    //   })
    //   // 轮播图数据
    //   wx.request({
    //     url: 'http://localhost:3000/banner',
    //     success: (res) => {
    //       this.setData({
    //         banners: res.data.banners
    //       })
    //       // console.log(res.data)
    //     }
    //   })
    // },
    // getUserInfo: function(e) {
    //   console.log(e)
    //   app.globalData.userInfo = e.detail.userInfo
    //   this.setData({
    //     userInfo: e.detail.userInfo,
    //     hasUserInfo: true
    //   })
  }
})
// pages/song/song.js
import ajax from "../../utils/ajax.js"
let appInstance = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    songObj: {},
    songId: "",
    musicUrl: "",
    isPlay: false,
  },
 async handlePlay() {
    if (!this.data.musicUrl){
      let urlInfo = await ajax("/song/url", {
        id: this.data.songId,
      })
      this.setData({
        musicUrl: urlInfo.data[0].url
      })
    }
    

    let backGroundAudio = wx.getBackgroundAudioManager()
    if (this.data.isPlay) {
      backGroundAudio.pause();
      this.setData({
        isPlay:false
      })
      appInstance.globalData.isPlay=false;
    } else {
      backGroundAudio.src = this.data.musicUrl;
      backGroundAudio.title = this.data.songObj.name;
      this.setData({
        isPlay: true,
      })
      appInstance.globalData.isPlay=true;
      appInstance.globalData.audioId = this.data.songId;
    }


  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(options) {
    // console.log(options)
    let {
      songId
    } = options;
    let songData = await ajax("/song/detail", {
      ids: songId
    })
    console.log(songData)
    let songObj = songData.songs[0];
    this.setData({
      songObj,
      songId
    })
    wx.setNavigationBarTitle({
      title: songObj.name,
    })
    let { isPlay, audioId } = appInstance.globalData;
    if(isPlay&&audioId===songId){
      this.setData({
        isPlay:true
      })
    }
    // let urlInfo = await ajax("/song/url", {
    //   id: songId,
    // })
    // this.setData({
    //   musicUrl: urlInfo.data[0].url
    // })
    // let backGroundAudio= wx.getBackgroundAudioManager()
    //     backGroundAudio.src=this.data.musicUrl;
    //     backGroundAudio.title=songObj.name;

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})
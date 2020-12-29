// pages/recommendSong/recommendSong.js
import ajax from "../../utils/ajax.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    day: "",
    month: "",
    songList: [],
  },
  toSong(event) {
    let {
      songid
    } = event.currentTarget.dataset;
    wx.navigateTo({
      url: '/pages/song/song?songId=' + songid,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(options) {
    let day = new Date().getDate()
    let month = new Date().getMonth() + 1
    this.setData({
      day,
      month
    })
    let cookies = wx.getStorageSync("cookies")
    if (!cookies) {
      wx.showModal({
        title: "请先登录",
        content: "该功能需要先登录账号",
        cancelText: "返回首页",
        confirmText: "去登陆",
        success: ({
          confirm,
          cancel
        }) => {
          if (confirm) {
            wx.redirectTo({
              url: '/pages/login/login',
            })
          }
          if (cancel) {
            wx.switchTab({
              url: '/pages/index/index',
            })
          }
        }
      })
    }
    let songList = await ajax("/recommend/songs")
    this.setData({
      songList: songList.recommend.slice(0, 14)
    })
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
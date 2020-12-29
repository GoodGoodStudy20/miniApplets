// pages/personal/personal.js
import ajax from "../../utils/ajax.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    moveDistance: 0,
    moveTranstion: '',
    userInfo: {},
    playList: [],
  },

  handleTouchStart(event) {
    // console.log("handleTouchStart")
    this.startY = event.touches[0].clientY;
    // console.log(startY)

  },
  handleTouchMove(event) {
    // console.log("handleTouchMove")
    let moveY = event.touches[0].clientY;
    // console.log(moveY)
    let moveDistance = Math.floor(moveY - this.startY)
    if (moveDistance < 0 || moveDistance > 80) return;
    this.setData({
      moveDistance
    })
  },
  handleTouchEnd() {
    this.setData({
      moveDistance: 0,
      moveTranstion: "transform 1000ms"
    })
  },
  handleLogin() {
    wx.navigateTo({
      url: '/pages/login/login',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: async function() {
    let userInfo = wx.getStorageSync("userInfo")
    // console.log(userInfo)
    if (userInfo) {
      userInfo = JSON.parse(userInfo)
      this.setData({
        userInfo
      })
    }
    let playListData = await ajax("/user/record", {
      uid: userInfo.userId,
      type: 1
    })
    // console.log(playListData)
    playListData = playListData.weekData.map(item => {
      return item.song.al.picUrl
    })
    console.log(playListData)
    this.setData({
      playList: playListData
    })
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
// pages/login/login.js
import ajax from "../../utils/ajax.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: "",
    password: "",
  },
  handleInput(event) {
    let type=event.currentTarget.dataset.type;
    let value = event.detail.value;
    this.setData({
      [type]:value
    })
  },
 async handleLogin(){
    let {phone,password}=this.data
    if(!phone){
      wx.showToast({
        title: '请输入用户名',
        icon:"none",
      })
      return;
    }
    if(!password){
      wx.showToast({
        title: '请输入密码',
        icon:"none",
      })
      return
    }
    let result = await ajax("/login/cellphone",{
    phone,
    password,
    isLogin:true
    })
    if(result.code===200){
      wx.showToast({
        title:"登录成功，即将跳转至个人主页",
        icon:"none"
      })
      // console.log(result)
      wx.setStorage({
        key: 'userInfo',
        data: JSON.stringify(result.profile),
      })
      wx.switchTab({
        url: '/pages/personal/personal',
      })
    }
  },
  // handlePhone(event) {
  //   console.log(event);
  //   let phone=event.detail.value;
  //   this.setData({
  //     phone
  //   })
  // },
  // handlePassword(event){
  //   let password = event.detail.value;
  //   this.setData({
  //     password
  //   })
  // },
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
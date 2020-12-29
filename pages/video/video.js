// pages/video/video.js
import ajax from "../../utils/ajax.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    groupList: [],
    currentId: null,
    vedioList: [],
    trigger: false,
    scrollId: "",
    videoId:"",
  },
  async getVedioList() {
    let vedioListData = await ajax("/video/group", {
      id: this.data.currentId
    })
    let vedioList = vedioListData.datas.map(item => {
      return item.data;
    })
    this.setData({
      vedioList
    })
  },

  async changeId(event) {
    // console.log(event.target.dataset.id)
    let {
      id
    } = event.target.dataset;
    let scrollId = event.target.id;
    // console.log(scrollId)
    if (id) {
      this.setData({
        currentId: id,
        scrollId
      })
      wx.showLoading({
        title: '数据加载中',
      })
      this.setData({
        vedioList: [],
      })
      await this.getVedioList()
      wx.hideLoading();
    }
  },
  async handleRefresh() {
    await this.getVedioList()
    //  console.log(111)
    this.setData({
      trigger: false
    })
  },
  scrollToLower() {
    if (this.flag) return;
    this.flag = true;
    setTimeout(() => {
      let data = JSON.parse(JSON.stringify(this.data.vedioList))
      this.setData({
        vedioList: [...this.data.vedioList, ...data]
      })
      // this.getVedioList()
      this.flag = false
    }, 3000);
  },
  handelPlay(event) {
    // console.log(event)
    let oldId = this.oldId
    let {
      id
    } = event.currentTarget;
    if (oldId && oldId != id) {
      let videoContext = wx.createVideoContext(oldId)
      videoContext.pause();
    }

    this.oldId = id;
  },
  showVideo(event){
    let {id}=event.currentTarget;
    this.setData({
      videoId:id,
    })
    let videoContext= wx.createVideoContext(id);
    videoContext.play();
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
    let cookies=wx.getStorageSync("cookies")
    if(!cookies){
      wx.showModal({
        title:"请先登录",
        content:"该功能需要先登录账号",
        cancelText:"返回首页",
        confirmText:"去登陆",
        success: ({confirm,cancel})=>{
          if(confirm){   
            wx.redirectTo({
              url: '/pages/login/login',
            })
          }
          if(cancel){
            wx.switchTab({
              url: '/pages/index/index',
            })
          }
        }
      })
    }
    let result = await ajax("/video/group/list")
    // console.log(result.data)
    let groupList = result.data.slice(0, 14);
    if (result.code === 200) {
      this.setData({
        groupList,
        currentId: groupList[0].id,
      })
    }
    // 发送请求获取视频数据列表
    this.getVedioList()
    //   let vedioListData = await ajax("/video/group",{
    //     id:this.data.currentId
    //   })
    //  let vedioList= vedioListData.datas.map(item=>{
    //     return item.data;
    //   })
    //   this.setData({
    //     vedioList
    //   })
    // console.log(vedioListData)
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
  onShareAppMessage: function({
    from,
    target
  }) {
    console.log(from)
    if (from === "button") {
      console.log(target)
      let {imageurl,title}=target.dataset
      return {
        title,
        path: "/pages/video/video",
        imageUrl: imageurl
      }
    } else if (from === "menu") {
      return {
        title: "硅谷云音乐",
        path: "/pages/index/index",
        imageUrl:"/static/images/nvsheng.jpg"
      }
    }
  }
})
export default function(url, data = {}, method = "GET") {
  return new Promise((resolve, reject) => {

    let cookieStr = wx.getStorageSync("cookies");
    let cookies = [];
    if (cookieStr) {
      cookies = JSON.parse(cookieStr)
    }
    wx.request({
      url: 'http://localhost:3000' + url,
      data,
      method,
      header: {
        cookie: Array.prototype.toString.call(cookies)
      },
      success: (res) => {
        // console.log(cookies)
        if (data.isLogin) {
          let arr = res.cookies.filter(item => {
            return item.indexOf("MUSIC_U") === 0
          })
          wx.setStorage({
            key: 'cookies',
            data: JSON.stringify(arr),
          })

        }
        resolve(res.data)
        // this.setData({
        //   recommendList: res.data.result
        // })
        // console.log(res.data.result)
      }
    })
  })

}
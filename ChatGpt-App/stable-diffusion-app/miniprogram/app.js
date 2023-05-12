// app.js
App({
  globalData: {
    openid: '',
    userInfo: {},
    sdapi: 'http://101.34.12.71:7862'
  },
  onLaunch: function () {
    // 初始化云开发环境
    wx.cloud.init({
      env: 'cloud1-5g6o72ha5ffabc5c',
      traceUser: false,
    })
  },
})

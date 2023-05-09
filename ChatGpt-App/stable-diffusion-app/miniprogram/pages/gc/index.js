// pages/gc/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeNames: [],
    text2ImageParams: {
      prompt: "1 gril, portrait, upper body, sailor suit",
      seed: -1,
      sampler_name: "Euler a",
      batch_size: 4,
      steps: 32,
      cfg_scale: 7,
      width: 512,
      height: 512,
      sampler_index: "Euler"
    },
    loading: false,
    result: {
      images: []
    }
  },

  onChange(event) {
    this.setData({
      activeNames: event.detail,
    });
  },

  onSubmit() {
    const thant = this;
    thant.setData({loading: true})
    wx.request({
      url: 'http://localhost:4000/api/text2Image',
      method: 'POST',
      data: thant.data.text2ImageParams,
      success(res) {
        console.log(res.data) // 在控制台中输出接口返回的数据
        // for(let i=0; i<res.data.result.images.length; i++) {
        //   res.data.result.images[i] = res.data.result.images[i].replace(/[\r\n]/g, '')
        // }
        thant.setData({loading: false, result: res.data.result})
      },
      fail() {
        thant.setData({loading: false})
      }
    })    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.getTabBar().init()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})
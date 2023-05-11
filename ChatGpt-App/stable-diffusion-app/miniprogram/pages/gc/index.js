// pages/gc/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeNames: [],
    text2ImageParamsPrompt: "1 gril, portrait, upper body, sailor suit",
    text2ImageParamsSeed: -1,
    text2ImageParamsBatchSize: 4,
    text2ImageParamsSteps: 32,
    text2ImageParamsWidth: 512,
    text2ImageParamsHeight: 512,
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
    const that = this;
    that.setData({loading: true})
    wx.request({
      url: 'http://101.34.12.71:7862/sdapi/v1/text2image',
      method: 'POST',
      data: {
        "prompt": that.data.text2ImageParamsPrompt,
        "seed": that.data.text2ImageParamsSeed,
        "batch_size": that.data.text2ImageParamsBatchSize,
        "steps": that.data.text2ImageParamsSteps,
        "width": that.data.text2ImageParamsWidth,
        "height": that.data.text2ImageParamsHeight,
        "sampler_index": "Euler",
        "sampler_name": "Euler a",
        "cfg_scale": 7,
        "negative_prompt": "nsfw",
      },
      success(res) {
        console.log(res.data) // 在控制台中输出接口返回的数据
        // for(let i=0; i<res.data.result.images.length; i++) {
        //   res.data.result.images[i] = res.data.result.images[i].replace(/[\r\n]/g, '')
        // }
        that.setData({loading: false, result: res.data.result})
      },
      fail() {
        that.setData({loading: false})
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
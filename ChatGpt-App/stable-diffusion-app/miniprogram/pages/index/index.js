// index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageCount: 100,
    images: [
      "https://dy.lixiaoqian.com/img/0163.jpg",
      "https://dy.lixiaoqian.com/img/0162.jpg",
      "https://dy.lixiaoqian.com/img/0161.jpg",
      "https://dy.lixiaoqian.com/img/0160.jpg",
      "https://dy.lixiaoqian.com/img/0159.jpg",
      "https://dy.lixiaoqian.com/img/0158.jpg",
      "https://dy.lixiaoqian.com/img/0157.jpg",
      "https://dy.lixiaoqian.com/img/0156.jpg"
    ]
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

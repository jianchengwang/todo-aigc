// components/custom-tab-bar/index.js
Component({
  data: {
    active: 0,
    list: [{
      "pagePath": "pages/index/index",
      "text": "广场",
      "icon": "home-o"
    },
    {
      "pagePath": "pages/gc/index",
      "text": "创作",
      "icon": "edit"
    },
    {
      "pagePath": "pages/mine/index",
      "text": "我的",
      "icon": "setting-o"
    }]
  },
  methods: {
    onChange(event) {
      this.setData({active: event.detail})
      const url = this.data.list[event.detail].pagePath
      console.info(url)
      wx.switchTab({
        url: "/" + url
      })
    },
    init() {
      const page = getCurrentPages().pop()
      this.setData({
        active: this.data.list.findIndex(item => item.pagePath == `${page.route}`)
      })
    }
  },
})
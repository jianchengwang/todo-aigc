const callFunction = (name, data) => {
  return new Promise((resolve, reject) => {
    wx.cloud.callFunction({
      name: name,
      data: data,
      success: res => {
        resolve(res.result)
      },
      fail: err => {
        reject(err)
      }
    })
  })
}

async function getOpenid() {
  let openid = wx.getStorageSync('openid')
  if(!openid) {
    await callFunction('getOpenid', {}).then(res => {
      openid = res.result.userInfo.openId
      wx.setStorageSync('openid', openid)
    })
  }
  return openid
}

async function getUserInfo () {
  let openid = await getOpenid()
  const db = wx.cloud.database()
  let userInfo = {}
  if(openid) {
    db.collection('users').where({
      openid: openid
    }).get().then(res => {
      console.log(res)
      if(res.data.length > 0) {
        userInfo = res.data[0]
      } else {
        wx.getUserInfo({
          success: res => {
            userInfo = {
              openid: openid,
              nickname: res.userInfo.nickName,
              avatarUrl: res.userInfo.avatarUrl
            }
            db.collection('users').add({
              data: userInfo
            }).then(res => {
              console.log('保存用户信息成功：', res)
            }).catch(err => {
              console.error('保存用户信息失败：', err)
            })
          }
        })
      }
    })
  } else {
    console.error('获取openid失败：')
  }
  return userInfo
}

module.exports = {
  getOpenid,
  getUserInfo
}
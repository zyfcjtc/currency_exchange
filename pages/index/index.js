//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    inputValue: 1
  },
  //函数
  bindKeyInput: function(e) {
    this.setData({
      inputValue: e.detail.value
    })
  },

  //事件处理函数
  onLoad: function () {
    console.log('onLoad')
    var that = this
    wx.request({
      url: 'http://api.fixer.io/latest?base=USD',
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      success: function(res){
        that.data.currency=res.data
        console.log(res.data);
      }
    })
  }
})

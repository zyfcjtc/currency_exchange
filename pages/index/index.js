//index.js
//获取应用实例
var util = require('../../utils/util.js')
var app = getApp()
Page({
  data: {
    base: "USD",
    inputValue: 1,
    currency: {}
  },
  //函数
  bindKeyInput: function(e) {
    this.setData({
      inputValue: Number(e.detail.value),
    })
    console.log(this.data.currency.rates.AUD)
  },
  //事件处理函数
  onLoad: function () {
    console.log('onLoad')

    wx.setStorage({
      key: 'base',
      data: 'USD'
    })
    var that = this
    wx.request({
      url: 'http://api.fixer.io/latest?base=USD',
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      success: function(res){
        that.setData({
          currency: res.data.rates
        })
      }
    })
  }
})

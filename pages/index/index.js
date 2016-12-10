//index.js
//获取应用实例
var util = require('../../utils/util.js')
var app = getApp()
Page({
  data: {
    base: "USD",
    inputValue: 1,
    currency: {},
    symbols: "USD,CAD"
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
    var that = this

    wx.setStorage({
      key: 'base',
      data: 'USD'
    })
    if(wx.getStorage({key: 'symbols'})){
      that.setData({
        symbols: wx.getStorage({
                  key: 'symbols',
                  })
      })
    }

    wx.request({
      url: 'http://api.fixer.io/latest?base=USD&symbols='+that.data.symbols,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      success: function(res){
        that.setData({
          currency: res.data.rates
        })
      }
    })
  }
})

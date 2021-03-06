var app = getApp()
Page({
  data: {
    base: "USD",
    currency: ['AUD','BGN','BRL','CAD','CHF','CNY','CZK','DKK','GBP','HKD','HRK','HUF'],
    symbols: []
  },
  //函数
  bindKeyInput: function(e) {
    this.setData({
      inputValue: Number(e.detail.value),
    })
    console.log(this.data.currency.rates.AUD)
  },
  bindPickerChange: function(e){
    this.setData({
      base: this.data.currency[e.detail.value]
    })
    wx.setStorage({
      key: 'base',
      data: this.data.currency[e.detail.value]
    })
    //根据所选货币改变数据
    var that = this
    wx.request({
      url: 'http://api.fixer.io/latest?base='+this.data.base,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      success: function(res){
        that.setData({
          list: res.data.rates
        })
      }
    })
  },
  checkboxChange: function(e) {
    this.setData({
      symbols: e.detail.value
    })
  },
  setSymbol: function(){
    console.log(this.data.symbols.toString())
    wx.setStorage({
      key: 'symbols',
      data: this.data.symbols.toString(),
    })
  },
  //事件处理函数
  onLoad: function () {
    console.log('onLoad')
    var that = this
    wx.getStorage({
      key: 'base',
      success: function(res){
        that.setData({
          base: res.data
        })
      }
    })

    wx.request({
      url: 'http://api.fixer.io/latest?base=USD',
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      success: function(res){
        that.setData({
          list: res.data.rates
        })
      }
    })
  }
})
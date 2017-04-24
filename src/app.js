const methods = require('./methods/index');
const utils = require('./utils/index');

const magnification = 5; // canvas放大倍数

//app.js
App({
  utils,
  methods,
  magnification,
  onError(err) {
    wx.showModal({
      title: '！！！',
      content: JSON.stringify(err),
    })
  },
});
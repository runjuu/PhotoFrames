const methods = require('./methods/index');
const utils = require('./utils/index');

//app.js
App({
  utils,
  methods,
  magnification: 5,
  onError(err) {
    wx.showModal({
      title: '！！！',
      content: JSON.stringify(err),
    })
  },
});
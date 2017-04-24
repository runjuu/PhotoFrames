const getSystemInfo = () => (new Promise((success, fail) => {
  wx.getSystemInfo({
    success,
    fail,
  });
}));

export default getSystemInfo;
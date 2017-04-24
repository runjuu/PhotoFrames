const getImageInfo = (src) => (new Promise((resolve, reject) => {
  wx.getImageInfo({
    src,
    success ({ width, height, path }) {
      resolve({ width, height, path });
    },
    fail(err) {
      reject(err);
    }
  });
}));

export default getImageInfo;
const getImageInfo = require('./getImageInfo').default;

const chooseImage = () => (new Promise((resolve, reject) => {
  wx.chooseImage({
    count: 1,
    sizeType: ['original'],
    sourceType: ['album'],
    success ({ tempFilePaths: [src] }) {
      getImageInfo(src)
      .then((image) => { resolve(image); });
    },
    fail(err) {
      reject(err);
    }
  });
}));

export default chooseImage;
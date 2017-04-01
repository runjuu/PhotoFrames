const canvasToTempFilePath = (canvasId) => (new Promise((resolve, reject) => {
  wx.canvasToTempFilePath({
    canvasId,
    success({ tempFilePath }) {
      resolve(tempFilePath);
    },
    fail(err) {
      reject(err);
    }
  });
}));

export default canvasToTempFilePath;
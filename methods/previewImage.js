const previewImage = ({ current, urls }) => (new Promise((success, fail) => {
  wx.previewImage({
    current,
    urls: urls || [current],
    success,
    fail,
  });
}));

export default previewImage;
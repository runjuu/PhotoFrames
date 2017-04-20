const params = {};
let canSelectImage = true;
function drawPhotos(which) {
  getApp().methods.drawPhotos(
    wx.createCanvasContext(which),
    Object.assign({}, params, which === 'preview' ? { magnification: 1 } : {}),
  );
}

Page({

  data: {
  },

  onReady() {
    const { magnification } = getApp();
    Object.assign(params, { magnification });
  },

  selectImage() {
    if (!canSelectImage) return;
    const { chooseImage } = getApp().methods;
    chooseImage()
      .then((image) => {
        Object.assign(params, { image });
        drawPhotos('preview');
      })
      .then(() => { wx.showToast({ title: '长按可预览图片', icon: 'success', duration: 1500 }); });
  },

  previewImage() {
    canSelectImage = false;
    wx.showToast({ title: '处理中...', icon: 'loading', duration: 10000, mask: true });
    drawPhotos('export');
    const { canvasToTempFilePath, previewImage } = getApp().methods;
    canvasToTempFilePath('export')
      .then((path) => {
        previewImage({ current: path });
        canSelectImage = true;
      });
  },

  zoom({ detail: { value: zoom } }) {
    Object.assign(params, { zoom });
    if (params.image) drawPhotos('preview');
  },

});
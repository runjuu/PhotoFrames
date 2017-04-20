const params = {};
let canSelectImage = false;

function drawPhotos(which, showToast) {
  if (showToast !== false) wx.showToast({ title: '处理中...', icon: 'loading', duration: 10000, mask: true });
  getApp().methods.drawPhotos(
    wx.createCanvasContext(which),
    Object.assign({}, params, which === 'preview' ? { magnification: 1 } : {}),
  );
}

Page({

  onReady() {
    const { magnification } = getApp();
    Object.assign(params, { magnification });

    canSelectImage = true;
    wx.showToast({ title: '点击，选择图片', icon: 'success', duration: 1000 });
  },

  selectImage() {
    if (!canSelectImage) return;

    getApp().methods.chooseImage()
      .then((image) => {
        Object.assign(params, { image });
        drawPhotos('preview');
      })
      .then(() => {
        wx.showToast({ title: '长按，预览图片', icon: 'success', duration: 1000 });
      });
  },

  previewImage() {
    canSelectImage = false;

    const { canvasToTempFilePath, previewImage } = getApp().methods;

    drawPhotos('export');
    canvasToTempFilePath('export')
      .then((path) => {
        previewImage({ current: path });
        canSelectImage = true;
      });
  },

  zoom({ detail: { value: zoom } }) {
    Object.assign(params, { zoom });
    if (params.image) drawPhotos('preview', false);
  },

});
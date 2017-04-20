const params = {};
let canSelectImage = false;

function drawPhotos(which, showToast) {
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
    wx.showLoading({ title:'处理中...', mask: true });
    canSelectImage = false;
    const { canvasToTempFilePath, previewImage } = getApp().methods;

    drawPhotos('export');
    canvasToTempFilePath('export')
      .then((path) => {
        previewImage({ current: path });
        canSelectImage = true;
      });
    wx.hideLoading();
  },

  zoom({ detail: { value: zoom } }) {
    Object.assign(params, { zoom });
    if (params.image) drawPhotos('preview');
  },

});
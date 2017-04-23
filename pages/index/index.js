let canSelectImage = false;

const params = {
  zoom: Number(wx.getStorageSync('zoom')) || 90,
};

function drawPhotos(which, canvasWidth) {
  getApp().methods.drawPhotos(
    wx.createCanvasContext(which),
    Object.assign({},
      params,
      { canvasWidth },
    ),
  );
}

Page({

  data: {
    zoom: params.zoom,
    width: 100,
    hasNotImage: true,
  },

  onReady() {
    canSelectImage = true;
    wx.showToast({ title: '点击，选择图片', icon: 'success', duration: 1000 });
  },

  setExportWidth() {
    return new Promise((resolve, fail) => {
      const imgWidth = parseInt(this.data.width > params.image.width ? this.data.width : params.image.width);
      const small = parseInt(imgWidth * (imgWidth > 3000 ? 0.1 : 0.2));
      const medium = parseInt(imgWidth * (imgWidth > 3000 ? 0.2 : 0.5));
      const large = parseInt(imgWidth * (imgWidth > 3000 ? 0.5 : 0.8));
      wx.showActionSheet({
        itemList: [
          `Small (${small}x${small})`,
          `Medium (${medium}x${medium})`,
          `Large (${large}x${large})`,
          `Actual Size (${imgWidth}x${imgWidth})`,
        ],
        success: ({ tapIndex }) => {
          let width;

          switch (tapIndex) {
            case 0:
              width = small;
              break;
            case 1:
              width = medium;
              break;
            case 2:
              width = large;
              break;
            case 3:
              width = imgWidth;
              break;
            default:
              width = medium;
              break;
          }

          this.setData({ width });
          resolve(width);
        },
        fail,
      });
    });
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
        this.setData({ hasNotImage: false });
      });
  },

  exportImage() {
    if (!params.image) {
      this.selectImage();
      return;
    }
    canSelectImage = false;
    this.setExportWidth()
      .then((width) => {
        wx.showLoading({ title:`处理中...`, mask: true });
        const { canvasToTempFilePath, previewImage } = getApp().methods;

        // 
        setTimeout(() => {
          drawPhotos('export', width);
          canvasToTempFilePath('export')
            .then((path) => {
              previewImage({ current: path });
              canSelectImage = true;
              wx.hideLoading();
            });
        }, 1000);
      })
      .catch(() => {
        canSelectImage = true;
      });
  },

  zoom({ detail: { value: zoom } }) {
    Object.assign(params, { zoom });
    wx.setStorageSync('zoom', zoom);
    if (params.image) drawPhotos('preview');
  },

});
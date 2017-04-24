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
      const imgWidth = parseInt(params.image.height > params.image.width ? params.image.height : params.image.width, 10);

      const small = 720;
      const medium = 1080;
      const large = 1440;

      const itemList = [
        `小 (${small}x${small})`,
        `中 (${medium}x${medium})`,
        `大 (${large}x${large})`,
        `原图 (${imgWidth}x${imgWidth})`,
      ];

      wx.showActionSheet({
        itemList,
        success: ({ tapIndex }) => {
          let width;
          const scale = params.zoom / 100;

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
              width = parseInt(imgWidth / scale, 10);
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
const {
  methods: {
    canvasToTempFilePath,
    chooseImage,
    previewImage,
    drawPhotos,
  },
  magnification,
} = getApp();

Page({

  data: {
    frames: undefined,
    preview: undefined,
    systemInfo: wx.getSystemInfoSync(),
  },

  onReady() {
    this.setData({
      frames: wx.createCanvasContext('frames'),
      preview: wx.createCanvasContext('preview'),
    });
  },

  selectImage() {
    const { frames, preview, systemInfo } = this.data;
    chooseImage()
      .then((image) => {
        drawPhotos(frames, { image, systemInfo, magnification });
        drawPhotos(preview, { image, systemInfo, magnification: 1 });
      });
  },

  previewImage() {
    canvasToTempFilePath('frames')
    .then((path) => {
      previewImage({ current: path });
    });
  },

});
const {
  methods: {
    canvasToTempFilePath,
    getSystemInfo,
    chooseImage,
    previewImage,
    drawPhotos,
  },
} = getApp();

Page({
  data: {
    ctx: undefined,
    systemInfo: wx.getSystemInfoSync(),
  },
  
  onReady() {
    this.setData({
      ctx: wx.createCanvasContext('frames'),
    });
  },
  
  selectImage() {
    const { ctx, systemInfo } = this.data;
    chooseImage()
    .then((image) => {
      drawPhotos({ image, ctx, systemInfo })
    })
    .catch((err) => {
      console.log(err);
    });
  },

  previewImage() {
    canvasToTempFilePath('frames')
    .then((path) => {
      previewImage({ current: path });
    });
  }
  

})
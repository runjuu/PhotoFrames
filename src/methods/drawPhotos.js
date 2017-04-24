const systemInfo = wx.getSystemInfoSync();
const { screenWidth } = systemInfo;

function drawPhotos(ctx, { image, zoom = 100, canvasWidth = screenWidth }) {
  const { filterImage } = getApp().utils;
  const imageInfos = filterImage({ image, canvasWidth });
  const scale = zoom / 100;

  const left = image.width < image.height ? (canvasWidth - imageInfos.width) / 2 : 0;
  const top = image.width > image.height ? (canvasWidth - imageInfos.height) / 2 : 0;
  const width = imageInfos.width * scale;
  const height = imageInfos.height * scale;
  const widthDiff = (imageInfos.width - width) / 2;
  const heightDiff = (imageInfos.height - height) / 2;

  ctx.setFillStyle('white');

  ctx.fillRect(
    0,
    0,
    canvasWidth,
    canvasWidth,
  );

  ctx.drawImage(
    image.path,
    left + widthDiff,
    top + heightDiff,
    width,
    height,
  );
  ctx.draw();
}

export default drawPhotos;
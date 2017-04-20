const systemInfo = wx.getSystemInfoSync();

function drawPhotos(ctx, { image, magnification, zoom = 100 }) {
  const { filterImage } = getApp().utils;

  const imageInfos = filterImage({ image, systemInfo });
  const scale = zoom / 100;


  const left = image.width < image.height ? ((systemInfo.screenWidth - imageInfos.width) / 2) * magnification : 0;
  const top = image.width > image.height ? ((systemInfo.screenWidth - imageInfos.height) / 2) * magnification : 0;
  const width = imageInfos.width * magnification * scale;
  const height = imageInfos.height * magnification * scale;
  const widthDiff = (imageInfos.width * magnification - width) / 2;
  const heightDiff = (imageInfos.height * magnification - height) / 2;

  console.log(
    left + widthDiff,
    top + heightDiff,
    width,
    height,
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
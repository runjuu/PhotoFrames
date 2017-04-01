function drawPhotos({ ctx, image, systemInfo }) {
  const { filterImage } = getApp().utils;
  const { width, height } = filterImage({ image, systemInfo });

  if (image.width > image.height) {
    const topOffset = (systemInfo.screenWidth - height) / 2;
    ctx.drawImage(image.path, 0, topOffset, width, height);
  } else {
    const leftOffset = (systemInfo.screenWidth - width) / 2;
    ctx.drawImage(image.path, leftOffset, 0, width, height);
  }
  ctx.draw();
}

export default drawPhotos;
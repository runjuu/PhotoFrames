function drawPhotos(ctx, { image, systemInfo, magnification = 1 }) {
  const {
    utils: { filterImage  },
  } = getApp();
  const { width, height } = filterImage({ image, systemInfo });

  if (image.width > image.height) {
    const topOffset = ((systemInfo.screenWidth - height) / 2) * magnification;
    ctx.drawImage(image.path, 0, topOffset, width * magnification, height * magnification);
  } else {
    const leftOffset = ((systemInfo.screenWidth - width) / 2) * magnification;
    ctx.drawImage(image.path, leftOffset, 0, width * magnification, height * magnification);
  }

  ctx.draw();
}

export default drawPhotos;
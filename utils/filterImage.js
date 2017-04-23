function filterImage({ image, canvasWidth }) {
  const ratio = image.width > image.height ? (canvasWidth / image.width) : (canvasWidth / image.height);

  const width = image.width * ratio;
  const height = image.height * ratio;
  return { width, height };
}

export default filterImage;

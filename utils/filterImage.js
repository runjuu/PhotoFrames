function filterImage({ image, systemInfo }) {
  const { screenWidth } = systemInfo;
  const ratio = image.width > image.height ? (screenWidth / image.width) : (screenWidth / image.height);

  const width = image.width * ratio;
  const height = image.height * ratio;

  return { width, height };
}

export default filterImage;

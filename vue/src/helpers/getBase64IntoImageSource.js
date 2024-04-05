function getBase64IntoImageSource(src) {
  if (!src) return Promise.resolve("");
  const image = new Image();
  image.src = src + `?${Date.now()}${Math.random()}`;
  image.crossOrigin = "anonymous";
  return new Promise(function (resolve) {
    image.onerror = () => resolve("");
    image.onload = function () {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      canvas.width = image.width;
      canvas.height = image.height;
      context.drawImage(image, 0, 0);
      const dataURL = canvas.toDataURL("image/png");
      resolve(dataURL);
    };
  });
}

export default getBase64IntoImageSource;

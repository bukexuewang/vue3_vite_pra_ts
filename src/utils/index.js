import Cookies from 'js-cookie';

function getObjectFitSize({ type = 'cover', containerWidth, containerHeight, imgWidth, imgHeight }) {
  let radio = 1, // 容器与图片的比例
    sx = 0, // 开始剪切的 x 坐标位置。
    sy = 0, // 开始剪切的 y 坐标位置。
    swidth = imgWidth, // 被剪切图像的宽度。
    sheight = imgHeight, // 被剪切图像的高度。
    x = 0, // 在画布上放置图像的 x 坐标位置。
    y = 0, // 在画布上放置图像的 y 坐标位置。
    width = containerWidth, // 要使用的图像的宽度（伸展或缩小图像）。
    height = containerHeight; // 要使用的图像的高度（伸展或缩小图像）。
  let cWHRatio = containerWidth / containerHeight;
  let iWHRatio = imgWidth / imgHeight;
  if (type === 'cover') {
    // cover模式，需要裁剪
    if (iWHRatio >= cWHRatio) {
      // 横图，高先匹配，裁剪宽度
      radio = containerHeight / imgHeight;
      sx = (imgWidth - containerWidth / radio) / 2;
      swidth = containerWidth / radio;
      sheight = imgHeight;
    } else {
      // 竖图，宽先匹配，裁剪高度
      radio = containerWidth / imgWidth;
      sy = (imgHeight - containerHeight / radio) / 2;
      swidth = imgWidth;
      sheight = containerHeight / radio;
    }
  } else if (type === 'contain') {
    if (iWHRatio >= cWHRatio) {
      // 横图，宽先匹配，高度自适应
      radio = containerWidth / imgWidth;
      y = (containerHeight - imgHeight * radio) / 2;
      height = imgHeight * radio;
    } else {
      // 竖图，高先匹配，宽度自适应
      radio = containerHeight / imgHeight;
      x = (containerWidth - imgWidth * radio) / 2;
      width = imgWidth * radio;
    }
  }
  return {
    sx,
    sy,
    swidth,
    sheight,
    x,
    y,
    width,
    height
  };
}

function loadImg(url, isCRO) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    // img.src = url;
    img.src = `${url}?v=${Math.random().toString().substring(2)}`;
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      console.log('图片加载完成');
      resolve(img);
    };
    img.onerror = reject;
  });
}

export const composeImages = async (urls = [], wh = 200, spacing = 2) => {
  //   const images = [];
  const max = Math.min(urls.length, 4);
  //   for (let i = 0; i < max; i++) {
  //     images.push(await loadImg(urls[i]));
  //   }
  //   const promises = [];
  //   urls.slice(0, 4).forEach((url) => {
  //     promises.push(
  //       new Promise((resolve, reject) => {
  //         const img = new Image();
  //         img.src = `${url}?v=${Math.random().toString().substring(2)}`;
  //         img.crossOrigin = 'anonymous';
  //         // img.setAttribute('crossOrigin', 'anonymous');
  //         img.onload = function (e) {
  //           return resolve(e.target);
  //         };
  //         img.onerror = reject;
  //       })
  //     );
  //   });

  const drawer = document.createElement('canvas');
  const canvasCtx = drawer.getContext('2d');
  drawer.width = wh;
  drawer.height = wh;
  const helfWh = wh / 2;
  spacing = spacing / 2;
  const gridMap = {
    2: [
      {
        x: 0,
        y: 0,
        width: helfWh - spacing,
        height: wh
      },
      {
        x: helfWh + spacing,
        y: 0,
        width: helfWh - spacing,
        height: wh
      }
    ],
    3: [
      {
        x: 0,
        y: 0,
        width: helfWh - spacing,
        height: wh
      },
      {
        x: helfWh + spacing,
        y: 0,
        width: helfWh - spacing,
        height: helfWh - spacing
      },
      {
        x: helfWh + spacing,
        y: helfWh + spacing,
        width: helfWh - spacing,
        height: helfWh - spacing
      }
    ],
    4: [
      {
        x: 0,
        y: 0,
        width: helfWh - spacing,
        height: helfWh - spacing
      },
      {
        x: helfWh + spacing,
        y: 0,
        width: helfWh - spacing,
        height: helfWh - spacing
      },
      {
        x: 0,
        y: helfWh + spacing,
        width: helfWh - spacing,
        height: helfWh - spacing
      },
      {
        x: helfWh + spacing,
        y: helfWh + spacing,
        width: helfWh,
        height: helfWh - spacing - spacing
      }
    ]
  };
  canvasCtx.fillStyle = '#ffffff99';
  canvasCtx.fillRect(0, 0, wh, wh);
  for (let i = 0; i < gridMap[max].length; i++) {
    const item = gridMap[max][i];
    const url = urls[i];
    const originImg = await loadImg(url, !i);
    const { sx, sy, swidth, sheight, width, height } = getObjectFitSize({
      containerWidth: item.width,
      containerHeight: item.height,
      imgWidth: originImg.width,
      imgHeight: originImg.height
    });
    canvasCtx.drawImage(originImg, sx, sy, swidth, sheight, item.x, item.y, width, height);
  }
  //   gridMap[max].forEach((item, index) => {
  //     const originImg = images[index];
  //     originImg.src = `${originImg.src}?v=${Math.random().toString().substring(2)}`;
  //     originImg.crossOrigin = 'anonymous';
  //     originImg.onload = () => {};
  //   });
  return drawer.toDataURL('image/png');
};

export function setCookie(name, value, opt = { expires: 3650 }) {
  let host = location.hostname;
  let hostList = host.split('.');
  let lenght = hostList.length;
  if (length > 2) {
    let list = [hostList[lenght - 2], hostList[lenght - 1]];
    opt.domain = '.' + list.join('.');
  } else opt.domain = host;
  Cookies.set(name, value, opt);
}

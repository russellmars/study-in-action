export default function() {
  // 处理retina屏幕显示效果
  const classNames: string[] = [];
  const pixelRatio: number = window.devicePixelRatio || 1;
  
  classNames.push("pixel-ratio-" + Math.floor(pixelRatio));
  if (pixelRatio >= 2) {
    classNames.push("retina");
  }

  const html = document.getElementsByTagName("html")[0];

  classNames.forEach(className => html.classList.add(className));
}

const getSvgData = (qrRef) => {
  if (!qrRef.current) return null;
  const svgElement = qrRef.current.querySelector('svg');
  if (!svgElement) return null;
  return new XMLSerializer().serializeToString(svgElement);
};

const drawCanvas = (svgData, size = 1024) => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const padding = { top: 48, right: 48, bottom: 48, left: 48 };

    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const img = new Image();
    img.onload = () => {
      const qrWidth = size - padding.left - padding.right;
      const qrHeight = size - padding.top - padding.bottom;
      ctx.drawImage(img, padding.left, padding.top, qrWidth, qrHeight);
      resolve(canvas);
    };
    img.onerror = (err) => reject(err);
    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
  });
};

export const handleDownload = async (qrRef, format = 'png') => {
  const svgData = getSvgData(qrRef);
  if (!svgData) return;

  try {
    if (format === 'svg') {
      const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'qr-code.svg';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } else {
      const canvas = await drawCanvas(svgData);
      const pngUrl = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = pngUrl;
      a.download = 'qr-code.png';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  } catch (error) {
    console.error('Failed to download QR code', error);
  }
};

export const handleCopySvg = async (qrRef) => {
  const svgData = getSvgData(qrRef);
  if (!svgData) return false;

  try {
    const canvas = await drawCanvas(svgData);
    const blob = await new Promise((resolve) =>
      canvas.toBlob(resolve, 'image/png', 1.0)
    );
    if (!blob) return false;
    await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
    return true;
  } catch {
    try {
      await navigator.clipboard.writeText(svgData);
      return true;
    } catch {
      return false;
    }
  }
};

export const handleShare = async (qrRef) => {
  if (!navigator.share) {
    const copied = await handleCopySvg(qrRef);
    return copied ? 'copied' : false;
  }

  const svgData = getSvgData(qrRef);
  if (!svgData) return false;

  try {
    const canvas = await drawCanvas(svgData);
    const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png', 1.0));
    const file = new File([blob], 'qr-code.png', { type: 'image/png' });

    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      await navigator.share({
        files: [file],
        title: 'QR Code',
      });
      return 'shared';
    }
    const copied = await handleCopySvg(qrRef);
    return copied ? 'copied' : false;
  } catch (error) {
    if (error.name !== 'AbortError') {
      console.error('Error sharing:', error);
    }
    return false;
  }
};

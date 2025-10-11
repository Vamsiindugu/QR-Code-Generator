const getSvgData = (qrRef) => {
  if (!qrRef.current) return null;
  const svgElement = qrRef.current.querySelector('svg');
  if (!svgElement) return null;
  return new XMLSerializer().serializeToString(svgElement);
};

const drawCanvas = (svgData, size = 512) => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const padding = { top: 32, right: 32, bottom: 32, left: 32 };
    const borderRadius = 24;

    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');

    ctx.beginPath();
    ctx.moveTo(borderRadius, 0);
    ctx.lineTo(size - borderRadius, 0);
    ctx.quadraticCurveTo(size, 0, size, borderRadius);
    ctx.lineTo(size, size - borderRadius);
    ctx.quadraticCurveTo(size, size, size - borderRadius, size);
    ctx.lineTo(borderRadius, size);
    ctx.quadraticCurveTo(0, size, 0, size - borderRadius);
    ctx.lineTo(0, borderRadius);
    ctx.quadraticCurveTo(0, 0, borderRadius, 0);
    ctx.closePath();

    ctx.clip();
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

export const handleDownload = async (qrRef) => {
  const svgData = getSvgData(qrRef);
  if (!svgData) return;

  try {
    const canvas = await drawCanvas(svgData);
    const jpgUrl = canvas.toDataURL('image/jpeg');
    
    const a = document.createElement('a');
    a.href = jpgUrl;
    a.download = 'qr-code.jpg';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  } catch (error) {
    console.error("Failed to download QR code", error);
    alert("Failed to download QR code. Please try again.");
  }
};

export const handleShare = async (qrRef) => {
  if (!navigator.share) {
    alert("Web Share API is not supported in your browser. Try downloading instead.");
    return;
  }

  const svgData = getSvgData(qrRef);
  if (!svgData) return;

  try {
    const canvas = await drawCanvas(svgData);
    const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png', 1.0));
    const file = new File([blob], 'qr-code.png', { type: 'image/png' });

    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      await navigator.share({
        files: [file],
        title: 'My QR Code',
        text: 'Check out this QR code!',
      });
    } else {
      alert("Your browser doesn't support sharing files. Try downloading instead.");
    }
  } catch (error) {
    if (error.name !== 'AbortError') {
      console.error('Error sharing:', error);
      alert("Failed to share the QR code. Try downloading instead.");
    }
  }
};

import React, { useEffect, useRef } from 'react';

const ALLOWED_SVG_TAGS = new Set([
  'svg', 'path', 'rect', 'circle', 'g', 'defs', 'title',
  'lineargradient', 'radialgradient', 'stop', 'polygon', 'polyline', 'line',
]);

const ALLOWED_ATTRS = new Set([
  'xmlns', 'viewbox', 'width', 'height', 'd', 'fill', 'stroke',
  'stroke-width', 'x', 'y', 'cx', 'cy', 'r', 'rx', 'ry',
  'transform', 'id', 'offset', 'stop-color', 'stop-opacity',
  'points', 'x1', 'y1', 'x2', 'y2', 'gradientunits',
  'color',
]);

function sanitizeSvg(svgString) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(svgString, 'image/svg+xml');
  const errors = doc.querySelectorAll('parsererror');
  if (errors.length) return null;

  function cleanNode(node) {
    if (node.nodeType === Node.ELEMENT_NODE) {
      if (!ALLOWED_SVG_TAGS.has(node.tagName.toLowerCase())) {
        node.remove();
        return;
      }
      const attrs = Array.from(node.attributes);
      for (const attr of attrs) {
        if (!ALLOWED_ATTRS.has(attr.name.toLowerCase())) {
          node.removeAttribute(attr.name);
        }
        if (attr.value && /(javascript|data|vbscript):/i.test(attr.value)) {
          node.removeAttribute(attr.name);
        }
      }
      Array.from(node.childNodes).forEach(cleanNode);
    } else if (node.nodeType === Node.COMMENT_NODE) {
      node.remove();
    }
  }

  cleanNode(doc.documentElement);
  return new XMLSerializer().serializeToString(doc.documentElement);
}

const QrDisplay = ({ qrSvg, isLoading, qrRef }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || !qrSvg) return;
    const sanitized = sanitizeSvg(qrSvg);
    if (!sanitized) return;
    containerRef.current.innerHTML = '';
    const temp = document.createElement('div');
    temp.innerHTML = sanitized;
    while (temp.firstChild) {
      containerRef.current.appendChild(temp.firstChild);
    }
  }, [qrSvg]);

  if (isLoading) {
    return (
      <div
        className="w-full aspect-square flex items-center justify-center"
        role="status"
        aria-label="Generating QR code"
      >
        <div className="w-5 h-5 border-2 border-ink dark:border-ink-dark border-t-transparent rounded-full animate-spin-slow" />
      </div>
    );
  }

  if (!qrSvg) {
    return (
      <div
        className="w-full aspect-square flex items-center justify-center text-sm text-ink-tertiary dark:text-ink-dark-tertiary"
        role="alert"
      >
        Could not generate QR code.
      </div>
    );
  }

  return (
    <div
      ref={(el) => {
        containerRef.current = el;
        if (qrRef) qrRef.current = el;
      }}
      className="w-full animate-qr-in"
      role="img"
      aria-label="Generated QR code"
    />
  );
};

export default QrDisplay;

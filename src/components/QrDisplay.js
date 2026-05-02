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
  'color', 'shape-rendering',
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
  const revealKeyRef = useRef(0);

  useEffect(() => {
    if (qrSvg) {
      revealKeyRef.current += 1;
    }
  }, [qrSvg]);

  useEffect(() => {
    if (!containerRef.current || !qrSvg) return;
    const sanitized = sanitizeSvg(qrSvg);
    if (!sanitized) return;
    containerRef.current.innerHTML = '';
    const temp = document.createElement('div');
    temp.innerHTML = sanitized;
    const svg = temp.firstChild;
    if (svg) {
      svg.setAttribute('width', '100%');
      svg.setAttribute('height', '100%');
      svg.style.display = 'block';
      containerRef.current.appendChild(svg);
    }
  }, [qrSvg]);

  if (isLoading) {
    return (
      <div
        className="w-full h-full flex flex-col items-center justify-center gap-3"
        role="status"
        aria-label="Generating QR code"
      >
        <div className="relative w-8 h-8">
          <div className="absolute inset-0 rounded-full border-2 border-[rgba(124,106,247,0.15)]" />
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-accent animate-spin-accent" />
          <div className="absolute inset-[10px] rounded-full bg-accent opacity-60 animate-pulse" />
        </div>
        <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-ink-tertiary dark:text-ink-dark-tertiary">
          Generating
        </span>
      </div>
    );
  }

  if (!qrSvg) {
    return (
      <div
        className="w-full h-full flex items-center justify-center text-sm text-ink-tertiary dark:text-ink-dark-tertiary"
        role="alert"
      >
        Could not generate QR code.
      </div>
    );
  }

  return (
    <div
      key={revealKeyRef.current}
      ref={(el) => {
        containerRef.current = el;
        if (qrRef) qrRef.current = el;
      }}
      className="w-full h-full flex items-center justify-center animate-qr-reveal"
      role="img"
      aria-label="Generated QR code"
    />
  );
};

export default QrDisplay;

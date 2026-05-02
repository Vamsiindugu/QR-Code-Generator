/* eslint-disable no-restricted-globals */

import QRCode from 'qrcode';

const EC_LEVELS = {
  L: { label: 'Low (7%)', capacity: 2953 },
  M: { label: 'Medium (15%)', capacity: 2331 },
  Q: { label: 'Quartile (25%)', capacity: 1663 },
  H: { label: 'High (30%)', capacity: 1273 },
};

const EC_ORDER = ['L', 'M', 'Q', 'H'];

function findBestECLevel(byteLength) {
  for (const level of EC_ORDER) {
    if (byteLength <= EC_LEVELS[level].capacity) {
      return level;
    }
  }
  return null;
}

self.onmessage = (e) => {
  const { text, options } = e.data;

  if (!text) {
    self.postMessage({ svgString: '', capacityInfo: null });
    return;
  }

  const requestedEC = options?.errorCorrectionLevel || 'M';
  const maxCapacity = EC_LEVELS[requestedEC]?.capacity || 2331;
  const byteLength = new TextEncoder().encode(text).length;

  let effectiveEC = requestedEC;
  let autoDowngraded = false;

  if (byteLength > maxCapacity) {
    const bestFit = findBestECLevel(byteLength);
    if (bestFit !== null && EC_ORDER.indexOf(bestFit) < EC_ORDER.indexOf(requestedEC)) {
      effectiveEC = bestFit;
      autoDowngraded = true;
    } else if (bestFit === null) {
      // text exceeds even the lowest EC level (L) — use L for accurate capacity messaging
      effectiveEC = 'L';
    }
  }

  const effectiveMaxCapacity = EC_LEVELS[effectiveEC]?.capacity || 2331;
  const capacityInfo = {
    level: effectiveEC,
    requestedLevel: requestedEC,
    levelLabel: EC_LEVELS[effectiveEC]?.label || effectiveEC,
    maxCapacity: effectiveMaxCapacity,
    currentBytes: byteLength,
    percentUsed: Math.round((byteLength / effectiveMaxCapacity) * 100),
    isOverCapacity: byteLength > effectiveMaxCapacity,
    autoDowngraded,
  };

  if (byteLength > effectiveMaxCapacity) {
    self.postMessage({
      error: `Text too long (${byteLength} bytes). Maximum is ${effectiveMaxCapacity} bytes even at lowest error correction. Shorten your text to generate a QR code.`,
      capacityInfo,
    });
    return;
  }

  const qrOptions = {
    ...options,
    errorCorrectionLevel: effectiveEC,
  };

  QRCode.toString(text, qrOptions, (err, string) => {
    if (err) {
      self.postMessage({ error: err.message || 'Failed to generate QR code', capacityInfo });
    } else {
      self.postMessage({ svgString: string, capacityInfo });
    }
  });
};

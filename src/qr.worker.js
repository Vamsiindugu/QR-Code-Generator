/* eslint-disable no-restricted-globals */

import QRCode from 'qrcode';

// eslint-disable-next-line no-restricted-globals
self.onmessage = (e) => {
  const { text, options } = e.data;

  if (!text) {
    return;
  }

  QRCode.toString(text, options, (err, string) => {
    if (err) {
      // eslint-disable-next-line no-restricted-globals
      self.postMessage({ error: err });
    } else {
      // eslint-disable-next-line no-restricted-globals
      self.postMessage({ svgString: string });
    }
  });
};

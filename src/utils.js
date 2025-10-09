// src/utils.js

export function sanitizeForQRCode(input) {
  if (typeof input !== 'string') {
    return '';
  }

  // 1. Disallow dangerous protocols to prevent XSS via javascript: or data: URLs.
  const dangerousProtocols = /^(javascript|data|vbscript):/i;
  if (dangerousProtocols.test(input.trim())) {
    return '';
  }

  // 2. For this use case, we assume no HTML is desired in the QR code.
  // Strip all HTML tags to prevent any potential script injection.
  const strippedInput = input.replace(/<[^>]*>?/gm, '');

  return strippedInput;
}

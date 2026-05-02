export function sanitizeForQRCode(input) {
  if (typeof input !== 'string') {
    return '';
  }

  const dangerousProtocols = /^(javascript|data|vbscript):/i;
  if (dangerousProtocols.test(input.trim())) {
    return '';
  }

  return input;
}

export function getByteLength(str) {
  return new TextEncoder().encode(str).length;
}

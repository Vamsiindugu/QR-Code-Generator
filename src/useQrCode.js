import { useState, useEffect, useRef } from 'react';
import { useDebounce } from './useDebounce';
import { sanitizeForQRCode } from './utils';

export const useQrCode = (initialValue = 'https://generator.app', isDark) => {
  const [inputText, setInputText] = useState('');
  const [qrSvg, setQrSvg] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const debouncedInputText = useDebounce(inputText, 300);
  const workerRef = useRef(null);

  useEffect(() => {
    // Initialize the worker
    workerRef.current = new Worker(new URL('./qr.worker.js', import.meta.url));

    const onMessage = (e) => {
      if (e.data.error) {
        console.error('QR Worker Error:', e.data.error);
        setQrSvg(null); // Set to null or some error indicator
      } else {
        setQrSvg(e.data.svgString);
      }
      setIsLoading(false);
    };

    workerRef.current.addEventListener('message', onMessage);

    // Cleanup
    return () => {
      workerRef.current.terminate();
    };
  }, []);

  useEffect(() => {
    const textToEncode = debouncedInputText ? sanitizeForQRCode(debouncedInputText) : initialValue;
    setIsLoading(true);
    workerRef.current.postMessage({
      text: textToEncode,
      options: {
        type: 'svg',
        width: 256,
        margin: 1,
        color: {
          dark: isDark ? '#FFFFFF' : '#000000',
          light: isDark ? '#10141E' : '#FFFFFF',
        },
      },
    });
  }, [debouncedInputText, initialValue, isDark]);

  return {
    inputText,
    setInputText,
    qrSvg,
    isLoading,
  };
};

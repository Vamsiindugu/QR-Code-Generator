import { useState, useEffect, useRef, useCallback } from 'react';
import { useDebounce } from './useDebounce';
import { sanitizeForQRCode } from '../utils/sanitize';

export const useQrCode = (initialValue = 'https://generator.app', isDark) => {
  const [inputText, setInputText] = useState('');
  const [qrSvg, setQrSvg] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [errorCorrectionLevel, setErrorCorrectionLevel] = useState('M');
  const [capacityInfo, setCapacityInfo] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const debouncedInputText = useDebounce(inputText, 300);
  const workerRef = useRef(null);

  useEffect(() => {
    workerRef.current = new Worker(new URL('../workers/qr.worker.js', import.meta.url));

    const onMessage = (e) => {
      if (e.data.capacityInfo) {
        setCapacityInfo(e.data.capacityInfo);
      }
      if (e.data.error) {
        console.error('QR Worker Error:', e.data.error);
        setQrSvg(null);
        setErrorMessage(e.data.error);
      } else {
        setQrSvg(e.data.svgString);
        setErrorMessage('');
      }
      setIsLoading(false);
    };

    workerRef.current.addEventListener('message', onMessage);

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
        errorCorrectionLevel,
        color: {
          dark: isDark ? '#e8e8e8' : '#111111',
          light: isDark ? '#141414' : '#ffffff',
        },
      },
    });
  }, [debouncedInputText, initialValue, isDark, errorCorrectionLevel]);

  const handleInputChange = useCallback((value) => {
    setInputText(value);
    setErrorMessage('');
  }, []);

  return {
    inputText,
    setInputText: handleInputChange,
    qrSvg,
    isLoading,
    errorCorrectionLevel,
    setErrorCorrectionLevel,
    capacityInfo,
    errorMessage,
  };
};

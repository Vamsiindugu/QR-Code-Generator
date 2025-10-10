// src/GeneratorSection.js

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from './ThemeContext';
import QRCode from 'react-qr-code';
import { useDebounce } from './useDebounce';
import { sanitizeForQRCode } from './utils';
import Button from './Button';
import ShareAnimatedButton from './ShareAnimatedButton';

const GeneratorSection = () => {
  const { isDark } = useTheme();
  const [inputText, setInputText] = useState(''); 
  const [qrContent, setQrContent] = useState('https://generator.app'); 
  const debouncedInputText = useDebounce(inputText, 300);
  const qrRef = useRef(null); 

  useEffect(() => {
    if (debouncedInputText) {
      setQrContent(sanitizeForQRCode(debouncedInputText));
    } else {
      setQrContent('https://generator.app');
    }
  }, [debouncedInputText]);

  // Optimized Framer Motion animation
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.6, 
        delay: 0.1,
        ease: "easeOut"
      }
    }
  };

  // Download Logic (JPG)
  const handleDownload = () => {
    if (!qrRef.current) return;

    const svgElement = qrRef.current.querySelector('svg');
    if (!svgElement) return;

    const svgData = new XMLSerializer().serializeToString(svgElement);
    
    const canvas = document.createElement('canvas');
    const canvasSize = 512;
    const padding = { top: 0, right: 32, bottom: 32, left: 0 };
    const borderRadius = 24;

    canvas.width = canvasSize;
    canvas.height = canvasSize;
    const ctx = canvas.getContext('2d');

    ctx.beginPath();
    ctx.moveTo(borderRadius, 0);
    ctx.lineTo(canvasSize - borderRadius, 0);
    ctx.quadraticCurveTo(canvasSize, 0, canvasSize, borderRadius);
    ctx.lineTo(canvasSize, canvasSize - borderRadius);
    ctx.quadraticCurveTo(canvasSize, canvasSize, canvasSize - borderRadius, canvasSize);
    ctx.lineTo(borderRadius, canvasSize);
    ctx.quadraticCurveTo(0, canvasSize, 0, canvasSize - borderRadius);
    ctx.lineTo(0, borderRadius);
    ctx.quadraticCurveTo(0, 0, borderRadius, 0);
    ctx.closePath();

    ctx.clip();
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const img = new Image();
    img.onload = () => {
      const qrWidth = canvasSize - padding.left - padding.right;
      const qrHeight = canvasSize - padding.top - padding.bottom;
      ctx.drawImage(img, padding.left, padding.top, qrWidth, qrHeight);
      const jpgUrl = canvas.toDataURL('image/jpeg');
      
      const a = document.createElement('a');
      a.href = jpgUrl;
      a.download = 'qr-code.jpg';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    };
    
    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
  };

  // Share Logic (Web Share API with Image)
  const handleShare = async () => {
    if (!navigator.share) {
      alert("Web Share API is not supported in your browser. Try downloading instead.");
      return;
    }

    if (!qrRef.current) return;

    const svgElement = qrRef.current.querySelector('svg');
    if (!svgElement) return;

    try {
      const svgData = new XMLSerializer().serializeToString(svgElement);
      
      const canvas = document.createElement('canvas');
      const canvasSize = 512;
      const padding = { top: 0, right: 32, bottom: 32, left: 0 };
      const borderRadius = 24;

      canvas.width = canvasSize;
      canvas.height = canvasSize;
      const ctx = canvas.getContext('2d');

      ctx.beginPath();
      ctx.moveTo(borderRadius, 0);
      ctx.lineTo(canvasSize - borderRadius, 0);
      ctx.quadraticCurveTo(canvasSize, 0, canvasSize, borderRadius);
      ctx.lineTo(canvasSize, canvasSize - borderRadius);
      ctx.quadraticCurveTo(canvasSize, canvasSize, canvasSize - borderRadius, canvasSize);
      ctx.lineTo(borderRadius, canvasSize);
      ctx.quadraticCurveTo(0, canvasSize, 0, canvasSize - borderRadius);
      ctx.lineTo(0, borderRadius);
      ctx.quadraticCurveTo(0, 0, borderRadius, 0);
      ctx.closePath();

      ctx.clip();
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const img = new Image();
      
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
      });

      const qrWidth = canvasSize - padding.left - padding.right;
      const qrHeight = canvasSize - padding.top - padding.bottom;
      ctx.drawImage(img, padding.left, padding.top, qrWidth, qrHeight);

      const blob = await new Promise((resolve) => {
        canvas.toBlob(resolve, 'image/png', 1.0);
      });

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

  const qrStyle = useMemo(() => ({
    background: 'white',
    padding: '16px',
    borderRadius: '8px'
  }), []);

  return (
    <motion.section
      id="generator"
      className="min-h-screen bg-white dark:bg-[#010409] transition-colors duration-500 p-8 md:p-16 lg:p-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={sectionVariants}
    >
      <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-10 border-b-2 border-indigo-600/50 pb-2">
        QR Code Generator
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-40">
        
        {/* LEFT COLUMN: Input and Controls */}
        <div className="lg:order-1 order-2">
          <label htmlFor="content-input" className="block text-xl font-semibold mb-3 text-gray-700 dark:text-gray-200">
            Your Content:
          </label>
          <textarea
            id="content-input"
            rows="10"
            value={inputText}
            onChange={(e) => setInputText(e.target.value.slice(0, 1200))}
            placeholder="Enter text, a URL (e.g., https://google.com), or any message here..."
            className="w-full p-4 border-2 border-gray-300 dark:border-gray-600 rounded-xl resize-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-[#030712] dark:text-white transition-colors duration-300 text-lg font-mono"
          />
          <p className="text-right text-sm text-gray-500 dark:text-gray-400 mt-1">
            {inputText.length} / 1200
          </p>
        </div>

        {/* RIGHT COLUMN: Output and Actions */}
        <div className="lg:order-2 order-1 flex flex-col items-center justify-center bg-gray-50 dark:bg-[#10141E] p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-600">
          
          <div ref={qrRef} className="p-4 border-4 border-gray-200 dark:border-gray-600 rounded-xl shadow-inner">
             <QRCode
                value={qrContent}
                size={256}
                fgColor={isDark ? '#1F2937' : '#000000'} 
                bgColor={'#FFFFFF'} 
                level="H" 
                style={qrStyle} 
              />
          </div>
          
          <div className="flex justify-center mt-8 w-full max-w-sm space-x-4">
            <Button 
                onClick={handleDownload} 
                className="flex-1 max-w-[150px]"
            >
                Download
            </Button>

            <ShareAnimatedButton 
                onClick={handleShare} 
                className="flex-1 max-w-[150px]"
            >
                Share
            </ShareAnimatedButton>
          </div>
        </div>

      </div>
    </motion.section>
  );
};

export default GeneratorSection;
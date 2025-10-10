// src/GeneratorSection.js

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from './ThemeContext';
import { useQrCode } from './useQrCode';
import { handleDownload, handleShare } from './qrUtils';
import ErrorBoundary from './ErrorBoundary';
import QrDisplay from './QrDisplay';
import Button from './Button';
import ShareAnimatedButton from './ShareAnimatedButton';

const GeneratorSection = () => {
  const { isDark } = useTheme();
  const qrRef = useRef(null);
  const { inputText, setInputText, qrSvg, isLoading } = useQrCode('https://generator.app', isDark);

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

        <div className="lg:order-2 order-1 flex flex-col items-center justify-center bg-gray-50 dark:bg-[#10141E] p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-600">
          
          <ErrorBoundary fallback={<h2>Could not generate QR code.</h2>}>
            <QrDisplay qrSvg={qrSvg} isLoading={isLoading} qrRef={qrRef} />
          </ErrorBoundary>
          
          <div className="flex justify-center mt-8 w-full max-w-sm space-x-4">
            <Button 
                onClick={() => handleDownload(qrRef)} 
                className="flex-1 max-w-[150px]"
            >
                Download
            </Button>

            <ShareAnimatedButton 
                onClick={() => handleShare(qrRef)} 
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
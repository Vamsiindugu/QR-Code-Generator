// src/LandingSection.js

import React from 'react';
import { motion } from 'framer-motion';
import AnimatedButton from './AnimatedButton';

const LandingSection = () => {

  const scrollToGenerator = () => {
    document.getElementById('generator')?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  // Optimized animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.section
      id="landing"
      className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-[#010409] transition-colors duration-500 text-center p-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-4xl">
        {/* Headline */}
        <motion.h1
          className="text-7xl md:text-8xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6"
          variants={itemVariants}
        >
          Say it with your <br /><span className="text-indigo-600 dark:text-[#A100FF]">QR.</span>
        </motion.h1>

        {/* Description */}
        <motion.div
          className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-4xl mx-auto space-y-4 text-left py-8"
          variants={itemVariants}
        >
          <p>🚀 Share websites, Wi-Fi access, contact info, <span className="font-extrabold">secret messages</span> - all in one scan.</p>
          <p>⚡ Stop typing out long links. Start generating beautiful, functional QR codes instantly.</p>
          <p>🔒 Your content stays yours. No tracking, just seamless sharing.</p>
          <p>💰 High-quality results without the price tag, all for free and unlimited usage.</p>
        </motion.div>

        {/* CTA Button */}
        <motion.div variants={itemVariants}>
          <AnimatedButton onClick={scrollToGenerator} />
        </motion.div>
      </div>
    </motion.section>
  );
};

export default LandingSection;
// src/LandingSection.js

import React from 'react';
import { motion } from 'framer-motion';

const LandingSection = () => {

  const scrollToGenerator = () => {
    // Standard smooth scroll to the #generator ID (smooth behavior defined in index.css)
    document.getElementById('generator').scrollIntoView({ behavior: 'smooth' });
  };

  // Framer Motion variants for subtle entry animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Stagger children animations
        duration: 0.8
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <motion.section
      id="landing"
      className="flex flex-col items-center justify-center h-screen bg-white dark:bg-gray-900 transition-colors duration-500 text-center p-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-4xl">
        {/* Headline */}
        <motion.h1
          className="text-6xl md:text-8xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6"
          variants={itemVariants}
        >
          Say it with your <span className="text-indigo-600 dark:text-indigo-400">QR.</span>
        </motion.h1>

        {/* Description */}
        <motion.div
          className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-3xl mx-auto space-y-4 text-left py-8"
          variants={itemVariants}
        >
          <p>🚀 Share websites, Wi-Fi access, contact info, or secret messages - all in one scan.</p>
          <p>⚡ Stop typing out long links. Start generating beautiful, functional QR codes instantly.</p>
          <p>🔒 Your content stays yours. No tracking, just seamless sharing.</p>
          <p>💰 High-quality results without the price tag, all for free and unlimited usage.</p>
        </motion.div>

        {/* CTA Button */}
        <motion.button
          onClick={scrollToGenerator}
          className="px-10 py-4 text-lg font-semibold rounded-full bg-indigo-600 text-white shadow-xl hover:bg-indigo-700 transition duration-300 transform hover:scale-105"
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Start Generating &rarr;
        </motion.button>
      </div>
    </motion.section>
  );
};

export default LandingSection;

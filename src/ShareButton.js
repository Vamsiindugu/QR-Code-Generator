// src/ShareButton.js
import React from 'react';

const ShareButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="relative inline-flex items-center justify-center p-1 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
    >
      <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
        Share QR
      </span>
    </button>
  );
};

export default ShareButton;
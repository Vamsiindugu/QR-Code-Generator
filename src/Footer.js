// src/Footer.js

import React from 'react';

const Footer = () => {
  return (
    <footer className='bg-gray-100 dark:bg-gray-900 transition-colors duration-500'>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <a href="mailto:vamsiindugu@gmail.com" className="text-base text-black dark:text-white font-medium hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300">
          💌 vamsiindugu@gmail.com
          </a>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-700 pt-8 sm:flex items-center justify-between text-center">
          <p className="text-base text-black dark:text-white font-medium">
            © 2025 Vamsi Indugu. All rights reserved
          </p>
          <ul className='flex items-center gap-6 justify-center mt-4 sm:mt-0'>
            <li><a target='_blank' rel="noreferrer" href='https://vamsiindugu.vercel.app/' className="text-base text-black dark:text-white font-medium hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300">👩🏻‍💻 Portfolio</a></li>
            <li><a target='_blank' rel="noreferrer" href='https://github.com/Vamsiindugu/' className="text-base text-black dark:text-white font-medium hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300">🐱 Github</a></li>
            <li><a target='_blank' rel="noreferrer" href='https://www.linkedin.com/in/vamsi-indugu/' className="text-base text-black dark:text-white font-medium hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300"> 💼 LinkedIn</a></li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer;

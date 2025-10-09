// src/Button.js
import React from 'react';

const Button = ({ onClick, children }) => {
  return (
    <button onClick={onClick} className="group relative w-auto cursor-pointer overflow-hidden rounded-full border border-gray-200 bg-white px-5 py-2 text-center font-medium text-gray-900 shadow-sm transition-all duration-300 hover:shadow-md dark:border-gray-800 dark:bg-gray-950 dark:text-white dark:hover:border-gray-700">
      <div className="flex items-center gap-3">
        <div className="h-4 w-4 rounded-full bg-gray-900 transition-all duration-300 group-hover:scale-[100.8] dark:bg-white" />
        <span className="inline-block transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0">
          {children}
        </span>
      </div>
      <div className="absolute top-0 z-10 flex h-full w-full translate-x-12 items-center justify-center gap-3 bg-gray-900 text-white opacity-0 transition-all duration-300 group-hover:-translate-x-5 group-hover:opacity-100 dark:bg-gray-100 dark:text-gray-900">
        <div className="flex items-center gap-3 whitespace-nowrap">
          <span className="leading-none font-medium">{children}</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 leading-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h14" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 6l6 6-6 6" />
          </svg>
        </div>
      </div>
    </button>
  );
}

export default Button;

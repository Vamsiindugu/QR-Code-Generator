import React from 'react';

const StaticBackToTop = () => {
  return (
    <div className="flex justify-center py-8 bg-surface dark:bg-surface-dark">
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
        className="group flex items-center gap-1.5 text-xs font-medium text-ink-tertiary dark:text-ink-dark-tertiary hover:text-ink dark:hover:text-ink-dark transition-colors duration-200"
      >
        <svg
          className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-y-0.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
        </svg>
        Top
      </button>
    </div>
  );
};

export default StaticBackToTop;

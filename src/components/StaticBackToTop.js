import React, { useState, useEffect } from 'react';

const StaticBackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={`fixed bottom-6 right-6 z-50 w-10 h-10 rounded-full flex items-center justify-center bg-[rgba(0,0,0,0.04)] dark:bg-[rgba(255,255,255,0.06)] border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.10)] backdrop-blur-sm hover:bg-[rgba(124,106,247,0.15)] hover:border-accent/40 hover:shadow-glow-sm transition-all duration-300 group ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <svg
        className="w-3.5 h-3.5 text-ink-tertiary dark:text-ink-dark-tertiary group-hover:text-accent transition-colors duration-200"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2.5}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
      </svg>
    </button>
  );
};

export default StaticBackToTop;

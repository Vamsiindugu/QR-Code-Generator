import React, { useState, useCallback } from 'react';

const Button = ({
  onClick,
  children,
  variant = 'secondary',
  className = '',
  type = 'button',
  disabled = false,
  feedback = false,
  feedbackLabel,
}) => {
  const [feedbackActive, setFeedbackActive] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');

  const handleClick = useCallback(async (e) => {
    if (!onClick) return;
    const result = onClick(e);
    if (feedback && result !== undefined) {
      const value = result instanceof Promise ? await result : result;
      if (value) {
        const defaultLabel = variant === 'primary' ? 'Shared' : 'Copied';
        const text = typeof value === 'string' ? value : (feedbackLabel || defaultLabel);
        const label = text.charAt(0).toUpperCase() + text.slice(1) + ' ✓';
        setFeedbackText(label);
        setFeedbackActive(true);
        setTimeout(() => setFeedbackActive(false), 1200);
      }
    }
  }, [onClick, feedback, feedbackLabel, variant]);

  const base =
    'inline-flex items-center justify-center gap-2 text-xs font-semibold transition-all duration-200 ease-out active:scale-[0.96] disabled:opacity-40 disabled:pointer-events-none';

  const variants = {
    primary:
      'px-4 py-2 rounded-lg bg-gradient-to-r from-accent to-[#5e9af5] text-white hover:shadow-glow-sm hover:from-accent-bright hover:to-[#7ab0ff]',
    secondary:
      'px-3 py-2 bg-[rgba(0,0,0,0.04)] dark:bg-[rgba(255,255,255,0.05)] text-ink-secondary dark:text-[#a8a6c0] border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.09)] rounded-lg hover:bg-[rgba(0,0,0,0.08)] dark:hover:bg-[rgba(255,255,255,0.09)] hover:text-ink dark:hover:text-ink-dark hover:border-[rgba(0,0,0,0.14)] dark:hover:border-[rgba(255,255,255,0.16)] hover:shadow-[0_0_16px_rgba(124,106,247,0.1)]',
    ghost:
      'px-3 py-1.5 text-ink-secondary dark:text-ink-dark-secondary rounded-md hover:bg-[rgba(0,0,0,0.04)] dark:hover:bg-[rgba(255,255,255,0.06)]',
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={disabled}
      className={`${base} ${variants[variant] || variants.secondary} ${
        feedbackActive ? 'animate-success' : ''
      } ${className}`}
    >
      {feedbackActive ? feedbackText : children}
    </button>
  );
};

export default Button;

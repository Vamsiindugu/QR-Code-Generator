import React, { useState, useCallback } from 'react';

const Button = ({
  onClick,
  children,
  variant = 'secondary',
  className = '',
  type = 'button',
  disabled = false,
  feedback = false,
  feedbackLabel = 'Copied',
}) => {
  const [feedbackActive, setFeedbackActive] = useState(false);

  const handleClick = useCallback(async (e) => {
    if (!onClick) return;
    const result = onClick(e);
    if (feedback && result !== undefined) {
      const success = result instanceof Promise ? await result : result;
      if (success) {
        setFeedbackActive(true);
        setTimeout(() => setFeedbackActive(false), 1200);
      }
    }
  }, [onClick, feedback]);

  const base =
    'inline-flex items-center justify-center gap-2 text-sm font-medium transition-all duration-200 ease-out active:scale-[0.97] disabled:opacity-40 disabled:pointer-events-none';

  const variants = {
    primary:
      'px-5 py-2.5 bg-ink text-white dark:bg-ink-dark dark:text-surface-dark rounded-md hover:opacity-80',
    secondary:
      'px-4 py-2 bg-surface-raised dark:bg-surface-dark-raised text-ink dark:text-ink-dark border border-stroke dark:border-stroke-dark rounded-md hover:border-ink dark:hover:border-ink-dark',
    ghost:
      'px-3 py-1.5 text-ink-secondary dark:text-ink-dark-secondary rounded-md hover:bg-stroke/50 dark:hover:bg-stroke-dark/50',
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={disabled}
      className={`${base} ${variants[variant] || variants.secondary} ${
        feedbackActive ? 'ring-2 ring-accent/30 ring-offset-1' : ''
      } ${className}`}
    >
      {feedbackActive ? feedbackLabel : children}
    </button>
  );
};

export default Button;

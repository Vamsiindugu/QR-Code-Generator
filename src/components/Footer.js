import React from 'react';

const Footer = () => {
  return (
    <footer className="border-t border-stroke dark:border-stroke-dark bg-surface dark:bg-surface-dark">
      <div className="max-w-5xl mx-auto py-8 px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-ink-tertiary dark:text-ink-dark-tertiary">
          &copy; {new Date().getFullYear()} Vamsi Indugu
        </p>
        <div className="flex items-center gap-5">
          <a
            target="_blank"
            rel="noreferrer"
            href="https://vamsiindugu.vercel.app/"
            className="text-xs text-ink-tertiary dark:text-ink-dark-tertiary hover:text-ink dark:hover:text-ink-dark transition-colors duration-200"
          >
            Portfolio
          </a>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://github.com/Vamsiindugu/"
            className="text-xs text-ink-tertiary dark:text-ink-dark-tertiary hover:text-ink dark:hover:text-ink-dark transition-colors duration-200"
          >
            GitHub
          </a>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://www.linkedin.com/in/vamsi-indugu/"
            className="text-xs text-ink-tertiary dark:text-ink-dark-tertiary hover:text-ink dark:hover:text-ink-dark transition-colors duration-200"
          >
            LinkedIn
          </a>
          <a
            href="mailto:vamsiindugu@gmail.com"
            className="text-xs text-ink-tertiary dark:text-ink-dark-tertiary hover:text-ink dark:hover:text-ink-dark transition-colors duration-200"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

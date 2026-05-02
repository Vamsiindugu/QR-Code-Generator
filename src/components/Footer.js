import React from 'react';

const Footer = () => {
  return (
    <footer>
      <div className="max-w-5xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-[rgba(0,0,0,0.08)] dark:via-[rgba(255,255,255,0.08)] to-transparent" />
      </div>
      <div className="max-w-5xl mx-auto py-8 px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="w-[6px] h-[6px] rounded-full bg-accent opacity-60" />
          <p className="text-[11px] text-ink-tertiary dark:text-ink-dark-tertiary font-sans">
            &copy; {new Date().getFullYear()} Vamsi Indugu
          </p>
        </div>
        <div className="flex items-center gap-6">
          <a
            target="_blank"
            rel="noreferrer"
            href="https://vamsiindugu.vercel.app/"
            className="text-[11px] text-ink-tertiary dark:text-ink-dark-tertiary hover:text-ink dark:hover:text-ink-dark transition-colors duration-200"
          >
            Portfolio
          </a>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://github.com/Vamsiindugu/"
            className="text-[11px] text-ink-tertiary dark:text-ink-dark-tertiary hover:text-ink dark:hover:text-ink-dark transition-colors duration-200"
          >
            GitHub
          </a>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://www.linkedin.com/in/vamsi-indugu/"
            className="text-[11px] text-ink-tertiary dark:text-ink-dark-tertiary hover:text-ink dark:hover:text-ink-dark transition-colors duration-200"
          >
            LinkedIn
          </a>
          <a
            href="mailto:vamsiindugu@gmail.com"
            className="text-[11px] text-ink-tertiary dark:text-ink-dark-tertiary hover:text-ink dark:hover:text-ink-dark transition-colors duration-200"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React from 'react';

const LandingSection = () => {
  const scrollToGenerator = () => {
    document.getElementById('generator')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <section
      id="landing"
      className="flex flex-col items-center justify-center min-h-screen bg-surface dark:bg-surface-dark px-6"
    >
      <div className="max-w-2xl text-center">
        <p className="text-sm font-medium tracking-widest uppercase text-accent mb-6 animate-fade-up">
          QR Code Generator
        </p>

        <h1
          className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tightest text-ink dark:text-ink-dark leading-[1.05] mb-8 animate-fade-up"
          style={{ animationDelay: '0.08s' }}
        >
          Turn anything<br />into a scan.
        </h1>

        <p
          className="text-lg md:text-xl text-ink-secondary dark:text-ink-dark-secondary leading-relaxed max-w-lg mx-auto mb-12 animate-fade-up"
          style={{ animationDelay: '0.16s' }}
        >
          Links, text, contact info, Wi-Fi credentials. One QR code, zero friction. No tracking, no limits, no account required.
        </p>

        <div
          className="animate-fade-up"
          style={{ animationDelay: '0.24s' }}
        >
          <button
            onClick={scrollToGenerator}
            className="group inline-flex items-center gap-2 text-sm font-semibold text-ink dark:text-ink-dark hover:text-accent dark:hover:text-accent transition-colors duration-200"
          >
            Generate a code
            <svg
              className="w-4 h-4 transition-transform duration-200 group-hover:translate-y-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default LandingSection;

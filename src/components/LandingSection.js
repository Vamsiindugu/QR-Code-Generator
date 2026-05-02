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
      className="relative flex flex-col items-center justify-center min-h-screen px-6 overflow-hidden"
    >
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[18%] left-[12%] w-[6px] h-[6px] rounded-[2px] bg-accent/30 animate-float-slow" />
        <div className="absolute top-[25%] right-[18%] w-[4px] h-[4px] rounded-[1px] bg-accent/20 animate-float-mid" />
        <div className="absolute top-[55%] left-[8%] w-[5px] h-[5px] rounded-[2px] bg-accent/25 animate-float-fast" />
        <div className="absolute top-[40%] right-[10%] w-[7px] h-[7px] rounded-[2px] bg-accent/20 animate-float-slow" />
        <div className="absolute top-[70%] left-[22%] w-[4px] h-[4px] rounded-[1px] bg-accent/30 animate-float-mid" />
        <div className="absolute top-[15%] left-[45%] w-[5px] h-[5px] rounded-[2px] bg-accent/15 animate-float-fast" />
        <div className="absolute top-[65%] right-[25%] w-[6px] h-[6px] rounded-[2px] bg-accent/20 animate-float-slow" />
      </div>

      <div className="relative max-w-2xl text-center">
        <p className="animate-label-enter text-sm font-medium tracking-[0.25em] uppercase text-accent mb-6">
          <span className="inline-block w-[6px] h-[6px] rounded-full bg-accent mr-2.5 animate-pulse align-middle" />
          QR Code Generator
        </p>

        <h1
          className="font-display text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tightest leading-[1.05] mb-8 animate-hero-enter bg-gradient-to-b dark:from-ink-dark dark:to-ink-dark-secondary from-ink to-ink-secondary bg-clip-text text-transparent"
          style={{ animationDelay: '0.1s' }}
        >
          Turn anything<br />into a scan.
        </h1>

        <p
          className="text-lg md:text-xl leading-relaxed max-w-lg mx-auto mb-12 animate-hero-enter text-ink-secondary dark:text-ink-dark-secondary"
          style={{ animationDelay: '0.2s' }}
        >
          Links, text, contact info, Wi-Fi credentials. One QR code, zero friction. No tracking, no limits, no account required.
        </p>

        <div className="animate-hero-enter" style={{ animationDelay: '0.32s' }}>
          <button
            onClick={scrollToGenerator}
            className="group inline-flex items-center gap-3 px-6 py-3 rounded-full border dark:border-[rgba(255,255,255,0.12)] border-[rgba(0,0,0,0.08)] dark:bg-[rgba(255,255,255,0.04)] bg-[rgba(0,0,0,0.02)] text-sm font-semibold text-ink dark:text-ink-dark backdrop-blur-sm hover:border-accent hover:bg-accent-muted hover:text-accent-bright hover:shadow-glow-sm transition-all duration-300 ease-out"
          >
            Generate a code
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7" />
            </svg>
          </button>
        </div>

        <div
          className="animate-hero-enter mt-16 flex flex-col items-center gap-2"
          style={{ animationDelay: '0.44s' }}
        >
          <div className="w-px h-12 bg-gradient-to-b from-accent/40 to-transparent" />
          <span className="text-[9px] tracking-[0.4em] uppercase text-ink-tertiary dark:text-ink-dark-tertiary">
            scroll
          </span>
        </div>
      </div>
    </section>
  );
};

export default LandingSection;

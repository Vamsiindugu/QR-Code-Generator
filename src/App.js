import React, { Suspense, lazy, useState } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import LandingSection from './components/LandingSection';
import Footer from './components/Footer';
import Contact from './components/Contact';
import StaticBackToTop from './components/StaticBackToTop';

const GeneratorSection = lazy(() => import('./components/GeneratorSection'));

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();
  const [rotated, setRotated] = useState(false);

  const handleToggle = () => {
    toggleTheme();
    setRotated((prev) => !prev);
  };

  return (
    <button
      onClick={handleToggle}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className="fixed top-5 right-5 z-50 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.10)] backdrop-blur-md hover:bg-[rgba(255,255,255,0.10)] hover:border-[rgba(255,255,255,0.16)] transition-all duration-200 dark:bg-[rgba(255,255,255,0.06)] dark:border-[rgba(255,255,255,0.10)] dark:hover:bg-[rgba(255,255,255,0.10)] dark:hover:border-[rgba(255,255,255,0.16)] not-dark:bg-[rgba(0,0,0,0.04)] not-dark:border-[rgba(0,0,0,0.08)]"
    >
      <span
        className="transition-transform duration-300"
        style={{ transform: rotated ? 'rotate(180deg)' : 'rotate(0deg)' }}
      >
        {isDark ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-ink-dark-tertiary dark:text-ink-dark-tertiary">
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-ink-tertiary">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        )}
      </span>
      <span className="text-[11px] font-medium text-ink-tertiary dark:text-ink-dark-tertiary">
        {isDark ? 'Light' : 'Dark'}
      </span>
    </button>
  );
};

const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg)]">
    <div className="relative w-8 h-8">
      <div className="absolute inset-0 rounded-full border-2 border-[rgba(124,106,247,0.15)]" />
      <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-accent animate-spin-accent" />
    </div>
  </div>
);

const AppContent = () => {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] relative overflow-x-hidden">
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 50% -5%, var(--ambient-glow) 0%, transparent 65%)',
        }}
      />
      <ThemeToggle />
      <main className="min-h-screen">
        <LandingSection />
        <Suspense fallback={<LoadingFallback />}>
          <GeneratorSection />
        </Suspense>
        <Contact />
      </main>
      <StaticBackToTop />
      <Footer />
    </div>
  );
};

const App = () => (
  <ThemeProvider>
    <AppContent />
  </ThemeProvider>
);

export default App;

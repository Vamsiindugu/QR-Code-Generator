import React, { Suspense, lazy } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import LandingSection from './components/LandingSection';
import Footer from './components/Footer';
import Contact from './components/Contact';
import StaticBackToTop from './components/StaticBackToTop';

const GeneratorSection = lazy(() => import('./components/GeneratorSection'));

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className="fixed top-5 right-5 p-2 rounded-md text-ink-tertiary dark:text-ink-dark-tertiary hover:text-ink dark:hover:text-ink-dark hover:bg-stroke/40 dark:hover:bg-stroke-dark/40 transition-colors duration-200 z-50"
    >
      {isDark ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  );
};

const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-surface dark:bg-surface-dark">
    <div className="w-5 h-5 border-2 border-ink dark:border-ink-dark border-t-transparent rounded-full animate-spin-slow" />
  </div>
);

const AppContent = () => {
  return (
    <div className="bg-surface dark:bg-surface-dark">
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

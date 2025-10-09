// src/App.js

import React, { Suspense, lazy } from 'react';
import { ThemeProvider, useTheme } from './ThemeContext';
import LandingSection from './LandingSection';
import Footer from './Footer';
import Contact from './Contact';
import { Sun, Moon } from 'lucide-react'; 

const GeneratorSection = lazy(() => import('./GeneratorSection'));

// Component for the Theme Toggle Button
const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? 'Light' : 'Dark'} mode`}
      className="fixed top-6 right-6 p-3 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white shadow-lg z-50 transition-all duration-300 hover:scale-110 active:scale-95"
    >
      {isDark ? (
        <Sun size={24} className="text-yellow-400" /> 
      ) : (
        <Moon size={24} className="text-indigo-600" /> 
      )}
    </button>
  );
};

// Loading Fallback Component
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-800 transition-colors duration-500">
    <div className="text-center">
      <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600 mx-auto mb-4"></div>
      <p className="text-gray-600 dark:text-gray-300 text-lg">Loading...</p>
    </div>
  </div>
);

// Main App Component
const AppContent = () => {
  return (
    <div className="bg-white dark:bg-gray-900 transition-colors duration-500">
      <ThemeToggle />
      <main className="min-h-screen">
        <LandingSection />
        <Suspense fallback={<LoadingFallback />}>
          <GeneratorSection />
        </Suspense>
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

// Application Wrapper with Theme Provider
const App = () => (
  <ThemeProvider>
    <AppContent />
  </ThemeProvider>
);

export default App;
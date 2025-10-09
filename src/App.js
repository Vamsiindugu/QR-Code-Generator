// src/App.js

import React, { Suspense, lazy } from 'react';
import { ThemeProvider, useTheme } from './ThemeContext';
import LandingSection from './LandingSection';
import Footer from './Footer'; // Import the new Footer component
import { Sun, Moon } from 'lucide-react'; 

const GeneratorSection = lazy(() => import('./GeneratorSection'));

// Component for the Theme Toggle Button
const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? 'Light' : 'Dark'} mode`}
      className="fixed top-6 right-6 p-3 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white shadow-lg z-50 transition-colors duration-300 hover:scale-110 active:scale-95"
    >
      {isDark ? (
        <Sun size={24} className="text-yellow-400" /> 
      ) : (
        <Moon size={24} className="text-indigo-600" /> 
      )}
    </button>
  );
};

// Main App Component
const AppContent = () => {
  return (
    <>
      <ThemeToggle />
      <main className="min-h-screen">
        <LandingSection />
        <Suspense fallback={<div>Loading...</div>}>
          <GeneratorSection />
        </Suspense>
      </main>
      <Footer />
    </>
  );
};

// Application Wrapper with Theme Provider
const App = () => (
  <ThemeProvider>
    <AppContent />
  </ThemeProvider>
);

export default App;

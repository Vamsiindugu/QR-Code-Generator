# QR-Code Generator - [![QR-Code Generator Website](https://img.shields.io/badge/QR_Code_Generator-%23000000.svg?style=for-the-badge&logo=firefox&logoColor=#FF7139)](https://wishful-qr-generator.vercel.app/)

![React Version](https://img.shields.io/badge/React-18.3.1-blue.svg)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4.18-06B6D4.svg)
![Framer Motion](https://img.shields.io/badge/Framer%20Motion-11.18.2-FF0055.svg)
![License](https://img.shields.io/badge/License-MIT-green.svg)

A modern, lightning-fast **QR Code Generator** built with React that transforms any text, URL, or data into beautiful, scannable QR codes instantly. This project showcases **best-in-class UI/UX patterns**, **performance optimization techniques**, and **accessible design** principles ✨.

---

## 📚 Table of Contents

- [📌 Project Overview](#-project-overview)
- [✨ Key Features](#-key-features)
- [🏗️ Architecture & Implementation](#️-architecture--implementation)
  - [🎨 Theme System](#-theme-system)
  - [⚡ Performance Optimizations](#-performance-optimizations)
  - [🧩 Component Architecture](#-component-architecture)
- [🛠️ Tech Stack](#️-tech-stack)
- [🚀 Getting Started](#-getting-started)
  - [📋 Prerequisites](#-prerequisites)
  - [🔗 Installation](#-installation)
  - [▶️ Running the Application](#️-running-the-application)
- [📂 Project Structure](#-project-structure)
- [🎯 Usage Guide](#-usage-guide)
- [🤝 Contributing](#-contributing)
- [📧 Contact](#-contact)

---

## 📌 Project Overview

This single-page application (SPA) empowers users to generate high-quality QR codes for any purpose from sharing Wi-Fi credentials to distributing links, contact info, or secret messages all without tracking, ads, or paywalls.

🔍 **Objective**: Deliver a seamless, privacy-focused QR code generation experience with instant visual feedback and zero configuration.

### 💎 Highlights

- 🌓 **Intelligent Dark Mode** with system preference detection and localStorage persistence
- ⚡ **Debounced Input** prevents unnecessary re-renders during typing (300ms delay)
- 🎨 **Smooth Animations** powered by Framer Motion for delightful interactions
- 📱 **Native Share Integration** via Web Share API for mobile-optimized sharing
- 🖼️ **High-Quality Downloads** with custom padding, rounded corners, and 512×512 JPG export
- 🔒 **Security-First** input sanitization to prevent XSS attacks
- ♿ **Accessible** with ARIA labels and keyboard navigation support

---

## ✨ Key Features

| Feature | Description |
|---------|-------------|
| **Instant Generation** | Real-time QR code updates as you type (debounced for performance) |
| **Dark/Light Themes** | Automatically adapts to system preferences with manual toggle |
| **Download as JPG** | Export 512×512 high-quality JPG with rounded corners and padding |
| **Web Share API** | Share QR codes natively on mobile devices |
| **Input Sanitization** | Strips dangerous protocols (`javascript:`, `data:`) and HTML tags |
| **Lazy Loading** | Generator section loads on-demand for faster initial page load |
| **Responsive Design** | Optimized for mobile, tablet, and desktop viewports |
| **1200 Char Limit** | Character counter with enforced maximum length |

---

## 🏗️ Architecture & Implementation

A production-ready React application designed with modularity, performance, and user experience at its core.

### 🎨 Theme System

**Implementation**: `ThemeContext.js` + Tailwind CSS `darkMode: 'class'`

```javascript
// Priority order for theme selection:
1. localStorage (persisted user preference)
2. System preference (window.matchMedia)
3. Default to 'light'

```

- ✅ Seamless transitions with `transition-colors duration-300`

- ✅ Persists across sessions via `localStorage`

- ✅ Respects system-level dark mode settings

### ⚡ Performance Optimizations

| Technique | Implementation | Impact |
|-----------|----------------|--------|
| **Lazy Loading** | `React.lazy()` + `Suspense` for `GeneratorSection` | Reduces initial bundle size |
| **Debounced Input** | Custom `useDebounce` hook (300ms) | Prevents excessive QR re-renders |
| **Memoization** | `useMemo` for QR style object | Avoids unnecessary recalculations |
| **Code Splitting** | Dynamic imports for heavy components | Faster Time-to-Interactive (TTI) |

```javascript
// Example: Debounce prevents QR regeneration on every keystroke
const debouncedInputText = useDebounce(inputText, 300);
```

### 🧩 Component Architecture

**Separation of Concerns**: Each component has a single, well-defined responsibility.

```bash

App.js
├── ThemeProvider (Context)
├── ThemeToggle (UI Component)
├── LandingSection (Hero Section)
├── GeneratorSection (Lazy Loaded)
│   ├── QRCode (react-qr-code)
│   ├── Button (Download)
└── Footer (Contact & Links)
```

#### 🎯 Component Highlights

- **`ThemeToggle`**: Fixed-position button with smooth icon transitions
- **`LandingSection`**: Framer Motion staggered animations for hero content
- **`GeneratorSection`**: Two-column layout (input + output) with real-time QR preview
- **`Button`**: Animated sliding text effect on hover

---

## 🛠️ Tech Stack

### Core Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 18.3.1 | UI framework with Hooks and Context API |
| **Tailwind CSS** | 3.4.18 | Utility-first CSS with dark mode support |
| **Framer Motion** | 11.18.2 | Declarative animations and transitions |
| **react-qr-code** | 2.0.18 | SVG-based QR code generation |

### Utilities & Icons

- **Lucide React** (0.545.0): Modern, tree-shakable icon library
- **PostCSS** + **Autoprefixer**: Cross-browser CSS compatibility

### Development Tools

- **React Scripts** (5.0.1): Zero-config build tooling
- **ESLint**: React Hooks linting with exhaustive-deps rule
- **Source Map Explorer**: Bundle size analysis

---

## 🚀 Getting Started

Clone and run this project locally in under 2 minutes.

### 📋 Prerequisites

- **Node.js** 14.0+ (Recommended: 18.x LTS)
- **npm** 7+ or **yarn** 1.3+

### 🔗 Installation

```bash
# 1. Clone the repository
git clone https://github.com/vamsiindugu/qr-code-generator.git
cd qr-code-generator

# 2. Install dependencies
npm install

# Or with yarn
yarn install
```

### ▶️ Running the Application

```bash
# Start the development server
npm start

# The app will open at http://localhost:3000
```

**Available Scripts**:

| Command | Description |
|---------|-------------|
| `npm start` | Runs the app in development mode with hot reload |
| `npm test` | Launches the test runner in interactive watch mode |
| `npm run build` | Creates an optimized production build in `build/` |
| `npm run analyze` | Analyzes bundle size with source-map-explorer |

---

## 📂 Project Structure

```bash
vamsiindugu-qr-code-generator/
├── public/
│   ├── index.html          # HTML template
│   ├── manifest.json       # PWA manifest
│   └── robots.txt          # SEO crawler instructions
├── src/
│   ├── App.js              # Main app component with routing logic
│   ├── ThemeContext.js     # Theme state management (Context API)
│   ├── LandingSection.js   # Hero section with CTA
│   ├── GeneratorSection.js # QR generation + download/share logic
│   ├── Button.js           # Reusable animated button component
│   ├── Footer.js           # Footer with contact links
│   ├── useDebounce.js      # Custom debounce hook
│   ├── utils.js            # Input sanitization helpers
│   ├── index.css           # Tailwind directives + global styles
│   └── index.js            # React root render
├── tailwind.config.js      # Tailwind configuration (dark mode enabled)
├── postcss.config.js       # PostCSS configuration
└── package.json            # Dependencies and scripts
```

---

## 🎯 Usage Guide

### 1️⃣ Generate a QR Code

1. Scroll to the **"QR Code Generator"** section (or click the CTA button)
2. Enter your content in the textarea:
   - URLs: `https://example.com`
   - Wi-Fi: `WIFI:S:NetworkName;T:WPA;P:Password;;`
   - Plain text: Any message up to 1200 characters
3. Watch the QR code update in real-time

### 2️⃣ Download the QR Code

- Click the **"Download"** button to export a 512×512 JPG image
- File includes white background, padding, and rounded corners for professional presentation

### 3️⃣ Share via Mobile

- Click **"Share QR"** to use native sharing (WhatsApp, Messages, Email, etc.)
- *Note: Web Share API requires HTTPS or localhost*

### 4️⃣ Toggle Dark Mode

- Click the **Sun/Moon icon** (top-right) to switch themes
- Theme preference persists across sessions

---

## 🤝 Contributing

Contributions are **welcome** and **appreciated**! 🙌

### How to Contribute

1.**Fork the repository**

2.**Create a feature branch**

```bash
    git checkout -b feature/amazing-new-feature
```

3.**Commit your changes**

```bash
    git commit -m 'Add amazing new feature'
```

4.**Push to your branch**

```bash
    git push origin feature/amazing-new-feature
```

5.**Open a Pull Request**

## Contribution Ideas

- 🎨 Add **color customization** for QR codes
- 📊 Implement **SVG/PNG export options**
- 🌍 Add **internationalization (i18n) support**
- ♿ Enhance **accessibility** with screen reader testing
- 🧪 Write **unit tests** for utility functions

---

## 📧 Contact

### Vamsi Indugu

- 💌 Email: [vamsiindugu@gmail.com](mailto:vamsiindugu@gmail.com)
- 👩🏻‍💻 Portfolio: [vamsiindugu.vercel.app](https://vamsiindugu.vercel.app/)
- 🐱 GitHub: [@Vamsiindugu](https://github.com/Vamsiindugu/)
- 💼 LinkedIn: [vamsi-indugu](https://www.linkedin.com/in/vamsi-indugu/)

---

© 2025 Vamsi Indugu. All rights reserved.
Made with ❤️ and React

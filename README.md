# QR Code Generator - [![QR-Code Generator Website](https://img.shields.io/badge/QR_Code_Generator-%23000000.svg?style=for-the-badge&logo=firefox&logoColor=#FF7139)](https://wishful-qr-generator.vercel.app/)

![React Version](https://img.shields.io/badge/React-18.3.1-blue.svg)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4.18-06B6D4.svg)
![License](https://img.shields.io/badge/License-MIT-green.svg)

A modern, lightning-fast **QR Code Generator** built with React that transforms any text, URL, or data into beautiful, scannable QR codes instantly. Features **configurable error correction**, **real-time capacity monitoring**, and **multiple export formats**.

---

## Key Features

| Feature | Description |
|---------|-------------|
| **Instant Generation** | Real-time QR code updates as you type (debounced for performance) |
| **Error Correction Selector** | Choose L/M/Q/H to balance capacity vs resilience |
| **Capacity Indicator** | Live byte counter showing how close you are to the QR limit |
| **Dark/Light Themes** | Automatically adapts to system preferences with manual toggle |
| **Download as PNG** | Export 1024x1024 high-quality PNG with padding |
| **Download as SVG** | Vector export for print-quality QR codes at any scale |
| **Copy to Clipboard** | Copy QR code as SVG or PNG image directly |
| **Web Share API** | Share QR codes natively on mobile devices |
| **Input Sanitization** | Strips dangerous protocols (javascript:, data:, vbscript:); SVG output sanitized against XSS |
| **Lazy Loading** | Generator section loads on-demand for faster initial page load |
| **Responsive Design** | Optimized for mobile, tablet, and desktop viewports |
| **Web Worker** | QR generation runs off the main thread for smooth UI |

---

## Architecture

### QR Generation Pipeline

```
Input Text → Sanitize → Debounce (300ms) → Web Worker → SVG Output
                                                         ↓
                                              Capacity Check (byte-aware)
                                                         ↓
                                              Error Correction Level (L/M/Q/H)
```

### Component Architecture

```
App.js
├── ThemeProvider (Context)
├── ThemeToggle
├── LandingSection
├── GeneratorSection (Lazy Loaded)
│   ├── QrDisplay (XSS-sanitized SVG rendering)
│   ├── Error Correction Selector
│   ├── Capacity Indicator
│   └── Download/Copy/Share Buttons
├── Contact
└── Footer
```

### Web Worker (`qr.worker.js`)

QR generation runs in a dedicated Web Worker to keep the UI responsive. The worker:
- Validates byte length against QR capacity for the selected error correction level
- Returns capacity info (bytes used, max capacity, percentage) alongside the SVG
- Reports clear error messages when text exceeds the QR limit

---

## QR Code Capacity Reference

| Error Correction | Max Bytes | Use Case |
|-----------------|-----------|----------|
| L (7%) | 2,953 | Maximum text capacity |
| M (15%) | 2,331 | Balanced (default) |
| Q (25%) | 1,663 | Good damage resilience |
| H (30%) | 1,273 | Maximum resilience |

Note: These are byte limits. Multi-byte Unicode characters (emojis, CJK) consume more bytes per character.

---

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 18.3.1 | UI framework with Hooks and Context API |
| **qrcode** | 1.5.4 | Server-side QR code generation (runs in Web Worker) |
| **Tailwind CSS** | 3.4.18 | Utility-first CSS with dark mode support |

---

## Getting Started

```bash
git clone https://github.com/vamsiindugu/qr-code-generator.git
cd qr-code-generator
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000).

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Development server with hot reload |
| `npm test` | Test runner |
| `npm run build` | Production build |
| `npm run analyze` | Bundle size analysis |

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-new-feature`
3. Commit: `git commit -m 'Add amazing new feature'`
4. Push: `git push origin feature/amazing-new-feature`
5. Open a Pull Request

---

## Contact

- Email: [vamsiindugu@gmail.com](mailto:vamsiindugu@gmail.com)
- Portfolio: [vamsiindugu.vercel.app](https://vamsiindugu.vercel.app/)
- GitHub: [@Vamsiindugu](https://github.com/Vamsiindugu/)
- LinkedIn: [vamsi-indugu](https://www.linkedin.com/in/vamsi-indugu/)

---

&copy; 2026 Vamsi Indugu. All rights reserved.

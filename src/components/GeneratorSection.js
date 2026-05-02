import React, { useRef, useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useQrCode } from '../hooks/useQrCode';
import { useReveal } from '../hooks/useReveal';
import { handleDownload, handleShare, handleCopySvg } from '../utils/qrUtils';
import ErrorBoundary from './ErrorBoundary';
import QrDisplay from './QrDisplay';
import Button from './Button';

const EC_OPTIONS = [
  { value: 'L', label: 'L', desc: 'Low (7%)' },
  { value: 'M', label: 'M', desc: 'Medium (15%)' },
  { value: 'Q', label: 'Q', desc: 'Quartile (25%)' },
  { value: 'H', label: 'H', desc: 'High (30%)' },
];

const CapacityBar = ({ capacityInfo, barKey }) => {
  if (!capacityInfo) return null;

  const percent = Math.min(capacityInfo.percentUsed, 100);
  const isOver = capacityInfo.isOverCapacity;
  const isNear = percent > 80 && !isOver;

  let barGradient = 'bg-gradient-to-r from-accent to-[#5e9af5]';
  if (isOver) barGradient = 'bg-gradient-to-r from-red-500 to-red-400';
  else if (isNear) barGradient = 'bg-gradient-to-r from-amber-500 to-orange-400';

  return (
    <div className="w-full h-[3px] bg-[rgba(0,0,0,0.06)] dark:bg-[rgba(255,255,255,0.06)] rounded-full overflow-hidden">
      <div
        key={barKey}
        className={`h-full ${barGradient} rounded-full animate-bar-grow transition-all duration-500 ease-out`}
        style={{ width: `${percent}%` }}
      />
    </div>
  );
};

const GeneratorSection = () => {
  const { isDark } = useTheme();
  const qrRef = useRef(null);
  const revealRef = useReveal(0.12);
  const [qrKey, setQrKey] = useState(0);
  const [barKey, setBarKey] = useState(0);

  const {
    inputText,
    setInputText,
    qrSvg,
    isLoading,
    errorCorrectionLevel,
    setErrorCorrectionLevel,
    capacityInfo,
    errorMessage,
  } = useQrCode('https://generator.app', isDark);

  const isOverCapacity = capacityInfo?.isOverCapacity;
  const autoDowngraded = capacityInfo?.autoDowngraded;

  useEffect(() => {
    if (capacityInfo) {
      setBarKey((k) => k + 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [capacityInfo?.percentUsed]);

  useEffect(() => {
    if (qrSvg) {
      setQrKey((k) => k + 1);
    }
  }, [qrSvg]);

  return (
    <section
      id="generator"
      ref={revealRef}
      className="reveal min-h-screen px-6 py-20 md:py-32"
    >
      <div className="max-w-5xl mx-auto">
        <h2 className="text-xs font-medium tracking-[0.25em] uppercase text-accent mb-2 border-l-2 border-accent pl-3">
          Generator
        </h2>
        <p className="font-display text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-b dark:from-ink-dark dark:to-ink-dark-secondary from-ink to-ink-secondary bg-clip-text text-transparent mb-12">
          Create your code
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <div className="space-y-6">
            {/* Textarea glass card */}
            <div
              className={`glass-input-card rounded-xl p-5 backdrop-blur-sm transition-all duration-200 ${
                isOverCapacity
                  ? '[box-shadow:inset_0_0_0_1px_rgba(239,68,68,0.4),0_0_20px_rgba(239,68,68,0.1)]'
                  : ''
              }`}
            >
              <label
                htmlFor="content-input"
                className="block text-sm font-medium text-ink-secondary dark:text-ink-dark-secondary mb-2"
              >
                Content
              </label>
              <textarea
                id="content-input"
                rows={6}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Enter a URL, text, or any data..."
                aria-describedby="capacity-info"
                className="w-full px-1 py-2 font-mono text-sm bg-transparent border-none resize-none focus:outline-none text-ink dark:text-ink-dark placeholder:text-ink-tertiary dark:placeholder:text-ink-dark-tertiary"
              />
              <div className="mt-2 space-y-1.5">
                <CapacityBar capacityInfo={capacityInfo} barKey={barKey} />
                <div className="flex items-center justify-between text-xs">
                  <span
                    id="capacity-info"
                    className={
                      isOverCapacity
                        ? 'text-red-400 font-medium'
                        : 'text-ink-tertiary dark:text-ink-dark-tertiary'
                    }
                  >
                    {capacityInfo
                      ? `${capacityInfo.currentBytes.toLocaleString()} / ${capacityInfo.maxCapacity.toLocaleString()} bytes`
                      : '0 / 2,331 bytes'}
                  </span>
                  {autoDowngraded && (
                    <span className="text-amber-400 font-medium">
                      Auto-lowered to {capacityInfo.level} error correction
                    </span>
                  )}
                  {isOverCapacity && !autoDowngraded && (
                    <span className="text-red-400">Over capacity</span>
                  )}
                </div>
              </div>
            </div>

            {/* EC segmented control */}
            <div>
              <label
                htmlFor="ec-level"
                className="block text-sm font-medium text-ink-secondary dark:text-ink-dark-secondary mb-2"
              >
                Error correction
              </label>
              <div className="flex gap-1 p-1 rounded-lg bg-[rgba(0,0,0,0.03)] dark:bg-[rgba(255,255,255,0.04)] border border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.07)]">
                {EC_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setErrorCorrectionLevel(opt.value)}
                    className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all duration-200 ${
                      errorCorrectionLevel === opt.value
                        ? 'bg-[rgba(124,106,247,0.20)] text-accent-bright border border-[rgba(124,106,247,0.30)] shadow-[0_0_12px_rgba(124,106,247,0.15)]'
                        : 'text-ink-secondary dark:text-ink-dark-secondary hover:text-ink dark:hover:text-ink-dark hover:bg-[rgba(0,0,0,0.04)] dark:hover:bg-[rgba(255,255,255,0.06)]'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-ink-tertiary dark:text-ink-dark-tertiary mt-1.5">
                Higher correction means the QR still scans when damaged, but holds less data.
              </p>
            </div>

            {errorMessage && (
              <div
                role="alert"
                className="p-3.5 bg-red-500/8 border border-red-500/20 rounded-lg text-red-400 text-sm"
              >
                <span className="mr-1.5" aria-hidden="true">&#9888;</span>
                {errorMessage}
              </div>
            )}
          </div>

          {/* QR Preview Card */}
          <div className="flex flex-col items-center justify-start">
            <div className="relative w-full max-w-sm mx-auto">
              {/* Ambient glow behind card */}
              <div
                aria-hidden="true"
                className="absolute inset-0 rounded-2xl -z-10 blur-2xl opacity-30 transition-opacity duration-700"
                style={{ background: 'radial-gradient(circle, rgba(124,106,247,0.4) 0%, transparent 70%)' }}
              />
              {/* The card */}
              <div
                key={qrKey}
                className={`relative aspect-square flex items-center justify-center glass-card rounded-2xl p-8 backdrop-blur-md hover:shadow-card-hover hover:border-[rgba(0,0,0,0.14)] dark:hover:border-[rgba(255,255,255,0.14)] transition-all duration-500 ease-out ${qrSvg ? 'animate-qr-glow' : ''}`}
              >
                {/* Corner accent */}
                <div
                  aria-hidden="true"
                  className="absolute top-0 right-0 w-16 h-16 rounded-tr-2xl rounded-bl-2xl overflow-hidden opacity-20"
                  style={{ background: 'linear-gradient(135deg, rgba(124,106,247,0.6) 0%, transparent 60%)' }}
                />
                {/* Card shine */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0) 60%)' }}
                />
                <ErrorBoundary
                  fallback={
                    <p className="text-sm text-ink-tertiary dark:text-ink-dark-tertiary">
                      Could not generate QR code.
                    </p>
                  }
                >
                  <QrDisplay qrSvg={qrSvg} isLoading={isLoading} qrRef={qrRef} />
                </ErrorBoundary>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-2 mt-4">
              <Button onClick={() => handleDownload(qrRef, 'png')} className="flex-1">
                PNG
              </Button>
              <Button onClick={() => handleDownload(qrRef, 'svg')} className="flex-1">
                SVG
              </Button>
              <Button onClick={() => handleCopySvg(qrRef)} feedback className="flex-1">
                Copy
              </Button>
              <Button onClick={() => handleShare(qrRef)} variant="primary" feedback className="flex-1">
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GeneratorSection;

import React, { useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useQrCode } from '../hooks/useQrCode';
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

const CapacityBar = ({ capacityInfo }) => {
  if (!capacityInfo) return null;

  const percent = Math.min(capacityInfo.percentUsed, 100);
  const isOver = capacityInfo.isOverCapacity;
  const isNear = percent > 80 && !isOver;

  let barColor = 'bg-ink/20 dark:bg-ink-dark/20';
  if (isOver) barColor = 'bg-accent';
  else if (isNear) barColor = 'bg-amber-500';

  return (
    <div className="w-full h-1 bg-stroke dark:bg-stroke-dark rounded-full overflow-hidden">
      <div
        className={`h-full ${barColor} transition-all duration-500 ease-out rounded-full`}
        style={{ width: `${percent}%` }}
      />
    </div>
  );
};

const GeneratorSection = () => {
  const { isDark } = useTheme();
  const qrRef = useRef(null);
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

  return (
    <section
      id="generator"
      className="min-h-screen bg-surface dark:bg-surface-dark px-6 py-20 md:py-32"
    >
      <div className="max-w-5xl mx-auto">
        <h2 className="text-xs font-medium tracking-widest uppercase text-accent mb-2">
          Generator
        </h2>
        <p className="text-3xl md:text-4xl font-bold tracking-tight text-ink dark:text-ink-dark mb-12">
          Create your code
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <div className="space-y-6">
            <div>
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
                className={`w-full px-4 py-3 font-mono text-sm bg-surface-raised dark:bg-surface-dark-raised border rounded-md resize-none focus:ring-1 transition-colors duration-200 text-ink dark:text-ink-dark placeholder:text-ink-tertiary dark:placeholder:text-ink-dark-tertiary ${
                  isOverCapacity
                    ? 'border-accent focus:ring-accent'
                    : 'border-stroke dark:border-stroke-dark focus:ring-ink dark:focus:ring-ink-dark'
                }`}
              />
              <div className="mt-2 space-y-1.5">
                <CapacityBar capacityInfo={capacityInfo} />
                <div className="flex items-center justify-between text-xs">
                  <span
                    className={
                      isOverCapacity
                        ? 'text-accent font-medium'
                        : 'text-ink-tertiary dark:text-ink-dark-tertiary'
                    }
                  >
                    {capacityInfo
                      ? `${capacityInfo.currentBytes.toLocaleString()} / ${capacityInfo.maxCapacity.toLocaleString()} bytes`
                      : '0 / 2,331 bytes'}
                  </span>
                  {autoDowngraded && (
                    <span className="text-amber-600 dark:text-amber-400 font-medium">
                      Auto-lowered to {capacityInfo.level} error correction
                    </span>
                  )}
                  {isOverCapacity && !autoDowngraded && (
                    <span className="text-accent">Over capacity</span>
                  )}
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor="ec-level"
                className="block text-sm font-medium text-ink-secondary dark:text-ink-dark-secondary mb-2"
              >
                Error correction
              </label>
              <div className="flex gap-1.5">
                {EC_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setErrorCorrectionLevel(opt.value)}
                    className={`flex-1 px-3 py-2 text-xs font-medium rounded-md transition-all duration-200 ${
                      errorCorrectionLevel === opt.value
                        ? 'bg-ink text-white dark:bg-ink-dark dark:text-surface-dark'
                        : 'bg-surface-raised dark:bg-surface-dark-raised text-ink-secondary dark:text-ink-dark-secondary border border-stroke dark:border-stroke-dark hover:border-ink dark:hover:border-ink-dark'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
              <p className="text-xs text-ink-tertiary dark:text-ink-dark-tertiary mt-1.5">
                Higher correction means the QR still scans when damaged, but holds less data.
              </p>
            </div>

            {errorMessage && (
              <div
                role="alert"
                className="p-3 bg-accent/5 border border-accent/20 rounded-md text-accent text-sm"
              >
                {errorMessage}
              </div>
            )}
          </div>

          <div className="flex flex-col items-center justify-start">
            <div className="w-full max-w-sm">
              <div className="aspect-square flex items-center justify-center bg-surface-raised dark:bg-surface-dark-raised border border-stroke dark:border-stroke-dark rounded-md p-8">
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

              <div className="flex gap-2 mt-4">
                <Button
                  onClick={() => handleDownload(qrRef, 'png')}
                  className="flex-1"
                >
                  PNG
                </Button>
                <Button
                  onClick={() => handleDownload(qrRef, 'svg')}
                  className="flex-1"
                >
                  SVG
                </Button>
                <Button
                  onClick={() => handleCopySvg(qrRef)}
                  feedback
                  className="flex-1"
                >
                  Copy
                </Button>
                <Button
                  onClick={() => handleShare(qrRef)}
                  variant="primary"
                  feedback
                  className="flex-1"
                >
                  Share
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GeneratorSection;

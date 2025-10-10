import React from 'react';

const QrDisplay = ({ qrSvg, isLoading, qrRef }) => {
  if (isLoading) {
    return (
      <div className="w-[256px] h-[256px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600"></div>
      </div>
    );
  }

  if (!qrSvg) {
    return <div className="w-[256px] h-[256px] flex items-center justify-center text-center">Error generating QR code.<br/>Please try a different input.</div>;
  }

  return (
    <div
      ref={qrRef}
      className="p-4 bg-white rounded-xl shadow-inner"
      dangerouslySetInnerHTML={{ __html: qrSvg }}
    />
  );
};

export default QrDisplay;

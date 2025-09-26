import React, { useRef, useEffect, useState } from 'react';
import useCenterZoomCanvas from './useCenterZoomCanvas';

const getCanvasSize = () => {
  if (typeof window !== 'undefined') {
    // Simple mobile detection
    const isMobile =
      typeof window !== 'undefined' &&
      window.matchMedia('(max-width: 700px)').matches;

    return isMobile ? 300 : 500;
  }
  return 500;
};

const CANVAS_WIDTH = getCanvasSize();
const CANVAS_HEIGHT = getCanvasSize();

const ImageZoomDemo: React.FC = () => {
  const [filename, setFilename] = useState('');
  const [fileKey, setFileKey] = useState(0);

  const canvasRef = useRef<HTMLCanvasElement>(
    null,
  ) as React.RefObject<HTMLCanvasElement>;
  const {
    handleFile,
    handleWheel,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    handlePointerLeave,
    reset,
  } = useCenterZoomCanvas(canvasRef, CANVAS_WIDTH, CANVAS_HEIGHT);

  // Attach non-passive wheel listener to canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const wheelHandler = (e: WheelEvent) => {
      e.preventDefault();
      handleWheel(e);
    };
    canvas.addEventListener('wheel', wheelHandler, { passive: false });
    return () => {
      canvas.removeEventListener('wheel', wheelHandler);
    };
  }, [handleWheel]);

  return (
    <div
      style={{
        maxWidth: CANVAS_WIDTH,
        margin: '2rem auto',
        textAlign: 'center',
      }}
    >
      <h2>Image Zoom Demo</h2>
      <label
        htmlFor="file-input"
        style={{
          cursor: 'pointer',
          padding: '4px 8px',
          borderRadius: '4px',
          background: '#414141ff',
          fontSize: '0.9rem',
          color: '#f6f6f6',
          marginRight: '0rem',
          boxShadow: '0 1px 2px rgba(0,0,0,0.02)',
          display: 'inline-block',
          marginBottom: '1rem',
        }}
      >
        選擇檔案
      </label>
      <input
        key={fileKey}
        type="file"
        accept="image/*"
        onChange={(e) => {
          handleFile(e);
          setFileKey((k) => k + 1);
          setFilename(e.target.files?.[0]?.name || '');
        }}
        id="file-input"
        style={{ display: 'none' }}
      />
      <span
        style={{
          fontSize: '0.9rem',
          color: '#ffffffff',
          borderRadius: '4px',
          padding: '4px 8px',
          minWidth: '120px',
          textAlign: 'left',
          display: 'inline-block',
          marginBottom: '1rem',
        }}
      >
        {filename || '未選擇任何檔案'}
      </span>
      <div style={{ marginBottom: '0.5rem', color: '#888' }}>
        Use mouse wheel to zoom (cursor-centered), drag to pan
      </div>
      <div style={{ overscrollBehavior: 'contain', display: 'inline-block' }}>
        <canvas
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          style={{
            border: '1px solid #ccc',
            background: '#232323',
            cursor: 'grab',
            touchAction: 'none',
          }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerLeave}
        />
      </div>
      <button onClick={reset} style={{ marginTop: '1rem' }}>
        Reset View
      </button>
    </div>
  );
};

export default ImageZoomDemo;

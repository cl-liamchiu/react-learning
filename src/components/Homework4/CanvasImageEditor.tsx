import React, { useRef, useState } from 'react';

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
const CANVAS_SIZE = getCanvasSize();

const CanvasImageEditor: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [fileKey, setFileKey] = useState(0); // keep as state for input reset
  const rotationRef = useRef(0);
  const blurRef = useRef(0);
  const [filename, setFilename] = useState('');
  const [imageLoaded, setImageLoaded] = useState(false);

  // Draw image with current rotation and blur, scaling to fit canvas
  const drawImage = (img: HTMLImageElement, rot: number, blurVal: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // HiDPI support
    const dpr = window.devicePixelRatio || 1;
    canvas.width = CANVAS_SIZE * dpr;
    canvas.height = CANVAS_SIZE * dpr;
    canvas.style.width = `${CANVAS_SIZE}px`;
    canvas.style.height = `${CANVAS_SIZE}px`;
    ctx.setTransform(1, 0, 0, 1, 0, 0); // reset transform
    ctx.scale(dpr, dpr);

    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    ctx.save();
    ctx.translate(CANVAS_SIZE / 2, CANVAS_SIZE / 2);
    ctx.rotate((rot * Math.PI) / 180);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    // Only apply user-selected blur
    ctx.filter = `blur(${blurVal}px)`;

    // Compute scale and draw size
    const scale = Math.min(
      CANVAS_SIZE / img.width,
      CANVAS_SIZE / img.height,
      1,
    );
    const { drawW, drawH } = {
      drawW: img.width * scale,
      drawH: img.height * scale,
    };
    ctx.drawImage(img, -drawW / 2, -drawH / 2, drawW, drawH);
    ctx.restore();
  };

  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const img = new window.Image();
      img.onload = () => {
        imageRef.current = img;
        rotationRef.current = 0;
        blurRef.current = 0;
        drawImage(img, 0, 0);
        setImageLoaded(true);
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
    setFileKey((k) => k + 1); // reset input for same file
    setFilename(file.name);
  };

  // Redraw when rotation or blur changes
  React.useEffect(() => {
    // No-op: no UI state to watch
  }, []);

  // Rotate image
  const handleRotate = () => {
    if (!imageRef.current) return;
    rotationRef.current = (rotationRef.current + 90) % 360;
    drawImage(imageRef.current, rotationRef.current, blurRef.current);
  };

  // Blur image
  const handleBlur = () => {
    if (!imageRef.current) return;
    blurRef.current = Math.min(blurRef.current + 2, 20);
    drawImage(imageRef.current, rotationRef.current, blurRef.current);
  };

  // Download image
  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas || !imageRef.current) return;
    drawImage(imageRef.current, rotationRef.current, blurRef.current); // ensure latest
    const link = document.createElement('a');
    link.download = 'edited-image.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div
      style={{
        maxWidth: CANVAS_SIZE,
        margin: '2rem auto',
        textAlign: 'center',
      }}
    >
      <h2>Canvas Image Editor</h2>
      <div
        style={{
          marginBottom: '1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
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
          }}
        >
          選擇檔案
        </label>
        <input
          key={fileKey}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
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
          }}
        >
          {filename || '未選擇任何檔案'}
        </span>
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <button
          onClick={handleRotate}
          disabled={!imageLoaded}
          style={{ marginRight: '1rem' }}
        >
          Rotate 90°
        </button>
        <button
          onClick={handleBlur}
          disabled={!imageLoaded}
          style={{ marginRight: '1rem' }}
        >
          Blur
        </button>
        <button onClick={handleDownload} disabled={!imageLoaded}>
          Download
        </button>
      </div>
      <canvas
        ref={canvasRef}
        width={CANVAS_SIZE}
        height={CANVAS_SIZE}
        style={{ border: '1px solid #ccc', background: '#232323' }}
      />
    </div>
  );
};

export default CanvasImageEditor;

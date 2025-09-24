import { useRef, useEffect } from 'react';

function drawImageFitCanvas(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  canvas: HTMLCanvasElement,
) {
  const imgRatio = img.width / img.height;
  const canvasRatio = canvas.width / canvas.height;

  let drawWidth, drawHeight;
  if (imgRatio > canvasRatio) {
    drawWidth = canvas.width;
    drawHeight = canvas.width / imgRatio;
  } else {
    drawHeight = canvas.height;
    drawWidth = canvas.height * imgRatio;
  }

  const dx = (canvas.width - drawWidth) / 2;
  const dy = (canvas.height - drawHeight) / 2;
  ctx.drawImage(img, dx, dy, drawWidth, drawHeight);
}

type ImageManipulationFn = (
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
) => void;

function useImageCanvas(manipulate?: ImageManipulationFn) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const img = new Image();
    img.src = '/react-learning/cat.jpg';

    img.onload = () => {
      drawImageFitCanvas(ctx, img, canvas);
      if (manipulate) {
        manipulate(ctx, canvas);
      }
    };
  }, [manipulate]);

  return canvasRef;
}

// Manipulation functions
const grayscale: ImageManipulationFn = (ctx, canvas) => {
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const gray = 0.3 * r + 0.59 * g + 0.11 * b;
    data[i] = data[i + 1] = data[i + 2] = gray;
  }
  ctx.putImageData(imageData, 0, 0);
};

const invert: ImageManipulationFn = (ctx, canvas) => {
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    data[i] = 255 - data[i];
    data[i + 1] = 255 - data[i + 1];
    data[i + 2] = 255 - data[i + 2];
  }
  ctx.putImageData(imageData, 0, 0);
};

const brighten =
  (amount: number): ImageManipulationFn =>
  (ctx, canvas) => {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      data[i] = Math.min(255, data[i] + amount);
      data[i + 1] = Math.min(255, data[i + 1] + amount);
      data[i + 2] = Math.min(255, data[i + 2] + amount);
    }
    ctx.putImageData(imageData, 0, 0);
  };

const adjustAlpha =
  (alpha: number): ImageManipulationFn =>
  (ctx, canvas) => {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      data[i + 3] = data[i + 3] * alpha;
    }
    ctx.putImageData(imageData, 0, 0);
  };

// Components
export const OriginExample = () => {
  const canvasRef = useImageCanvas();
  return (
    <canvas
      ref={canvasRef}
      width={1000}
      height={1000}
      style={{ width: 250, height: 250 }}
    />
  );
};

export const GrayScaleExample = () => {
  const canvasRef = useImageCanvas(grayscale);
  return (
    <canvas
      ref={canvasRef}
      width={1000}
      height={1000}
      style={{ width: 250, height: 250 }}
    />
  );
};

export const InvertExample = () => {
  const canvasRef = useImageCanvas(invert);
  return (
    <canvas
      ref={canvasRef}
      width={1000}
      height={1000}
      style={{ width: 250, height: 250 }}
    />
  );
};

export const BrightnessExample = () => {
  const canvasRef = useImageCanvas(brighten(40));
  return (
    <canvas
      ref={canvasRef}
      width={1000}
      height={1000}
      style={{ width: 250, height: 250 }}
    />
  );
};

export const BrightnessExample2 = () => {
  const canvasRef = useImageCanvas(brighten(-40));
  return (
    <canvas
      ref={canvasRef}
      width={1000}
      height={1000}
      style={{ width: 250, height: 250 }}
    />
  );
};

export const AlphaExample = () => {
  const canvasRef = useImageCanvas(adjustAlpha(0.3));
  return (
    <canvas
      ref={canvasRef}
      width={1000}
      height={1000}
      style={{ width: 250, height: 250 }}
    />
  );
};

export function MaskingExample() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.src = '/react-learning/cat.jpg';
    img.onload = () => {
      // 先建立一個圓形路徑
      ctx.beginPath();
      ctx.arc(500, 500, 200, 0, Math.PI * 2);
      ctx.closePath();
      ctx.clip(); // 之後的繪製只會在這個圓內
      // 畫上圖片
      drawImageFitCanvas(ctx, img, canvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={1000}
      height={1000}
      style={{ width: 250, height: 250 }}
    />
  );
}

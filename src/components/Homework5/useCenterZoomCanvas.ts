import { useRef } from 'react';

const clamp = (val: number, min: number, max: number) =>
  Math.max(min, Math.min(max, val));

export default function useCenterZoomCanvas(
  canvasRef: React.RefObject<HTMLCanvasElement>,
  canvasW: number,
  canvasH: number,
) {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const scaleRef = useRef(1);
  const baseSizeRef = useRef({ w: 0, h: 0 });
  const offsetRef = useRef({ x: canvasW / 2, y: canvasH / 2 }); // pan offset
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const offsetStart = useRef({ x: 0, y: 0 });

  // Draw image at offset, scaled
  const draw = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    const img = imgRef.current;
    if (!canvas || !ctx || !img) return;

    // HiDPI support
    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvasW * dpr;
    canvas.height = canvasH * dpr;
    canvas.style.width = `${canvasW}px`;
    canvas.style.height = `${canvasH}px`;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    ctx.setTransform(1, 0, 0, 1, 0, 0); // reset transform
    ctx.scale(dpr, dpr);

    ctx.clearRect(0, 0, canvasW, canvasH);
    ctx.save();

    const scale = scaleRef.current;
    const { w, h } = baseSizeRef.current;
    const drawW = w * scale;
    const drawH = h * scale;
    const { x, y } = offsetRef.current;
    ctx.translate(x, y);
    ctx.drawImage(img, -drawW / 2, -drawH / 2, drawW, drawH);
    ctx.restore();
  };

  // Handle file upload
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const img = new window.Image();
      img.onload = () => {
        imgRef.current = img;
        // Compute contain fit for initial scale=1
        const scale = Math.min(canvasW / img.width, canvasH / img.height, 1);
        baseSizeRef.current = { w: img.width * scale, h: img.height * scale };
        scaleRef.current = 1;
        // Center image initially
        offsetRef.current = { x: canvasW / 2, y: canvasH / 2 };
        draw();
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  };

  // Handle wheel zoom (cursor-centered)
  const handleWheel = (e: WheelEvent) => {
    if (!imgRef.current) return;
    e.preventDefault();
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    // Mouse position relative to canvas
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const prevScale = scaleRef.current;
    const delta = e.deltaY < 0 ? 1.1 : 0.9;
    const nextScale = clamp(prevScale * delta, 0.1, 20);
    // Compute new offset so mouse stays at same image point
    const { x, y } = offsetRef.current;
    offsetRef.current = {
      x: mouseX - (mouseX - x) * (nextScale / prevScale),
      y: mouseY - (mouseY - y) * (nextScale / prevScale),
    };
    scaleRef.current = nextScale;
    draw();
  };

  // Drag-to-pan handlers
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!imgRef.current) return;
    if (e.button !== 0) return; // left button only
    isDragging.current = true;
    dragStart.current = { x: e.clientX, y: e.clientY };
    offsetStart.current = { ...offsetRef.current };
    e.preventDefault();
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!imgRef.current || !isDragging.current) return;
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    offsetRef.current = {
      x: offsetStart.current.x + dx,
      y: offsetStart.current.y + dy,
    };
    draw();
    e.preventDefault();
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  const handlePointerLeave = () => {
    isDragging.current = false;
  };

  // Optional: reset function
  const reset = () => {
    scaleRef.current = 1;
    offsetRef.current = { x: canvasW / 2, y: canvasH / 2 };
    draw();
  };

  return {
    handleFile,
    handleWheel,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    handlePointerLeave,
    reset,
  };
}

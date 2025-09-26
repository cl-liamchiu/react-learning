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

  const activePointers = useRef(new Map<number, { x: number; y: number }>());
  const pinchStartDist = useRef(0);
  const pinchStartScale = useRef(1);
  const pinchStartMid = useRef({ x: 0, y: 0 });

  const toCanvasXY = (clientX: number, clientY: number) => {
    const r = canvasRef.current!.getBoundingClientRect();
    return { x: clientX - r.left, y: clientY - r.top };
  };

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
    activePointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (activePointers.current.size === 1) {
      isDragging.current = true;
      dragStart.current = { x: e.clientX, y: e.clientY };
      offsetStart.current = { ...offsetRef.current };
    } else if (activePointers.current.size === 2) {
      const pts = Array.from(activePointers.current.values());
      pinchStartDist.current = Math.hypot(
        pts[0].x - pts[1].x,
        pts[0].y - pts[1].y,
      );
      pinchStartScale.current = scaleRef.current;
      const midClient = {
        x: (pts[0].x + pts[1].x) / 2,
        y: (pts[0].y + pts[1].y) / 2,
      };
      pinchStartMid.current = toCanvasXY(midClient.x, midClient.y);
      isDragging.current = false; // 進入 pinch 狀態
    }
    e.currentTarget.setPointerCapture(e.pointerId);
    e.preventDefault();
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!imgRef.current) return;
    if (!activePointers.current.has(e.pointerId)) return;

    activePointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (activePointers.current.size === 2 && pinchStartDist.current > 0) {
      const pts = Array.from(activePointers.current.values());
      const curDist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
      const nextScale = clamp(
        pinchStartScale.current * (curDist / pinchStartDist.current),
        0.1,
        20,
      );

      const prev = scaleRef.current;
      const mid = pinchStartMid.current;
      offsetRef.current = {
        x: mid.x - (mid.x - offsetRef.current.x) * (nextScale / prev),
        y: mid.y - (mid.y - offsetRef.current.y) * (nextScale / prev),
      };
      scaleRef.current = nextScale;
      draw();
      e.preventDefault();
      return;
    }

    // 單指拖曳（原有邏輯）
    if (isDragging.current) {
      const dx = e.clientX - dragStart.current.x;
      const dy = e.clientY - dragStart.current.y;
      offsetRef.current = {
        x: offsetStart.current.x + dx,
        y: offsetStart.current.y + dy,
      };
      draw();
      e.preventDefault();
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    activePointers.current.delete(e.pointerId);
    if (activePointers.current.size < 2) {
      pinchStartDist.current = 0;
    }
    if (activePointers.current.size === 0) isDragging.current = false;
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

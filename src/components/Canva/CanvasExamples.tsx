import { useRef, useEffect } from 'react';
import './CanvasIntro.css';

export const BasicExample = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;

    ctx.fillStyle = 'skyblue';
    ctx.fillRect(20, 20, 150, 100);
  }, []);

  return <canvas id="canvas" ref={canvasRef} width={400} height={200} />;
};

export const CircleExample = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    const ctx = canvasRef.current!.getContext("2d")!;
    ctx.beginPath();
    ctx.arc(100, 100, 50, 0, Math.PI * 2);
    ctx.fillStyle = "pink";
    ctx.fill();
  }, []);
  return <canvas id="canvas" ref={canvasRef} width={400} height={200} />;
};

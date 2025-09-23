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

export const RectangleExample = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    const ctx = canvasRef.current!.getContext('2d')!;
    ctx.fillRect(25, 25, 100, 100);
    ctx.clearRect(45, 45, 60, 60);
    ctx.strokeRect(50, 50, 50, 50);
  }, []);
  return <canvas id="canvas" ref={canvasRef} width={400} height={200} />;
};

export const PathsExample = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    const ctx = canvasRef.current!.getContext('2d')!;
    ctx.beginPath();
    ctx.moveTo(50, 50);
    ctx.lineTo(150, 50);
    ctx.lineTo(100, 150);
    ctx.closePath();
    ctx.stroke();
  }, []);
  return <canvas id="canvas" ref={canvasRef} width={400} height={200} />;
};

export const StylesExample = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    const ctx = canvasRef.current!.getContext('2d')!;
    const g = ctx.createLinearGradient(0, 0, 200, 0);
    g.addColorStop(0, 'red');
    g.addColorStop(1, 'blue');
    ctx.fillStyle = g;
    ctx.fillRect(20, 20, 200, 100);
  }, []);
  return <canvas id="canvas" ref={canvasRef} width={400} height={200} />;
};

export const TextExample = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    const ctx = canvasRef.current!.getContext('2d')!;
    ctx.font = '30px Arial';
    ctx.fillText('Hello Canvas', 50, 100);
  }, []);
  return <canvas id="canvas" ref={canvasRef} width={400} height={200} />;
};

export const TransformationsExample = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    const ctx = canvasRef.current!.getContext('2d')!;
    ctx.save();
    ctx.translate(100, 100);
    ctx.rotate(Math.PI / 4);
    ctx.fillRect(-50, -50, 100, 100);
    ctx.restore();
  }, []);
  return <canvas id="canvas" ref={canvasRef} width={400} height={200} />;
};

export const StateExample = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    const ctx = canvasRef.current!.getContext('2d')!;
    ctx.save();
    ctx.fillStyle = 'red';
    ctx.fillRect(20, 20, 50, 50);
    ctx.restore(); // 還原顏色
    ctx.fillRect(80, 20, 50, 50); // 會是預設黑色
  }, []);
  return <canvas id="canvas" ref={canvasRef} width={400} height={200} />;
};

export const ImagesExample = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    const ctx = canvasRef.current!.getContext('2d')!;
    const img = new Image();
    img.src = '/react-learning/cat.jpg';
    img.onload = () => {
      ctx.drawImage(img, 10, 10, img.width * 0.04, img.height * 0.04);
      ctx.drawImage(
        img,
        img.width / 2 - 200,
        img.height / 2 - 200,
        400,
        400,
        200,
        10,
        img.width * 0.04,
        img.height * 0.04,
      );
    };
  }, []);
  return <canvas id="canvas" ref={canvasRef} width={400} height={200} />;
};

export const PixelExample = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    const ctx = canvasRef.current!.getContext('2d')!;
    const img = new Image();
    img.src = '/react-learning/cat.jpg';
    img.onload = () => {
      ctx.drawImage(img, 0, 0, 400, 200);
      const imageData = ctx.getImageData(0, 0, 400, 200);
      const data = imageData.data;
      // 將圖片轉為灰階
      for (let i = 0; i < data.length; i += 4) {
        const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
        data[i] = avg; // R
        data[i + 1] = avg; // G
        data[i + 2] = avg; // B
      }
      ctx.putImageData(imageData, 0, 0);
    };
  }, []);
  return <canvas id="canvas" ref={canvasRef} width={400} height={200} />;
}

export const PixelExample2 = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    const ctx = canvasRef.current!.getContext('2d')!;
    const img = new Image();
    img.src = '/react-learning/cat.jpg';
    img.onload = () => {
      ctx.drawImage(img, 0, 0, 200, 100);
      const imageData = ctx.getImageData(0, 0, 200, 100);
      ctx.putImageData(imageData, 200, 100);
    };
  }, []);
  return <canvas id="canvas" ref={canvasRef} width={400} height={200} />;
}

export const AnimationsExample = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    const width = canvas.width;
    const height = canvas.height;

    let x = 50,
      y = 50;
    let vx = 2,
      vy = 3;
    const radius = 20;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // 畫球
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = 'tomato';
      ctx.fill();

      // 更新位置
      x += vx;
      y += vy;

      // 碰到邊界反彈
      if (x - radius < 0 || x + radius > width) vx *= -1;
      if (y - radius < 0 || y + radius > height) vy *= -1;

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw); // 啟動動畫

    return () => cancelAnimationFrame(rafRef.current!);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={400}
      height={200}
      style={{ border: '1px solid #ccc' }}
    />
  );
};

import type { ReactNode } from 'react';
import * as CanvasExamples from './CanvasExamples';

export interface CardItem {
  title: string;
  content: ReactNode;
}

export const cardData: CardItem[] = [
  {
    title: 'Canvas Basic Usage',
    content: (
      <>
        <h3>1. Canvas 是什麼？</h3>
        <ul>
          <li>{`<canvas>`} 是一個 HTML 標籤，本身只是一塊「空白畫布」。</li>
          <li>不會自動畫東西，需要透過 JavaScript 操作。</li>
        </ul>

        <h3>2. getContext() → 拿到「畫筆」</h3>
        <ul>
          <li>
            <code>getContext("2d")</code> → 2D 繪圖環境
            (CanvasRenderingContext2D)
          </li>
          <li>
            <code>getContext("webgl")</code> → WebGL 繪圖環境 (3D 渲染)
          </li>
          <li>
            可以把 <b>canvas 想成紙</b>，<b>getContext() 想成筆</b>。
          </li>
          <li>之後所有繪圖都要透過這支「筆」來操作。</li>
        </ul>

        <h3>3. 傳統 JS 的寫法</h3>
        <pre>
          <code>
            {`const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// 畫一個藍色矩形
ctx.fillStyle = "skyblue";
ctx.fillRect(20, 20, 150, 100);`}
          </code>
        </pre>
        <ol>
          <li>
            找到 <code>&lt;canvas id="canvas"&gt;</code> 元素
          </li>
          <li>
            用 <code>getContext("2d")</code> 拿到畫筆 → ctx
          </li>
          <li>
            透過 ctx 方法繪圖（<code>fillRect</code>, <code>arc</code>…）
          </li>
        </ol>

        <h3>4. React 裡的寫法</h3>
        <p>
          React 不用 <code>document.getElementById</code>，而是透過{' '}
          <b>useRef</b> 存取 DOM：
        </p>
        <pre>
          <code>
            {`import { useRef, useEffect } from "react";

export default function CanvasExample() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    ctx.fillStyle = "skyblue";
    ctx.fillRect(20, 20, 150, 100);
  }, []);

  return <canvas ref={canvasRef} width={400} height={200} />;
}`}
          </code>
        </pre>

        <h3>✅ 總結</h3>
        <ul>
          <li>Canvas 是紙，getContext 是筆。</li>
          <li>
            傳統 JS → <code>getElementById</code> + <code>getContext</code>
          </li>
          <li>
            React → <code>useRef</code> + <code>useEffect</code>
          </li>
        </ul>
        <CanvasExamples.BasicExample />
      </>
    ),
  },
  {
    title: 'Canvas API (2D context 常用指令)',
    content: (
      <>
        <h3>1. 矩形 (Rectangles)</h3>
        <ul>
          <li>
            <code>fillRect(x, y, w, h)</code> → 填滿矩形
          </li>
          <li>
            <code>strokeRect(x, y, w, h)</code> → 描邊矩形
          </li>
          <li>
            <code>clearRect(x, y, w, h)</code> → 清空矩形範圍
          </li>
        </ul>

        <h3>2. 路徑 (Paths)</h3>
        <p>
          先 <code>beginPath()</code> 開始路徑，再用線條/弧線，最後{' '}
          <code>stroke()</code> 或 <code>fill()</code>。
        </p>
        <ul>
          <li>
            <code>beginPath()</code> → 開始新路徑
          </li>
          <li>
            <code>moveTo(x, y)</code> → 移動畫筆（不畫線）
          </li>
          <li>
            <code>lineTo(x, y)</code> → 畫直線
          </li>
          <li>
            <code>arc(x, y, r, start, end, anticlockwise?)</code> → 畫圓/弧
          </li>
          <li>
            <code>closePath()</code> → 自動連回起點
          </li>
        </ul>
        <pre>
          <code>
            {`ctx.beginPath();
ctx.moveTo(50, 50);
ctx.lineTo(150, 50);
ctx.lineTo(100, 150);
ctx.closePath();
ctx.stroke();`}
          </code>
        </pre>

        <h3>3. 顏色與樣式 (Colors & Styles)</h3>
        <ul>
          <li>
            <code>fillStyle</code>、<code>strokeStyle</code>
          </li>
          <li>
            <code>lineWidth</code>
          </li>
          <li>
            漸層：<code>createLinearGradient</code> /{' '}
            <code>createRadialGradient</code>
          </li>
        </ul>
        <pre>
          <code>
            {`const g = ctx.createLinearGradient(0, 0, 200, 0);
g.addColorStop(0, "red");
g.addColorStop(1, "blue");
ctx.fillStyle = g;
ctx.fillRect(20, 20, 200, 100);`}
          </code>
        </pre>

        <h3>4. 文字 (Text)</h3>
        <ul>
          <li>
            <code>font = "20px Arial"</code>
          </li>
          <li>
            <code>textAlign = "left" | "center" | "right"</code>
          </li>
          <li>
            <code>fillText("Hello", x, y)</code>
          </li>
          <li>
            <code>strokeText("Hello", x, y)</code>
          </li>
        </ul>

        <h3>5. 變形 (Transformations)</h3>
        <ul>
          <li>
            <code>translate(x, y)</code>
          </li>
          <li>
            <code>rotate(angle)</code> (弧度)
          </li>
          <li>
            <code>scale(sx, sy)</code>
          </li>
        </ul>
        <pre>
          <code>
            {`ctx.translate(100, 100);
ctx.rotate(Math.PI / 4);
ctx.fillRect(-50, -50, 100, 100);`}
          </code>
        </pre>

        <h3>6. 狀態保存 (State)</h3>
        <ul>
          <li>
            <code>save()</code> → 保存狀態
          </li>
          <li>
            <code>restore()</code> → 還原狀態
          </li>
        </ul>

        <h3>7. 圖片 (Images)</h3>
        <ul>
          <li>
            <code>drawImage(img, dx, dy)</code>
          </li>
          <li>
            <code>drawImage(img, dx, dy, dw, dh)</code>
          </li>
          <li>
            <code>drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh)</code>
          </li>
        </ul>

        <h3>8. 像素操作 (Pixel Manipulation)</h3>
        <ul>
          <li>
            <code>getImageData(x, y, w, h)</code>
          </li>
          <li>
            <code>putImageData(imageData, dx, dy)</code>
          </li>
        </ul>
        <pre>
          <code>
            {`const imgData = ctx.getImageData(0, 0, 100, 100);
for (let i = 0; i < imgData.data.length; i += 4) {
  const r = imgData.data[i];
  const g = imgData.data[i + 1];
  const b = imgData.data[i + 2];
  const gray = 0.3*r + 0.59*g + 0.11*b;
  imgData.data[i] = imgData.data[i+1] = imgData.data[i+2] = gray;
}
ctx.putImageData(imgData, 0, 0);`}
          </code>
        </pre>

        <h3>9. 動畫 (Animation)</h3>
        <p>
          使用 <code>requestAnimationFrame</code> 取代 <code>setInterval</code>
          。
        </p>
        <pre>
          <code>
            {`function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // 繪圖程式碼...
  requestAnimationFrame(draw);
}
draw();`}
          </code>
        </pre>

        <h3>✅ 小結</h3>
        <ul>
          <li>基本圖形：矩形、路徑、圓</li>
          <li>樣式：顏色、線條、漸層</li>
          <li>文字：fillText / strokeText</li>
          <li>變形：translate / rotate / scale</li>
          <li>狀態：save / restore</li>
          <li>進階：圖片繪製、像素操作、動畫</li>
        </ul>
      </>
    ),
  },
];

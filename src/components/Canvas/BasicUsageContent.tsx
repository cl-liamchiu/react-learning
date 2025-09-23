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
];

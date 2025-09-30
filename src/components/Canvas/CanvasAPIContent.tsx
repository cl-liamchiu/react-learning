import type { ReactNode } from 'react';
import * as CanvasExamples from './CanvasExamples';
import { Link } from 'react-router';

export interface CardItem {
  title: string;
  content: ReactNode;
}

export const cardData: CardItem[] = [
  {
    title: '座標系統 (Coordinate system)',
    content: (
      <>
        <ul>
          <li>原點 (0,0) 在左上角</li>
          <li>x 軸：往右增加</li>
          <li>y 軸：往下增加</li>
          <li>單位 = 畫素 (px)</li>
        </ul>
      </>
    ),
  },
  {
    title: '1. 矩形 (Rectangles)',
    content: (
      <>
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
        <pre>
          <code>
            {`ctx.fillRect(25, 25, 100, 100);
ctx.clearRect(45, 45, 60, 60);
ctx.strokeRect(50, 50, 50, 50);`}
          </code>
        </pre>
        <CanvasExamples.RectangleExample />
      </>
    ),
  },
  {
    title: '2.路徑 (Paths)',
    content: (
      <>
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
        <CanvasExamples.PathsExample />
      </>
    ),
  },
  {
    title: '3. 顏色與樣式 (Colors & Styles)',
    content: (
      <>
        <ul>
          <li>
            <code>
              fillStyle = "red" | "#00ff00" | "rgba(0,0,0,0.5)" | gradient |
              pattern
            </code>
          </li>
          <li>
            <code>strokeStyle = ...</code>
          </li>
          <li>
            <code>lineWidth = 5</code>
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
        <CanvasExamples.StylesExample />
      </>
    ),
  },
  {
    title: '4. 文字 (Text)',
    content: (
      <>
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
        <pre>
          <code>
            {`ctx.font = "30px Arial";
ctx.fillText("Hello Canvas", 50, 100);`}
          </code>
        </pre>
        <CanvasExamples.TextExample />
      </>
    ),
  },
  {
    title: '5. 變形 (Transformations)',
    content: (
      <>
        <ul>
          <li>
            <code>translate(x, y)</code> → 改變原點位置
          </li>
          <li>
            <code>rotate(angle)</code> → 旋轉座標系（單位：弧度）
          </li>
          <li>
            <code>scale(sx, sy)</code> → 放大縮小
          </li>
        </ul>
        <pre>
          <code>
            {`ctx.translate(100, 100);
ctx.rotate(Math.PI / 4); // 45 度
ctx.fillRect(-50, -50, 100, 100); // 會旋轉後畫`}
          </code>
        </pre>
        <CanvasExamples.TransformationsExample />
      </>
    ),
  },
  {
    title: '6. 狀態保存 (State)',
    content: (
      <>
        <ul>
          <li>
            <code>save()</code> → 保存目前狀態（樣式、變形等）
          </li>
          <li>
            <code>restore()</code> → 還原到上一次 save()
          </li>
        </ul>
        <pre>
          <code>
            {`ctx.save();
ctx.fillStyle = "red";
ctx.fillRect(20, 20, 50, 50);
ctx.restore(); // 還原顏色
ctx.fillRect(80, 20, 50, 50); // 會是預設黑色
`}
          </code>
        </pre>
        <CanvasExamples.StateExample />
      </>
    ),
  },
  {
    title: '7. 圖片 (Images)',
    content: (
      <>
        <ul>
          <li>
            <code>drawImage(img, dx, dy)</code> → 把圖片原尺寸，直接畫到 (dx,
            dy)
          </li>
          <li>
            <code>drawImage(img, dx, dy, dw, dh)</code> → 把圖片縮放後畫到 (dx,
            dy)，大小變成 (dw, dh)
          </li>
          <li>
            <code>drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh)</code> →
            把圖片的 (sx, sy, sw, sh) 範圍裁切後，畫到 (dx, dy)，大小變成 (dw,
            dh)
          </li>
        </ul>
        <pre>
          <code>
            {`const img = new Image();
img.src = '/react-learning/cat.jpg';
img.onload = () => {
  ctx.drawImage(img, 10, 10, img.width * 0.04, img.height * 0.04);
  ctx.drawImage(img, img.width/2 - 200, img.height/2 - 200, 400, 400,
                200, 10, img.width * 0.04, img.height * 0.04);
};`}
          </code>
        </pre>
        <CanvasExamples.ImagesExample />
        <footer style={{ marginTop: '2rem', fontSize: '0.8rem' }}>
          Photo by{' '}
          <a
            href="https://unsplash.com/@raouldroog"
            target="_blank"
            rel="noopener noreferrer"
          >
            Raoul Droog
          </a>{' '}
          on{' '}
          <a
            href="https://unsplash.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Unsplash
          </a>
        </footer>
      </>
    ),
  },
  {
    title: '8. 像素操作 (Pixel Manipulation)',
    content: (
      <>
        <p>
          Canvas 不只能畫圖形，還能直接存取與修改「像素資料」。
          這讓我們可以實作濾鏡（灰階、反相、模糊）、特效或影像分析。
        </p>

        <h3>核心 API</h3>
        <ul>
          <li>
            <code>getImageData(x, y, w, h)</code> →
            從畫布上擷取一塊像素資料，回傳一個 <b>ImageData</b> 物件。
          </li>
          <li>
            <code>putImageData(imageData, dx, dy)</code> →
            把像素資料貼回畫布（從 dx, dy 開始）。
          </li>
          <li>每個像素由 RGBA 四個值組成（範圍 0~255）。</li>
        </ul>

        <h3>ImageData 結構</h3>
        <ul>
          <li>
            <code>imageData.width</code> → 寬度（像素數）
          </li>
          <li>
            <code>imageData.height</code> → 高度（像素數）
          </li>
          <li>
            <code>imageData.data</code> → 一個長度 ={' '}
            <code>width * height * 4</code> 的 Uint8ClampedArray，每 4
            個值代表一個像素：
            <br />
            <code>[R, G, B, A, R, G, B, A, ...]</code>
          </li>
        </ul>

        <h3>範例：轉成灰階</h3>
        <pre>
          <code>
            {`ctx.drawImage(img, 0, 0, 400, 200);
const imageData = ctx.getImageData(0, 0, 400, 200);
const data = imageData.data;
// 將圖片轉為灰階
for (let i = 0; i < data.length; i += 4) {
const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
data[i] = avg; // R
data[i + 1] = avg; // G
data[i + 2] = avg; // B
}
ctx.putImageData(imageData, 0, 0);`}
          </code>
        </pre>
        <CanvasExamples.PixelExample />

        <h3>範例：複製區塊到其他位置</h3>
        <pre>
          <code>
            {`ctx.drawImage(img, 0, 0, 200, 100);
const imageData = ctx.getImageData(0, 0, 200, 100);
ctx.putImageData(imageData, 200, 100);`}
          </code>
        </pre>
        <CanvasExamples.PixelExample2 />
      </>
    ),
  },
  {
    title: '9. 動畫 (Animation)',
    content: (
      <>
        <p>
          在 Canvas 裡做動畫的核心概念是：
          <b>「不斷清空畫布 → 更新狀態 → 重繪畫面」</b>。 早期會用{' '}
          <code>setInterval</code> 固定時間呼叫，但現在更推薦用
          <code>requestAnimationFrame</code>，因為它會跟隨瀏覽器刷新率（通常
          60fps）， 讓動畫更流暢並自動節能。
        </p>

        <h3>基本流程</h3>
        <ol>
          <li>
            清空畫布（<code>ctx.clearRect(...)</code>）
          </li>
          <li>更新狀態（例如小球的位置）</li>
          <li>重新繪製畫面</li>
          <li>
            在函式結尾呼叫 <code>requestAnimationFrame(draw)</code> 形成迴圈
          </li>
        </ol>

        <h3>範例：基本動畫迴圈</h3>
        <p>
          在 React 通常會用 <code>useRef</code> 來保存 canvas DOM 和動畫 id，
          並在 <code>useEffect</code> 中啟動與清理：
        </p>
        <pre>
          <code>
            {`const canvasRef = useRef<HTMLCanvasElement | null>(null);
const rafRef = useRef<number>(0); // 用來儲存 requestAnimationFrame 的 ID
                                  // Unmount 時要取消動畫

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
);`}
          </code>
        </pre>
        <CanvasExamples.AnimationsExample />
        <div>
          <Link to="/ascii-donut">ASCII 甜甜圈動畫</Link>
        </div>

        <h3>小重點</h3>
        <ul>
          <li>
            <code>setInterval</code>：固定時間呼叫，可能不流暢。
          </li>
          <li>
            <code>requestAnimationFrame</code>：與瀏覽器重繪同步，效能最佳。
          </li>
          <li>
            記得在 React 裡要清理 <code>cancelAnimationFrame</code>
            ，避免效能浪費。
          </li>
        </ul>
      </>
    ),
  },
];

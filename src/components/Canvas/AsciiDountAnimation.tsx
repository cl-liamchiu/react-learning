import { useEffect, useRef } from 'react';

export default function AsciiDonutCanvas() {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext('2d')!;
    const dpr = window.devicePixelRatio || 1;

    let w = window.innerWidth;
    let h = window.innerHeight;

    // 文字格尺寸
    const cellW = 8,
      cellH = 14;

    let cols = Math.floor(w / cellW);
    let rows = Math.floor(h / cellH);

    // 重用的緩衝區（依尺寸改變時重建）
    let zbuf = new Float32Array(cols * rows);
    let out = new Uint16Array(cols * rows);

    const shades = ' .,-~:;=!*#$@';

    const R1 = 0.7,
      R2 = 1.5,
      K2 = 5;
    let K1 = (cols * cellW * 0.5) / (R1 + R2 + K2); // 重點：用像素寬度

    let A = 0,
      B = 0;
    let raf = 0;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;

      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);

      // 重設 transform，避免累積縮放
      // 直接一次設成 dpr 縮放最簡單
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      cols = Math.floor(w / cellW);
      rows = Math.floor(h / cellH);

      // 字體（以 CSS 像素設定）
      ctx.font = `${cellH}px monospace`;
      ctx.textBaseline = 'top';

      // 投影常數更新
      K1 = (cols * cellW * 0.5) / (R1 + R2 + K2);

      // 依新尺寸重建緩衝
      zbuf = new Float32Array(cols * rows);
      out = new Uint16Array(cols * rows);
    };

    resize();
    window.addEventListener('resize', resize);

    const frame = () => {
      // 若不打算在每幀重算 cols/rows，可移除下兩行（resize 已負責）
      // cols = Math.floor(w / cellW);
      // rows = Math.floor(h / cellH);

      // 清空 buffer（比 new 更省）
      zbuf.fill(0);
      out.fill(0);

      for (let theta = 0; theta < 2 * Math.PI; theta += 0.07) {
        const cost = Math.cos(theta),
          sint = Math.sin(theta);
        for (let phi = 0; phi < 2 * Math.PI; phi += 0.02) {
          const cosp = Math.cos(phi),
            sinp = Math.sin(phi);

          const circlex = R2 + R1 * cost;
          const circley = R1 * sint;

          const x =
            circlex * (Math.cos(B) * cosp + Math.sin(A) * Math.sin(B) * sinp) -
            circley * Math.cos(A) * Math.sin(B);

          const y =
            circlex * (Math.sin(B) * cosp - Math.sin(A) * Math.cos(B) * sinp) +
            circley * Math.cos(A) * Math.cos(B);

          const z = K2 + Math.cos(A) * circlex * sinp + Math.sin(A) * circley;

          const invz = 1 / z;
          const projx = Math.floor(cols / 2 + K1 * invz * x);
          const projy = Math.floor(rows / 2 - K1 * invz * y * (cellW / cellH));

          if (projx >= 0 && projx < cols && projy >= 0 && projy < rows) {
            // 光照（和你原式相同）
            const L =
              cosp * cost * Math.sin(B) -
              Math.sin(A) * cost * sinp -
              Math.cos(A) * sint +
              Math.cos(B) * (Math.sin(A) * sint - cost * cosp);

            // 規範化到 [0,1]
            const L01 = Math.min(1, Math.max(0, (L + 1) * 0.5));
            if (L01 > 0) {
              const idx = projx + projy * cols;
              if (invz > zbuf[idx]) {
                zbuf[idx] = invz;
                const shadeIndex = Math.min(
                  shades.length - 1,
                  Math.floor(L01 * (shades.length - 1)),
                );
                out[idx] = shadeIndex;
              }
            }
          }
        }
      }

      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, w, h);

      ctx.fillStyle = '#0f0';
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const s = out[x + y * cols];
          if (shades[s] !== ' ') {
            ctx.fillText(shades[s], x * cellW, y * cellH);
          }
        }
      }

      A += 0.03;
      B += 0.02;
      raf = requestAnimationFrame(frame);
    };

    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={ref} style={{ display: 'block' }} />;
}

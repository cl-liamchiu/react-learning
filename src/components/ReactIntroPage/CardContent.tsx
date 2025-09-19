import type { ReactNode } from 'react';

export interface CardItem {
  title: string;
  content: ReactNode;
}

export const cardData: CardItem[] = [
  {
    title: 'React 出現之前：網頁是怎麼做的？',
    content: (
      <>
        <h4>靜態網頁時代 (HTML + CSS)</h4>
        <p>早期網頁是純靜態的，內容都寫死在 HTML 裡，頂多用 CSS 美化樣式。</p>
        <p>👉 缺點：每次要更新資料都要重新載入整個頁面。</p>
        <h4>動態網頁 (jQuery 時代)</h4>
        <p>
          jQuery（2006 年）讓我們更容易操作 DOM（Document Object Model，瀏覽器對
          HTML 的樹狀結構表示）。
        </p>
        <p>👉 優點：可以用 JavaScript 去改某個區塊，而不是整頁刷新。</p>
        <p>
          👉 缺點：專案一大，程式碼混亂（誰在改哪個
          DOM、事件在哪裡掛，都很難管理）。
        </p>
      </>
    ),
  },
  {
    title: 'React 為什麼出現？',
    content: (
      <>
        <p>
          Facebook 內部在做大型專案（像是動態牆）時，遇到 jQuery 亂改 DOM
          造成的「程式碼難維護」問題。他們 2013 年開源了 React，核心理念是：
        </p>
        <ul>
          <li>
            Virtual DOM：用「差異比對→批次更新」取代直接改
            DOM，效能更穩、更新更可預測。
          </li>
          <li>
            Components（元件化）：把 UI
            與邏輯封裝成可組合的小單位，降低耦合、提升重用與維護性
          </li>
          <li>
            單向資料流：資料自上而下、事件往上回呼，避免互相干擾，讓狀態→UI
            的推理路徑單純
          </li>
        </ul>
      </>
    ),
  },
  {
    title: 'JSX 是什麼？',
    content: (
      <>
        <p>
          在 JavaScript 裡寫「看起來像 HTML」的語法。編譯後會變成
          React.createElement(...) 的物件描述（不是字串、不是 HTML）。
        </p>
        <p>
          👉 好處：更直覺地描述 UI 結構、可以用 JavaScript
          變數與邏輯（if、map）來產生動態內容。
        </p>
        <p>例如: </p>
        <pre>
          <code>
            {`// JSX（語法糖）
const el = <h1>Hello</h1>;

// 編譯後（原始寫法）
const el = React.createElement("h1", null, "Hello");`}
          </code>
        </pre>
      </>
    ),
  },
];

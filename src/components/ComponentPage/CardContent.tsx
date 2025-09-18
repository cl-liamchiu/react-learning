import type { ReactNode } from "react";

export interface CardItem { title: string; content: ReactNode; }

export const cardData: CardItem[] = [
    {
        title: "什麼是 Component？",
        content: (<>
            <ul>
                <li>定義：React 中 UI 的基本單位，可以想像成「積木」。</li>
                <li>功能：每個元件都有自己的輸入（props）和內部狀態（state），最後回傳一段 JSX（畫面）。</li>
            </ul>
        </>)
    },
    {
        title: "元件的特色",
        content: (<>
            <ul>
                <li>可重用：一個元件可以在很多地方被呼叫。</li>
                <li>組合（composition）：小元件可以組合成大元件，像積木一樣。</li>
                <li>資料驅動：元件輸入資料（props），就會輸出對應的 UI。</li>
            </ul>
        </>)
    },
    {
        title: "例子",
        content: (<>
        <pre>
            <code>
                {`const Button = ({ label }) => {
  return <button>{label}</button>;
};

const App = () => {
  return (
    <div>
      <Button label="確定" />
      <Button label="取消" />
    </div>
  );
};`}
            </code>
        </pre>
        </>)
    },
    {
        title: "Props（Properties）",
        content: (<>
        <p>元件的「輸入」</p>
        <ul>
            <li>定義：父元件 → 子元件傳遞的資料。</li>
            <li>特性：</li>
            <ul>
                <li>唯讀：子元件不能直接修改 props。</li>
                <li>用來「配置」或「客製化」元件。</li>
            </ul>
        </ul>
        <pre>
            <code>
                {`function Button({ label }) {
  return <button>{label}</button>;
}

function App() {
  return <Button label="確定" />;  // label 是一個 props
}`}
            </code>
        </pre>
        <p>👉 label="確定" 是傳給 Button 的 props。</p>
        <p>👉 Button 自己不能改 label，只能讀取它。</p>
        </>)
    },
    {
        title: "State",
        content: (<>
        <p>元件的「內部記憶」</p>
        <ul>
            <li>定義：元件自己內部會改變的資料。</li>
            <li>特性：</li>
            <ul>
                <li>用 useState 建立。</li>
                <li>修改 state 會觸發元件重新 render。</li>
            </ul>
        </ul>
        <pre>
            <code>
                {`function Counter() {
  const [count, setCount] = React.useState(0); // state

  return (
    <button onClick={() => setCount(count + 1)}>
      點了 {count} 次
    </button>
  );
}`}
            </code>
        </pre>
        <p>👉 count 是 state（會變動的數值）。</p>
        <p>👉 點按鈕後用 setCount 修改 state，React 自動更新畫面。</p>
        </>)
    },
    {
        title: "Lifecycle of a component",
        content: (<>
        <p>在 React 裡，lifecycle（生命週期） 是指一個元件從「出生 → 存活 → 消失」的整個過程。
            每個階段 React 都會給你「介入的時機」，讓你能執行一些副作用（side effects），像是：抓資料、訂閱事件、清理資源。</p>
        <h3>三個大階段</h3>
        <ol>
            <li>Mount（掛載 / 出生）</li>
            <ul>
                <li>元件第一次被放進畫面。</li>
                <li>初始化、向伺服器抓資料、訂閱事件。</li>
            </ul>
            <li>Update（更新 / 存活變動）</li>
            <ul>
                <li>元件因為 props 或 state 改變而重新渲染。</li>
                <li>根據新資料做一些動作，例如重新計算。</li>
            </ul>
            <li>Unmount（卸載 / 消失）</li>
            <ul>
                <li>元件被移出畫面。</li>
                <li>用來清理資源（移除事件監聽、取消計時器）。</li>
            </ul>
        </ol>
        <h3>用 useEffect 管理 Timer component 的生命週期</h3>
        <p>可開啟 f12 開發者工具查看 Console</p>
        <ul>
          <li>當按下顯示計時器時，Timer 被掛載上來</li>
          <li>Timer 會隨著時間被改變 (setInterval)，Timer 更新</li>
          <li>當按下隱藏計時器時，Timer 被卸載，並執行清除計時器</li>
        </ul>
        <pre>
            <code>
                {`const Timer: React.FC = () => {
const [seconds, setSeconds] = useState(0);

useEffect(() => {
  console.log("Timer mounted");
  const interval = setInterval(() => {
    setSeconds(prev => prev + 1);
  }, 1000);
  return () => {
    console.log("Timer unmounted");
    clearInterval(interval);
  };
}, []);

useEffect(() => {
  console.log(\`Timer updated: \${seconds} seconds\`);
}, [seconds]);

return (
  <div>
    <h2>計時器</h2>
    <p>已經過 {seconds} 秒</p>
  </div>
);};`}
            </code>
        </pre>
        </>)
    },
];

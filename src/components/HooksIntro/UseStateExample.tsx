import React, { useState } from 'react';

const UseStateExample: React.FC = () => {
  const [count, setCount] = useState(0);
  let count2 = 0;

  return (
    <div>
      <h3>UseState 範例</h3>
      <pre>
        <code>
          {`const [count, setCount] = useState(0);

return (
    <div>
        <p>Count: {count}</p>
        <button 
            onClick={() => {
                setCount(count + 1); 
                console.log('count: ', count + 1);}}>
        增加
        </button>
        <button 
            onClick={() => {
                setCount(count - 1);
                console.log('count: ', count - 1);}}>
        減少
        </button>
    </div>
);`}
        </code>
      </pre>
      <p>Count: {count}</p>
      <button
        onClick={() => {
          setCount(count + 1);
          console.log('count: ', count + 1);
        }}
      >
        增加
      </button>
      <button
        onClick={() => {
          setCount(count - 1);
          console.log('count: ', count - 1);
        }}
        style={{ marginLeft: '0.5rem' }}
      >
        減少
      </button>

      <h3>如果用普通變數</h3>
      <pre>
        <code>
          {`let count = 0;

return (
    <div>
        <p>Count: {count}</p>
        <button 
            onClick={() => {
                count++; 
                console.log('count: ', count);}}>
        增加
        </button>
        <button 
            onClick={() => {
                count--; 
                console.log('count: ', count);}}>
        減少
        </button>
    </div>
);`}
        </code>
      </pre>
      <p>Count: {count2}</p>
      <button
        onClick={() => {
          count2++;
          console.log('count: ', count2);
        }}
      >
        增加
      </button>
      <button
        onClick={() => {
          count2--;
          console.log('count: ', count2);
        }}
        style={{ marginLeft: '0.5rem' }}
      >
        減少
      </button>
      <p>
        👉 你會發現雖然 console.log 會顯示但頁面上沒有產生改變，因為 React
        不會偵測到普通變數的改變。
      </p>
      <p>👉 state 改變會觸發元件重新 render，普通變數不會。</p>
      <p>👉 所以要用 state 來儲存會改變的資料。</p>
    </div>
  );
};

export default UseStateExample;

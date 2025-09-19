import React, { useRef, useState } from 'react';

const useRefExample: React.FC = () => {
  const countRef = useRef(0);
  let countVar = 0;
  const [count, setCount] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);
  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div>
      <h3>useRef 範例</h3>
      <h4>儲存不會觸發 re-render 的值，並且跨 render 記住資料</h4>
      <pre>
        <code>
          {`const countRef = useRef(0);
let countVar = 0;
const [count, setCount] = useState(0);

<button onClick={() => {countRef.current ++; 
                        console.log("countRef:", countRef.current);}}>

<button onClick={() => {countVar++; 
                        console.log("countVar:", countVar);}}>

<button onClick={() => {setCount(count + 1); 
                        console.log("countState:", count+1);}}>
`}
        </code>
      </pre>
      <div style={{ display: 'flex', gap: '2rem', marginBottom: '3rem' }}>
        <div>
          <button
            onClick={() => {
              countRef.current++;
              console.log('countRef:', countRef.current);
            }}
          >
            增加 countRef
          </button>
          <p style={{ textAlign: 'center' }}>countRef: {countRef.current}</p>
        </div>
        <div>
          <button
            onClick={() => {
              countVar++;
              console.log('countVar:', countVar);
            }}
          >
            增加 countVar
          </button>
          <p style={{ textAlign: 'center' }}>countVar: {countVar}</p>
        </div>
        <div>
          <button
            onClick={() => {
              setCount(count + 1);
              console.log('countState:', count + 1);
            }}
          >
            增加 countState
          </button>
          <p style={{ textAlign: 'center' }}>countState: {count}</p>
        </div>
      </div>

      <h4>存取 DOM 節點，進一步操作 DOM API</h4>
      <pre>
        <code>
          {`const inputRef = useRef(null);
const focusInput = () => {
inputRef.current.focus();
};
    
<input ref={inputRef} type="text" placeholder="點按鈕自動聚焦" />
<button onClick={focusInput}>聚焦輸入框</button>`}
        </code>
      </pre>
      <input
        style={{
          marginRight: '1rem',
          fontSize: '1rem',
          padding: '0.6rem 1rem',
          width: '200px',
          borderRadius: '8px',
          border: 'none',
        }}
        ref={inputRef}
        type="text"
        placeholder="點按鈕自動聚焦"
      />
      <button onClick={focusInput}>聚焦輸入框</button>
    </div>
  );
};

export default useRefExample;

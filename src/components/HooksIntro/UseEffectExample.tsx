import React, { useState } from 'react';
import Timer from './Timer';

const UseEffectExample: React.FC = () => {
    const [showTimer, setShowTimer] = useState(false);

    return (
        <div>
            <h3>UseEffect 範例</h3>
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

useEffect(() => {
    console.log(\`Timer rendered\`);
});

return (
  <div>
    <h2>計時器</h2>
    <p>已經過 {seconds} 秒</p>
  </div>
);};`}
                </code>
            </pre>
            <button onClick={() => setShowTimer(!showTimer)}>{showTimer ? '隱藏' : '顯示'}計時器</button>
            {showTimer && <Timer />}
        </div>
    );
}

export default UseEffectExample;
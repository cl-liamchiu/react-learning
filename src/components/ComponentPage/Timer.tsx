import { useEffect, useState } from 'react';

const Timer: React.FC = () => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    console.log(`Timer mounted`);
    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
    return () => {
      console.log(`Timer unmounted`);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    console.log(`Timer updated: ${seconds} seconds`);
  }, [seconds]);

  return (
    <div>
      <h2>計時器</h2>
      <p>已經過 {seconds} 秒</p>
    </div>
  );
};

export default Timer;

import React, { useState, useCallback, memo } from 'react';

const Child: React.FC<{ onClick: () => void }> = memo(({ onClick }) => {
    console.log("Child rendered");  
    return <button style={{ marginLeft: "1rem" }} onClick={onClick}>Child Button</button>;
});

const ChildWithoutUseCallback: React.FC<{ onClick: () => void }> = memo(({ onClick }) => {
    console.log("ChildWithoutUseCallback rendered");  
    return <button style={{ marginLeft: "1rem" }} onClick={onClick}>ChildWithoutUseCallback Button</button>;
});

const UseCallbackExample: React.FC  = () => {
    const [count, setCount] = useState(0);

    const handleClick = useCallback(() => {
        console.log("Clicked!");
    }, []);

    const handleClickWithoutUseCallback = () => {
        console.log("Clicked!");
    };

    return (
        <div>
        <h3>useCallback 範例</h3>
        <p>搭配 memo 可以使 Child 不重複 render</p>
        <pre>
            <code>
                {`const Child = React.memo(({ onClick }) => {
    console.log("Child rendered");  
    return <button onClick={onClick}>Child Button</button>;
});

const ChildWithoutUseCallback: React.memo(({ onClick }) => {
    console.log("ChildWithoutUseCallback rendered");  
    return <button onClick={onClick}>ChildWithoutUseCallback Button</button>;
});

const UseCallbackExample = () => {
    const [count, setCount] = useState(0);
    
    const handleClick = useCallback(() => {
        console.log("Clicked!");
    }, []);

    const handleClickWithoutUseCallback = () => {
        console.log("Clicked!");
    };
    
    return (
    <div>
        <p>Count: {count}</p>
        <button onClick={() => setCount(count + 1)}>增加</button>
        <Child onClick={handleClick} />
        <ChildWithoutUseCallback onClick={handleClickWithoutUseCallback} />
    </div>
  );
};`}
            </code>
        </pre>
        <p>Count: {count}</p>
        <button onClick={() => setCount(count + 1)}>增加</button>
        <Child onClick={handleClick} />
        <ChildWithoutUseCallback onClick={handleClickWithoutUseCallback} />
        <p style={{ marginTop: "3rem" }}>👉 Child 元件有用 useCallback 搭配 memo，所以不會重複 render。</p>
        <p>👉 ChildWithoutUseCallback 元件沒有用 useCallback 搭配 memo，所以每次父元件 render 都會重複 render。</p>
        </div>
    );
};

export default UseCallbackExample;
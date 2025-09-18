import { useMemo, useState } from "react";

const ExpensiveCalcWithMemo: React.FC<{ num: number }> = ({ num }) => {
    const result = useMemo(() => {
        console.log("Memo: Performing expensive calculation...");
        return num * 2;
    }, [num]);

    return <p>Memo result: {result}</p>;
};

const ExpensiveCalcWithoutMemo: React.FC<{ num: number }> = ({ num }) => {
    
    const result = (() => {
        console.log("Without Memo: Performing expensive calculation...");
        return num * 2;
    })();

    return <p>Without memo result: {result}</p>;
}

const UseMemoExample: React.FC = () => {
    const [count, setCount] = useState(0);
    const [num, setNum] = useState(0);

    return (
        <div>
            <h3>useMemo 範例</h3>
            <pre>
                <code>
                {`const ExpensiveCalcWithMemo: React.FC<{ num: number }> = ({ num }) => {
    const result = useMemo(() => {
        console.log("Memo: Performing expensive calculation...");
        return num * 2;
    }, [num]);

    return <p>Memo result: {result}</p>;
};

const ExpensiveCalcWithoutMemo: React.FC<{ num: number }> = ({ num }) => {
    const result = (() => {
        console.log("Without Memo: Performing expensive calculation...");
        return num * 2;
    })();

    return <p>Without memo result: {result}</p>;
}

const UseMemoExample: React.FC = () => {
    const [count, setCount] = useState(0);
    const [num, setNum] = useState(5);

    return (<div>
        <div>
            <button onClick={() => setCount(count + 1)}>增加 count</button>
            <button onClick={() => setNum(num + 1)}>增加 num</button>
            <ExpensiveCalcWithMemo num={num} />
            <ExpensiveCalcWithoutMemo num={num} />
        </div>
    );
}
`}
                </code>
            </pre>
        <h4>父元件的 count: {count}, num: {num}</h4>
        <button style={{ marginRight: "1rem" }} onClick={() => setCount(count + 1)}>增加 count</button>
        <button onClick={() => setNum(num + 1)}>增加 num</button>
        <ExpensiveCalcWithMemo num={num} />
        <ExpensiveCalcWithoutMemo num={num} />
        <p style={{ marginTop: "3rem" }}>👉 當按下增加 count 時，ExpensiveCalcWithMemo 不會重新計算，ExpensiveCalcWithoutMemo 會重新計算。</p>
        <p>👉 因為 useMemo 會記住上次的計算結果，只有當依賴的 num 改變時才會重新計算。</p>
        </div>
    );
}

export default UseMemoExample;
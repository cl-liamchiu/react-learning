import React from "react";
import Card from '../Card/Card';
import { cardData } from "./CardContent";
import Timer from "./Timer";

const ComponentInfo: React.FC = () => {
    const [showTimer, setShowTimer] = React.useState(false);
    return (
        <div>
            <h2>Component 介紹</h2>
            {cardData.map((card, idx) => (
                <Card key={idx} title={card.title} content={card.content} />
            ))}
            <button onClick={() => setShowTimer(!showTimer)}>{showTimer ? '隱藏' : '顯示'}計時器</button>
            {showTimer && <Timer />}
        </div>
    );
}

export default ComponentInfo;
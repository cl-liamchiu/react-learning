import Card from '../Card/Card';
import { cardData } from './BasicUsageContent';

const CanvasIntro = () => {
  return (
    <div>
      <h2>Canvas 介紹</h2>
      <p>一塊在網頁上可以自由繪圖的畫布</p>
      {cardData.map((card, idx) => (
        <Card key={idx} title={card.title} content={card.content} />
      ))}
    </div>
  );
};

export default CanvasIntro;

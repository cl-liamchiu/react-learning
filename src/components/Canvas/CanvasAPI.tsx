import Card from '../Card/Card';
import { cardData } from './CanvasAPIContent';

const CanvasAPI = () => {
  return (
    <div>
      <h2>Canvas API (2D context 常用指令)</h2>
      {cardData.map((card, idx) => (
        <Card key={idx} title={card.title} content={card.content} />
      ))}
    </div>
  );
};

export default CanvasAPI;
